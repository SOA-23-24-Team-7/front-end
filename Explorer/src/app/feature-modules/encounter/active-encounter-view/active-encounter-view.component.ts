import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { EncounterService } from "../encounter.service";
import { Encounter, EncounterType } from "../model/encounter.model";
import { MapComponent } from "src/app/shared/map/map.component";
import { UserPositionWithRange } from "../model/user-position-with-range.model";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PositionSimulatorComponent } from "src/app/shared/position-simulator/position-simulator.component";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { EncounterInstance } from "../model/encounter-instance.model";
import { NotifierService } from "angular-notifier";
import { xpError } from "src/app/shared/model/error.model";

@Component({
    selector: "xp-active-encounter-view",
    templateUrl: "./active-encounter-view.component.html",
    styleUrls: ["./active-encounter-view.component.css"],
})
export class ActiveEncounterViewComponent implements AfterViewInit {
    points: any;
    encounters: Encounter[];
    filteredEncounters: Encounter[];
    image?: string;
    encounter?: Encounter;
    encounterInstance?: EncounterInstance;
    dialogRef: MatDialogRef<PositionSimulatorComponent, any> | undefined;

    private readonly notifier: NotifierService;

    @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;

    faLocation = faLocationCrosshairs;

    userPosition: UserPositionWithRange = {
        range: 200,
        longitude: 19.84113513341626,
        latitude: 45.260218642510154,
    };

    constructor(
        private service: EncounterService,
        private authService: AuthService,
        notifierService: NotifierService,
        public dialog: MatDialog,
    ) {
        this.notifier = notifierService;
    }

    ngAfterViewInit(): void {
        this.authService.userLocation$.subscribe({
            next: location => {
                this.encounter = undefined;
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
                            this.encounter = enc;
                            this.getEncounterInstance(enc.id);
                            // console.log(this.encounterInstance, enc.id);
                            if (this.encounterInstance?.status === 0) {
                                this.getHiddenLocationImage();
                            }
                        }
                    });
                }
            },
        });
    }

    getEncounterInstance(encounterId: number) {
        this.service
            .getEncounterInstance(encounterId)
            .subscribe(result => (this.encounterInstance = result));
    }

    activateEncounter() {
        this.service
            .activateEncounter(this.userPosition, this.encounter!.id)
            .subscribe({
                next: () => {
                    this.notifier.notify(
                        "success",
                        "Successfully activated encounter!",
                    );
                },
                error: err => {
                    this.notifier.notify("error", xpError.getErrorMessage(err));
                },
            });
        if (this.encounter!.type === 1) {
            this.getHiddenLocationImage();
        }
    }

    getHiddenLocationImage() {
        this.service
            .getHiddenLocationEncounterById(this.encounter!.id)
            .subscribe(result => {
                this.image = result.picture;
            });
    }

    completeEncounter() {
        if (this.encounter!.type === 1) {
            this.service
                .completeHiddenLocationEncounter(
                    this.userPosition,
                    this.encounter!.id,
                )
                .subscribe({
                    next: () => {
                        this.notifier.notify(
                            "success",
                            "Successfully completed hidden encounter!",
                        );
                        this.authService.updateXp();
                    },
                    error: err => {
                        // console.log(err);
                        this.notifier.notify(
                            "error",
                            xpError.getErrorMessage(err),
                        );
                    },
                });
        } else {
            this.service
                .completeEncounter(this.userPosition, this.encounter!.id)
                .subscribe({
                    next: () => {
                        this.notifier.notify(
                            "success",
                            "Successfully completed " +
                                EncounterType[this.encounter!.type] +
                                " encounter!",
                        );
                        this.authService.updateXp();
                    },
                    error: err => {
                        // console.log(err);
                        this.notifier.notify(
                            "error",
                            xpError.getErrorMessage(err),
                        );
                    },
                });
        }
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
        // console.log(distance * 1000);
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
