import { Component, EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LocationCoords } from "../model/location-coords.model";

@Component({
    selector: "xp-map-modal",
    templateUrl: "./map-modal.component.html",
    styleUrls: ["./map-modal.component.css"],
})
export class MapModalComponent {
    @Output() positionChanged = new EventEmitter<LocationCoords>();

    constructor(public dialog: MatDialog) {}

    changePosition(longLat: [number, number]): void {
        this.positionChanged.emit({
            longitude: longLat[0],
            latitude: longLat[1],
        });
    }
}
