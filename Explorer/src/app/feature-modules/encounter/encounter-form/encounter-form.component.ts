import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EncounterService } from "../encounter.service";
import { Encounter } from "../model/encounter.model";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MapModalComponent } from "src/app/shared/map-modal/map-modal.component";
import { LocationCoords } from "src/app/shared/model/location-coords.model";

@Component({
    selector: "xp-encounter-form",
    templateUrl: "./encounter-form.component.html",
    styleUrls: ["./encounter-form.component.css"],
})
export class EncounterFormComponent {
    constructor(private service: EncounterService, public dialog: MatDialog) {
        this.encounterCoords = {
            longitude: 0,
            latitude: 0,
        };
        this.imageCoords = {
            longitude: 0,
            latitude: 0,
        };
    }
    dialogRef: MatDialogRef<MapModalComponent, any> | undefined;
    imageCoords: LocationCoords;
    encounterCoords: LocationCoords;
    selectedEncounter: string;
    selectedImage: string;

    encounterForm = new FormGroup({
        title: new FormControl(undefined, [Validators.required]),
        description: new FormControl(undefined, [Validators.required]),
        radius: new FormControl(undefined, [
            Validators.required,
            Validators.min(1),
        ]),
        xp: new FormControl(undefined, [
            Validators.required,
            Validators.min(1),
        ]),
        boatRating: new FormControl(undefined, [Validators.required]),
        selectedStatus: new FormControl(),
        peopleNumber: new FormControl(undefined, [Validators.min(1)]),
        testNumber: new FormControl(undefined, [Validators.min(1)]),
        pictureURL: new FormControl(undefined, Validators.required),
        pictureLongitude: new FormControl(undefined, [Validators.required]),
        pictureLatitude: new FormControl(undefined, [Validators.required]),
    });
    encounterType: number = 1;

    changeStatus() {
        this.encounterType = this.encounterForm.value.selectedStatus;
    }

    createEncounter() {
        const encounter: Encounter = {
            id: 0,
            title: this.encounterForm.value.title || "",
            description: this.encounterForm.value.description || "",
            longitude: this.encounterCoords.longitude || 0,
            latitude: this.encounterCoords.latitude || 0,
            radius: this.encounterForm.value.radius || 10,
            xpReward: this.encounterForm.value.xp || 1,
            status: 0,
            type: this.encounterForm.value.selectedStatus,
            peopleNumber: this.encounterForm.value.peopleNumber || 1,
            picture: this.encounterForm.value.pictureURL || "",
            pictureLongitude: this.imageCoords.longitude || 0,
            pictureLatitude: this.imageCoords.latitude || 0,
            challengeDone: false,
        };

        if (this.encounterType == 1) {
            this.service.createSocialEncounter(encounter).subscribe({
                next: () => {
                    alert("Successfully created!");
                },
                error: () => {
                    alert("Failed to create!");
                },
            });
        }
        if (this.encounterType == 2 && this.checkIfPictureInEncounterRange()) {
            this.service.createHiddenEncounter(encounter).subscribe({
                next: () => {
                    alert("Successfully created!");
                },
                error: () => {
                    alert("Failed to create!");
                },
            });
        } else {
            alert("Picture is not in encounter range!");
        }
        if (this.encounterType == 3) {
            this.service.createMiscEncounter(encounter).subscribe({
                next: () => {
                    alert("Successfully created!");
                },
                error: () => {
                    alert("Failed to create!");
                },
            });
        }
    }

    selectPictureOnMap() {
        if (this.dialogRef) {
            this.dialogRef.close();
            return;
        }
        this.dialogRef = this.dialog.open(MapModalComponent);
        this.dialogRef.componentInstance.positionChanged.subscribe(
            (result: LocationCoords) => {
                this.imageCoords = result;
                this.selectedImage =
                    "Longitude: " +
                    this.encounterCoords.longitude.toString() +
                    "<br>Latitude: " +
                    this.encounterCoords.latitude.toString();
                this.dialogRef = undefined;
            },
        );
        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = undefined;
        });
    }

    checkIfPictureInEncounterRange(): boolean {
        const picLat = this.imageCoords.latitude;
        const picLng = this.imageCoords.longitude;
        const encounterLat = this.encounterCoords.latitude;
        const encounterLng = this.encounterCoords.longitude;
        const earthRadius = 6371;
        const toRadians = (value: number) => (value * Math.PI) / 180;
        const haversine = (a: number, b: number) =>
            Math.pow(Math.sin((b - a) / 2), 2);

        const distance =
            2 *
            earthRadius *
            Math.asin(
                Math.sqrt(
                    haversine(toRadians(picLat), toRadians(encounterLat)) +
                        Math.cos(toRadians(picLat)) *
                            Math.cos(toRadians(encounterLat)) *
                            haversine(
                                toRadians(picLng),
                                toRadians(encounterLng),
                            ),
                ),
            );
        return distance * 1000 <= this.encounterForm.value.radius!;
    }

    selectEncounterOnMap() {
        if (this.dialogRef) {
            this.dialogRef.close();
            return;
        }
        this.dialogRef = this.dialog.open(MapModalComponent);
        this.dialogRef.componentInstance.positionChanged.subscribe(
            (result: LocationCoords) => {
                this.encounterCoords = result;
                this.selectedEncounter =
                    "Longitude: " +
                    this.encounterCoords.longitude.toString() +
                    "<br>Latitude: " +
                    this.encounterCoords.latitude.toString();
                this.dialogRef = undefined;
            },
        );

        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = undefined;
        });
    }
}
