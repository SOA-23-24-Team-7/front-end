import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Tour } from "../../tour-authoring/model/tour.model";
import { Router } from "@angular/router";
import { TourExecutionService } from "../tour-execution.service";
import { environment } from "src/env/environment";
import { MatDialog } from "@angular/material/dialog";
import { KeyPointsViewComponent } from "../key-points-view/key-points-view.component";
import { TourExecutionStart } from "../model/tour-execution-start-model";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { TourWheatherComponent } from "../tour-wheather/tour-wheather.component";
import { CarouselComponent } from "src/app/shared/carousel/carousel.component";

@Component({
    selector: "xp-purchased-tour-card",
    templateUrl: "./purchased-tour-card.component.html",
    styleUrls: ["./purchased-tour-card.component.css"],
})
export class PurchasedTourCardComponent implements OnInit {
    @Input() tour: Tour;
    @Input() hasActiveTour: boolean;
    @Input() isTourActive: boolean;
    @Input() isGlowing: boolean;
    @Input() isCampaign: boolean;
    @Input() selected: boolean = false;
    @Output() onSelected = new EventEmitter<any>();
    @Output() onDeselected = new EventEmitter<any>();
    @ViewChild(CarouselComponent) carousel: CarouselComponent;
    images: string[];
    execution: TourExecutionStart = { tourId: 0, isCampaign: false };
    isClicked: boolean = false;

    constructor(
        private router: Router,
        private service: TourExecutionService,
        public dialogRef: MatDialog,
    ) { }

    ngOnInit(): void {
        this.images = this.tour.keyPoints!.map(kp =>
            kp.imagePath.startsWith("http")
                ? kp.imagePath
                : environment.imageHost + kp.imagePath,
        );

        setInterval(() => {
            if (Math.random() < 0.2) { this.carousel.onNextClick(); }
        }, 1000);
    }
    StartTour() {
        this.execution.tourId = this.tour.id!;
        this.execution.isCampaign = false;
        this.service.startTour(this.execution).subscribe(() => {
            this.router.navigate([
                "/tour-executing/" + this.tour.id,
                { isCampaign: false },
            ]);
        });
    }

    ContinueTour() {
        this.router.navigate([
            "/tour-executing/" + this.tour.id,
            { isCampaign: false },
        ]);
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
        this.selected = true;
    }

    onDeselectedTour(tour: Tour) {
        this.onDeselected.emit(tour);
        this.selected = false;
    }

    ShowWheather() {
        const dialogRef = this.dialogRef.open(TourWheatherComponent, {
            data: {
                longitude: this.tour.keyPoints![0].longitude,
                latitude: this.tour.keyPoints![0].latitude,
                tourName: this.tour.name,
            },
        });
    }
}
