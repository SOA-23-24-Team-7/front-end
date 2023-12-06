import { Component, Inject, Optional } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { KeyPointEncounter } from "../model/key-point-encounter.model";
import { EncounterService } from "../encounter.service";

@Component({
    selector: "xp-key-point-encounter-form",
    templateUrl: "./key-point-encounter-form.component.html",
    styleUrls: ["./key-point-encounter-form.component.css"],
})
export class KeyPointEncounterFormComponent {
    isRequired: boolean;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialogRef<KeyPointEncounterFormComponent>,
        private service: EncounterService,
    ) {}

    addEncounterForm = new FormGroup({
        title: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        radius: new FormControl<number>(null!, [Validators.required]),
        xpReward: new FormControl<number>(null!, [Validators.required]),
    });

    submit() {
        const keyPointEncounter: KeyPointEncounter = {
            title: this.addEncounterForm.value.title || "",
            description: this.addEncounterForm.value.description || "",
            radius: this.addEncounterForm.value.radius || 1,
            xpReward: this.addEncounterForm.value.xpReward || 1,
            isRequired: this.isRequired,
            keyPointId: this.data.keyPointId,
        };

        console.log(keyPointEncounter);

        this.service.createKeyPointEncounter(keyPointEncounter).subscribe({
            next: () => {
                console.log("Succesfuly added encounter");
            },
            error: () => {},
        });
    }

    onClose(): void {
        this.dialog.close();
    }

    faXmark = faXmark;
}
