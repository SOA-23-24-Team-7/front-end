import { Component, OnInit } from "@angular/core";
import { TourAuthoringService } from "../tour-authoring.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { PublicKeyPoint } from "../model/public-key-point.model";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "xp-public-key-points",
    templateUrl: "./public-key-points.component.html",
    styleUrls: ["./public-key-points.component.css"],
})
export class PublicKeyPointsComponent implements OnInit {
    publicKeyPoints: PublicKeyPoint[] = [];
    keyPointContainer: any;

    faXmark = faXmark;
    faPlus = faPlus;

    constructor(
        private service: TourAuthoringService,
        public dialog: MatDialogRef<PublicKeyPointsComponent>,
    ) {}

    ngOnInit(): void {
        this.keyPointContainer = document.querySelector(
            ".public-key-point-cards-container",
        );
        this.getPublicKeyPoints();
    }

    getPublicKeyPoints(): void {
        this.service.getPublicKeyPoints().subscribe({
            next: (result: PagedResults<PublicKeyPoint>) => {
                this.publicKeyPoints = result.results;
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
}
