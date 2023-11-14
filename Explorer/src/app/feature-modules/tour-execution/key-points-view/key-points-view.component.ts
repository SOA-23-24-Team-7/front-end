import { Component, Inject, OnInit } from "@angular/core";
import { KeyPoint } from "../../tour-authoring/model/key-point.model";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TourAuthoringService } from "../../tour-authoring/tour-authoring.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "xp-key-points-view",
    templateUrl: "./key-points-view.component.html",
    styleUrls: ["./key-points-view.component.css"],
})
export class KeyPointsViewComponent implements OnInit {
    keyPoints: KeyPoint[] = [];
    keyPointContainer: any;
    faXmark = faXmark;

    constructor(
        private service: TourAuthoringService,
        public dialog: MatDialogRef<KeyPointsViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {
        this.keyPointContainer = document.querySelector(
            ".public-key-point-cards-container",
        );
        this.keyPoints = this.data.keyPoints;
    }

    onClose(): void {
        this.dialog.close();
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
}
