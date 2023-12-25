import { Component, EventEmitter, Inject, Output } from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { LocationCoords } from "../model/location-coords.model";

interface MapModalData {
    closeOnClick: boolean;
}

@Component({
    selector: "xp-map-modal",
    templateUrl: "./map-modal.component.html",
    styleUrls: ["./map-modal.component.css"],
})
export class MapModalComponent {
    @Output() positionChanged = new EventEmitter<LocationCoords>();
    closeOnClick: boolean = false;

    constructor(
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<MapModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MapModalData,
    ) {
        this.closeOnClick = data.closeOnClick;
    }

    changePosition(longLat: [number, number]): void {
        this.positionChanged.emit({
            longitude: longLat[0],
            latitude: longLat[1],
        });
        if (this.closeOnClick) {
            setTimeout(() => {
                this.dialogRef.close();
            }, 300);
        }
    }
}
