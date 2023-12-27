import {
    Component,
    EventEmitter,
    Inject,
    Output,
    ViewChild,
} from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { LocationCoords } from "../model/location-coords.model";
import { Equipment } from "src/app/feature-modules/administration/model/equipment.model";
import { MapComponent } from "../map/map.component";

interface MapModalData {
    closeOnClick: boolean;
    encounterCoords: LocationCoords;
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
        if (this.closeOnClick) {
            setTimeout(() => {
                this.dialogRef.close();
            }, 300);
        }
    }
}
