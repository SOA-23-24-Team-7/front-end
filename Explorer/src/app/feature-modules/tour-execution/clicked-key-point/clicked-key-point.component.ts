import { Component, Inject, OnInit } from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { KeyPoint } from "../../tour-authoring/model/key-point.model";
import { environment } from "src/env/environment";
import {
    faMask,
    faXmark,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
@Component({
    selector: "xp-clicked-key-point",
    templateUrl: "./clicked-key-point.component.html",
    styleUrls: ["./clicked-key-point.component.css"],
})
export class ClickedKeyPointComponent implements OnInit {
    keyPoint: any;
    keyPointImage: string;
    nextKeyPointId: number;
    faMask = faMask;
    faXmark = faXmark;
    faLocationDot = faLocationDot;
    hidden: boolean = true;
    secret: string = "Not unlocked yet.";
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: KeyPoint,
        public dialog: MatDialogRef<ClickedKeyPointComponent>,
        public dialogRef: MatDialog,
    ) {}
    ngOnInit(): void {
        this.keyPoint = this.data;
        this.nextKeyPointId = this.keyPoint.nextKeyPointId;
        this.keyPointImage =
            environment.imageHost + this.keyPoint.dataKey.imagePath;
        if (this.keyPoint.dataKey.id < this.nextKeyPointId) {
            if (this.keyPoint.dataKey.secret.description != "") {
                this.secret = this.keyPoint.dataKey.secret.description;
            } else {
                this.secret = "";
            }
        }
        if (this.keyPoint.dataKey.secret.description == "") {
            this.secret = "";
        }
    }
    onClose(): void {
        this.dialog.close();
    }

    reveal(): void {
        this.hidden = false;
    }

    onImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        if (target) {
            target.src =
                "https://imgs.search.brave.com/udmDGOGRJTYO6lmJ0ADA03YoW4CdO6jPKGzXWvx1XRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzY4LzU1LzYw/LzM2MF9GXzI2ODU1/NjAxMl9jMVdCYUtG/TjVyalJ4UjJleVYz/M3puSzRxblllS1pq/bS5qcGc";
        }
    }
}
