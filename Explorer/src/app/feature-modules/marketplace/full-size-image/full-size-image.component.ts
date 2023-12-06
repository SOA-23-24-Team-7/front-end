import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-full-size-image",
    templateUrl: "./full-size-image.component.html",
    styleUrls: ["./full-size-image.component.css"],
})
export class FullSizeImageComponent implements OnInit {
    imagePath: string = "";
    faXmark = faXmark;
    constructor(
        public dialog: MatDialogRef<FullSizeImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {
        this.imagePath = this.data.imagePath;
    }
    onClose(): void {
        this.dialog.close();
    }
}
