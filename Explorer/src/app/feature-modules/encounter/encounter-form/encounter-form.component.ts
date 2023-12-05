import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SocialEncounter } from "../model/social-encounter.model";
import { EncounterService } from "../encounter.service";

@Component({
    selector: "xp-encounter-form",
    templateUrl: "./encounter-form.component.html",
    styleUrls: ["./encounter-form.component.css"],
})
export class EncounterFormComponent {
    constructor(private service: EncounterService) {}

    encounterForm = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        radius: new FormControl(null, [Validators.required, Validators.min(1)]),
        xp: new FormControl(null, [Validators.required, Validators.min(1)]),
        boatRating: new FormControl(null, [Validators.required]),
        selectedStatus: new FormControl(),
        peopleNumber: new FormControl(null, [Validators.min(1)]),
        testNumber: new FormControl(null, [Validators.min(1)]),
        pictureURL: new FormControl(null, Validators.required),
        pictureLongitude: new FormControl(null, [Validators.required]),
        pictureLatitude: new FormControl(null, [Validators.required]),
    });
    encounterType: number = 1;

    changeStatus() {
        this.encounterType = this.encounterForm.value.selectedStatus;
    }

    createEncounter() {
        const encounter: SocialEncounter = {
            title: this.encounterForm.value.title || "",
            description: this.encounterForm.value.description || "",
            longitude: 45.45,
            latitude: 45.45,
            radius: this.encounterForm.value.radius || 10,
            xp: this.encounterForm.value.xp || 1,
            status: 2,
            peopleNumber: this.encounterForm.value.peopleNumber || 1,
        };

        this.service.createSocialEncounter(encounter).subscribe({
            next: () => {
                alert("Successfully created!");
            },
            error: () => {
                alert("Failed to create!");
            },
        });
    }
}
