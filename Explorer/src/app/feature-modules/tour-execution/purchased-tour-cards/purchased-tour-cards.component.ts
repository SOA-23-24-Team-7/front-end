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
    purchasedTours: Tour[] = [];
    campaigns: Campaign[] = [];
    hasTourActive: boolean;
    activeTourId: number;
    isCampaign: boolean
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
                    this.isCampaign = result.isCampaign
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
    createCampaign() {
        if (
            this.campaignForm.value.campaignDescription == "" ||
            this.campaignForm.value.campaignName == ""
        ) {
            return;
        }
        if (this.selectedTourIds.length < 2) return;
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
}
