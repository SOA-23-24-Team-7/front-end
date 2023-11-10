import { Component, Input, OnInit } from "@angular/core";
import { TourAuthoringService } from "../tour-authoring.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { PublicKeyPoint } from "../model/public-key-point.model";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject, Output, EventEmitter } from "@angular/core";
import { KeyPoint } from "../model/key-point.model";

@Component({
    selector: "xp-public-key-points",
    templateUrl: "./public-key-points.component.html",
    styleUrls: ["./public-key-points.component.css"],
})
export class PublicKeyPointsComponent implements OnInit {
    publicKeyPoints: PublicKeyPoint[] = [];
    keyPointContainer: any;
    keyPoints: KeyPoint[] = [];
    faXmark = faXmark;
    faPlus = faPlus;
    @Output() onAdd = new EventEmitter<null>();
    constructor(
        private service: TourAuthoringService,
        public dialog: MatDialogRef<PublicKeyPointsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {
        this.keyPointContainer = document.querySelector(
            ".public-key-point-cards-container",
        );
        this.keyPoints = this.data.keyPoints;
        this.getPublicKeyPoints();

        console.log(this.publicKeyPoints);
    }

    getPublicKeyPoints(): void {
        this.service.getPublicKeyPoints().subscribe({
            next: (result: PagedResults<PublicKeyPoint>) => {
                this.publicKeyPoints = result.results;
                this.publicKeyPoints = this.filterPublicKeyPoints();
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }

    currentIndex: number = 0;

    scrollToNextCard(): void {
        this.currentIndex++;
        if (this.currentIndex >= this.keyPointContainer.children.length) {
            this.currentIndex = 0;
        }
        this.keyPointContainer.scrollLeft +=
            this.keyPointContainer.children[this.currentIndex].clientWidth;
    }

    scrollToPrevCard(): void {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.keyPointContainer!.children.length - 1;
        }
        this.keyPointContainer!.scrollLeft -=
            this.keyPointContainer.children[this.currentIndex].clientWidth;
    }

    onClose(): void {
        this.dialog.close();
    }

    addPublicKeyPointToTour(publicKeyPointId: number) {
        this.service
            .addPublicKeyPoint(this.data.tourId, publicKeyPointId)
            .subscribe({
                next: _ => {
                    this.onAdd.emit();
                    let idx = this.publicKeyPoints.findIndex(
                        d => d.id == publicKeyPointId,
                    );
                    this.publicKeyPoints.splice(idx, 1);
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
    }
    filterPublicKeyPoints(): PublicKeyPoint[] {
        return this.publicKeyPoints.filter(
            pkp =>
                this.keyPoints.filter(
                    kp =>
                        kp.longitude == pkp.longitude &&
                        kp.latitude == pkp.latitude,
                ).length == 0,
        );
    }
}
