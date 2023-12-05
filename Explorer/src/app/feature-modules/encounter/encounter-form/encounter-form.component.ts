import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EncounterService } from "../encounter.service";
import { Encounter } from "../model/encounter.model";

@Component({
    selector: "xp-encounter-form",
    templateUrl: "./encounter-form.component.html",
    styleUrls: ["./encounter-form.component.css"],
})
export class EncounterFormComponent {
    constructor(private service: EncounterService) {}

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
            longitude: 45.45,
            latitude: 45.45,
            radius: this.encounterForm.value.radius || 10,
            xpReward: this.encounterForm.value.xp || 1,
            status: 2,
            peopleNumber: this.encounterForm.value.peopleNumber || 1,
            pictureURL: this.encounterForm.value.pictureURL || "",
            pictureLongitude: this.encounterForm.value.pictureLongitude || 0,
            pictureLatitude: this.encounterForm.value.pictureLatitude || 0,
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
        if (this.encounterType == 2) {
            this.service.createHiddenEncounter(encounter).subscribe({
                next: () => {
                    alert("Successfully created!");
                },
                error: () => {
                    alert("Failed to create!");
                },
            });
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
}
