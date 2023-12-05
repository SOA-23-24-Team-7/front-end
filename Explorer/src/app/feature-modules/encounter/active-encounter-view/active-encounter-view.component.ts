import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { EncounterService } from "../encounter.service";
import { Encounter } from "../model/encounter.model";
import { MapService } from "src/app/shared/map/map.service";
import { MapComponent } from "src/app/shared/map/map.component";
import { UserPositionWithRange } from "../model/user-position-with-range.model";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PositionSimulatorComponent } from "src/app/shared/position-simulator/position-simulator.component";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
@Component({
    selector: "xp-active-encounter-view",
    templateUrl: "./active-encounter-view.component.html",
    styleUrls: ["./active-encounter-view.component.css"],
})
export class ActiveEncounterViewComponent implements AfterViewInit {
    points: any;
    encounters: Encounter[];
    filteredEncounters: Encounter[];
    dialogRef: MatDialogRef<PositionSimulatorComponent, any> | undefined;

    @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;

    faLocation = faLocationCrosshairs;

    userPosition: UserPositionWithRange = {
        range: 500,
        longitude: 19.84113513341626,
        latitude: 45.260218642510154,
    };

    constructor(
        private service: EncounterService,
        private authService: AuthService,
        public dialog: MatDialog,
    ) {}

    ngAfterViewInit(): void {
        this.authService.userLocation$.subscribe({
            next: location => {
                this.userPosition.latitude = location.latitude;
                this.userPosition.longitude = location.longitude;
                console.log(
                    this.userPosition.latitude,
                    this.userPosition.longitude,
                );
                this.loadEncountersInRangeOfFromCurrentLocation(
                    this.userPosition,
                );
                console.log(this.mapComponent);
                if (this.mapComponent) {
                    this.mapComponent.setMarker(
                        this.userPosition.latitude,
                        this.userPosition.longitude,
                    );
                }
            },
        });
    }

    loadEncountersInRangeOfFromCurrentLocation(
        userPosition: UserPositionWithRange,
    ) {
        this.service.getEncountersInRangeOf(userPosition).subscribe(result => {
            this.filteredEncounters = result.results;
            this.filteredEncounters.forEach(enc => {
                this.mapComponent.setEncounterMarker(
                    enc.latitude,
                    enc.longitude,
                );
            });
        });
    }

    openSimulator() {
        if (this.dialogRef) {
            this.dialogRef.close();
            return;
        }
        this.dialogRef = this.dialog.open(PositionSimulatorComponent);
        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = undefined;
        });
    }
}
