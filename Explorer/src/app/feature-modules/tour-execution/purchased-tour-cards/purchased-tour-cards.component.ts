import { Component, Input, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Tour } from "../../tour-authoring/model/tour.model";
import { TourAuthoringService } from "../../tour-authoring/tour-authoring.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { TourExecutionService } from "../tour-execution.service";
import { TourExecutionSession } from "../model/tour-execution-session-model";
import { CampaignCreate } from "../model/campaign-create.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Campaign } from "../model/campaign-info.model";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { PurchasedTourCardComponent } from "../purchased-tour-card/purchased-tour-card.component";
import { NotifierService } from "angular-notifier";

@Component({
    selector: "xp-purchased-tour-cards",
    templateUrl: "./purchased-tour-cards.component.html",
    styleUrls: ["./purchased-tour-cards.component.css"],
    animations: [
        trigger('slideInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate('300ms ease-out')
            ]),
            transition('* => void', [
                animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})
export class PurchasedToursComponent implements OnInit {
    @ViewChildren(PurchasedTourCardComponent) tourCards!: QueryList<PurchasedTourCardComponent>;
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
    selectedTourId: number = 0;
    campaignForm = new FormGroup({
        campaignName: new FormControl("", []),
        campaignDescription: new FormControl("", []),
    });
    constructor(
        private tourExecutionService: TourExecutionService,
        private authService: AuthService,
        private notifier: NotifierService,
    ) { }
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
                    this.activeTourId = 0;
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
    onDeselectedTour(tour: Tour) {
        this.selectedTours = this.selectedTours.filter(item => item !== tour);
        console.log(tour.name);
    }
    CancelCampaignCreating() {
        this.campaignForm.reset({
            campaignDescription: "",
            campaignName: "",
        });
        this.selectedTourIds.length = 0;
        this.selectedTours.length = 0;
        this.tourCards.forEach(card => card.selected = false);
    }
    removeSelectedChild(tourId: number) {
        this.tourCards.forEach(card => { if (card.tour.id == tourId) card.selected = false });
        this.selectedTours = this.selectedTours.filter(item => item.id !== tourId);
        this.selectedTourId = 0;
    }
    createCampaign() {
        if (
            this.campaignForm.value.campaignDescription == "" ||
            this.campaignForm.value.campaignName == ""
        ) {
            this.notifier.notify("error", "You must fill all fields");
            return;
        }
        if (this.selectedTourIds.length < 2) {
            this.notifier.notify("error", "There must be at least two tours");
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
                this.tourCards.forEach(card => card.selected = false);
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

    faXmark = faXmark;
}
