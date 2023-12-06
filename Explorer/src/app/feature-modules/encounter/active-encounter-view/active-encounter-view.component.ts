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
    canActivate: boolean;
    encounter?: Encounter;
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
                this.canActivate = false;
                // this.encounter = undefined;
                this.userPosition.latitude = location.latitude;
                this.userPosition.longitude = location.longitude;
                this.loadEncountersInRangeOfFromCurrentLocation(
                    this.userPosition,
                );
                if (this.mapComponent) {
                    this.mapComponent.setMarker(
                        this.userPosition.latitude,
                        this.userPosition.longitude,
                    );
                }
                if (this.filteredEncounters) {
                    this.filteredEncounters.forEach(enc => {
                        if (this.checkIfUserInEncounterRange(enc)) {
                            this.canActivate = true;
                            this.encounter = enc;
                            console.log(
                                "Mozes aktivirati encounter:",
                                enc.title,
                            );
                        }
                    });
                }
            },
        });
    }

    activateEncounter() {
        this.service
            .activateEncounter(this.userPosition, this.encounter!.id)
            .subscribe();
    }

    completeHiddenLocationEncounter() {
        this.service
            .completeHiddenLocationEncounter(
                this.userPosition,
                this.encounter!.id,
            )
            .subscribe();
    }

    checkIfUserInEncounterRange(encounter: Encounter): boolean {
        const userLat = this.userPosition.latitude;
        const userLng = this.userPosition.longitude;
        const encounterLat = encounter.latitude;
        const encounterLng = encounter.longitude;
        const earthRadius = 6371;
        const toRadians = (value: number) => (value * Math.PI) / 180;
        const haversine = (a: number, b: number) =>
            Math.pow(Math.sin((b - a) / 2), 2);

        const distance =
            2 *
            earthRadius *
            Math.asin(
                Math.sqrt(
                    haversine(toRadians(userLat), toRadians(encounterLat)) +
                        Math.cos(toRadians(userLat)) *
                            Math.cos(toRadians(encounterLat)) *
                            haversine(
                                toRadians(userLng),
                                toRadians(encounterLng),
                            ),
                ),
            );
        console.log(distance * 1000);
        return distance * 1000 <= encounter.radius;
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
