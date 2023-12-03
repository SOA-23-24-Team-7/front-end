import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Tour } from "../../tour-authoring/model/tour.model";
import { Router } from "@angular/router";
import { TourExecutionService } from "../tour-execution.service";
import { environment } from "src/env/environment";
import { MatDialog } from "@angular/material/dialog";
import { KeyPointsViewComponent } from "../key-points-view/key-points-view.component";
import { TourExecutionStart } from "../model/tour-execution-start-model";
import { faL } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-purchased-tour-card",
    templateUrl: "./purchased-tour-card.component.html",
    styleUrls: ["./purchased-tour-card.component.css"],
})
export class PurchasedTourCardComponent implements OnInit {
    execution: TourExecutionStart = {tourId: 0, isCampaign: false}
    @Input() tour: Tour;
    @Input() hasActiveTour: boolean;
    @Input() activeTourId: number;
    @Input() isCampaign: boolean;
    @Output() onSelected = new EventEmitter<any>();
    tourImage: string;
    isTourActive: boolean = false;
    constructor(
        private router: Router,
        private service: TourExecutionService,
        public dialogRef: MatDialog,
    ) {}
    ngOnInit(): void {
        this.CheckIfTourIsActive();
        this.tourImage =
            environment.imageHost + this.tour.keyPoints![0].imagePath;
    }
    StartTour() {
        this.execution.tourId = this.tour.id!
        this.execution.isCampaign = false
        this.service.startTour(this.execution).subscribe(() => {
            this.router.navigate(["/tour-executing/" + this.tour.id, {isCampaign: false}]);
        });
    }
    ContinueTour() {
        this.router.navigate(["/tour-executing/" + this.tour.id]);
    }
    CheckIfTourIsActive() {
        if (this.hasActiveTour) {
            if (this.tour.id == this.activeTourId && !this.isCampaign) {
                this.isTourActive = true;
            }
        }
    }
    ShowKeyPoints() {
        const dialogRef = this.dialogRef.open(KeyPointsViewComponent, {
            data: {
                keyPoints: this.tour.keyPoints,
            },
        });
    }
    onSelectedTour(tour: Tour) {
        this.onSelected.emit(tour);
    }
}
