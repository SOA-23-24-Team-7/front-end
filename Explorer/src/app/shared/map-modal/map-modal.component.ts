import {
    Component,
    EventEmitter,
    Inject,
    Output,
    ViewChild,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { LocationCoords } from "../model/location-coords.model";
import { Equipment } from "src/app/feature-modules/administration/model/equipment.model";
import { MapComponent } from "../map/map.component";

@Component({
    selector: "xp-map-modal",
    templateUrl: "./map-modal.component.html",
    styleUrls: ["./map-modal.component.css"],
})
export class MapModalComponent {
    @Output() positionChanged = new EventEmitter<LocationCoords>();

    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA)
        public data: { encounterCoords: any },
    ) {}

    @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;

    ngAfterViewInit(): void {
        if (this.mapComponent) {
            this.mapComponent.setEncounterMarker(
                this.data.encounterCoords.latitude,
                this.data.encounterCoords.longitude,
            );
        }
    }

    changePosition(longLat: [number, number]): void {
        this.positionChanged.emit({
            longitude: longLat[0],
            latitude: longLat[1],
        });
    }
}
