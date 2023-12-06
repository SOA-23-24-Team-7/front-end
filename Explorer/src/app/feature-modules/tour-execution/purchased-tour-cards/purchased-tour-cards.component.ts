import { Component, Input, OnInit } from "@angular/core";
import { Tour } from "../../tour-authoring/model/tour.model";
import { TourAuthoringService } from "../../tour-authoring/tour-authoring.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { TourExecutionService } from "../tour-execution.service";
import { TourExecutionSession } from "../model/tour-execution-session-model";
import { CampaignCreate } from "../model/campaign-create.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Campaign } from "../model/campaign-info.model";

@Component({
    selector: "xp-purchased-tour-cards",
    templateUrl: "./purchased-tour-cards.component.html",
    styleUrls: ["./purchased-tour-cards.component.css"],
})
export class PurchasedToursComponent implements OnInit {
    currentIndex: number = 0;
    currentIndexCampaign: number = 0;
    ToursContainer: any;
    CampaignsContainer: any;
    purchasedTours: Tour[] = [];
    campaigns: Campaign[] = [];
    hasTourActive: boolean;
    activeTourId: number;
    isCampaign: boolean;
    selectedTours: Tour[] = [];
    selectedTourIds: number[] = [];
    userId: number;
    campaignForm = new FormGroup({
        campaignName: new FormControl("", []),
        campaignDescription: new FormControl("", []),
    });
    constructor(
        private tourExecutionService: TourExecutionService,
        private authService: AuthService,
    ) {}
    ngOnInit(): void {
        this.getTours();
        this.getLiveTour();
        this.authService.user$.subscribe(user => {
            this.userId = user.id;
        });
        this.getCampaigns();
        this.ToursContainer = document.querySelector(".container");
        this.CampaignsContainer = document.querySelector(
            ".container-campaigns",
        );
    }
    getTours() {
        this.tourExecutionService.getTours().subscribe({
            next: (result: Tour[]) => {
                this.purchasedTours = result;
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }
    getCampaigns() {
        this.tourExecutionService.getCampaigns().subscribe({
            next: (result: Campaign[]) => {
                this.campaigns = result;
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }
    getLiveTour() {
        this.tourExecutionService.getLiveTour().subscribe({
            next: (result: TourExecutionSession) => {
                if (result == null) {
                    this.hasTourActive = false;
                    this.activeTourId = -1;
                } else {
                    this.hasTourActive = true;
                    this.activeTourId = result.tourId;
                    this.isCampaign = result.isCampaign;
                }
            },
        });
    }
    onSelectedTour(tour: Tour) {
        if (this.selectedTours.includes(tour)) return;
        this.selectedTours.push(tour);
        if (tour.id) this.selectedTourIds.push(tour.id);
        console.log(tour.name);
    }
    CancelCampaignCreating() {
        this.campaignForm.reset({
            campaignDescription: "",
            campaignName: "",
        });
        this.selectedTourIds.length = 0;
        this.selectedTours.length = 0;
    }
    createCampaign() {
        if (
            this.campaignForm.value.campaignDescription == "" ||
            this.campaignForm.value.campaignName == ""
        ) {
            alert("You must fill all fields");
            return;
        }
        if (this.selectedTourIds.length < 2) {
            alert("There must be at least two tours");
            return;
        }
        const campaign: CampaignCreate = {
            touristId: this.userId,
            description:
                this.campaignForm.value.campaignDescription?.toString() || "",
            name: this.campaignForm.value.campaignName?.toString() || "",
            tourIds: this.selectedTourIds,
        };
        this.tourExecutionService.addCampaign(campaign).subscribe({
            next: (result: CampaignCreate) => {
                this.campaignForm.reset({
                    campaignDescription: "",
                    campaignName: "",
                });
                this.selectedTourIds = [];
                this.selectedTours = [];
                this.getCampaigns();
            },
        });
    }
    scrollToNextCard(): void {
        this.currentIndex++;
        if (this.currentIndex >= this.ToursContainer.children.length) {
            this.currentIndex = 0;
        }
        this.ToursContainer.scrollLeft +=
            this.ToursContainer.children[this.currentIndex].clientWidth;
    }

    scrollToPrevCard(): void {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.ToursContainer!.children.length - 1;
        }
        this.ToursContainer!.scrollLeft -=
            this.ToursContainer.children[this.currentIndex].clientWidth;
    }

    scrollToNextCampaignCard(): void {
        this.currentIndexCampaign++;
        if (this.currentIndex >= this.CampaignsContainer.children.length) {
            this.currentIndex = 0;
        }
        this.CampaignsContainer.scrollLeft +=
            this.CampaignsContainer.children[this.currentIndex].clientWidth;
    }

    scrollToPrevCampaignCard(): void {
        this.currentIndexCampaign--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.CampaignsContainer!.children.length - 1;
        }
        this.CampaignsContainer!.scrollLeft -=
            this.CampaignsContainer.children[this.currentIndex].clientWidth;
    }
}
