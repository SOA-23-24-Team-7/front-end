import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { TourAuthoringService } from "../tour-authoring.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Tour } from "../model/tour.model";
import { Bundle } from "../model/bundle.model";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { NotifierService } from "angular-notifier";
import { xpError } from "src/app/shared/model/error.model";
@Component({
    selector: "xp-add-tour-form",
    templateUrl: "./add-tour-form.component.html",
    styleUrls: ["./add-tour-form.component.css"],
})
export class AddTourFormComponent {
    separatorKeysCodes: number[] = [ENTER, COMMA];
    @Output() toursUpdated = new EventEmitter<null>();
    public tour: Tour = {
        name: "",
        description: "",
        difficulty: parseInt("0"),
        tags: [],
        price: parseInt("0"),
    };

    addTourForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        difficulty: new FormControl("", [Validators.required]),
        tags: new FormControl([] as string[], [Validators.required]),
        price: new FormControl("", [Validators.required]),
    });

    faXmark = faXmark;

    constructor(
        private service: TourAuthoringService,
        public dialog: MatDialogRef<AddTourFormComponent>,
        private notifier: NotifierService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    addTag(tag: string): void {
        const tagArray = this.addTourForm.get("tags");
        if (tagArray && tagArray.value) {
            const tags = tagArray.value;
            if (tag && !tags.includes(tag)) {
                tags.push(tag);
                tagArray.setValue(tags);
            }
        }
    }

    removeTag(index: number): void {
        const tagArray = this.addTourForm.get("tags");
        if (tagArray && tagArray.value) {
            const tags = tagArray.value;
            tags.splice(index, 1);
            tagArray.setValue(tags);
        }
    }

    submit(): void {
        // console.log(this.addTourForm.value);
        const tour: Tour = {
            name: this.addTourForm.value.name || "",
            description: this.addTourForm.value.description || "",
            difficulty: parseInt(this.addTourForm.value.difficulty || "0"),
            tags: this.addTourForm.value.tags
                ? this.addTourForm.value.tags
                : [],
            price: parseInt(this.addTourForm.value.price || "0"),
        };
        this.service.addTour(tour).subscribe({
            next: () => {
                // console.log("uslo");
                this.toursUpdated.emit();
                // location.reload();
                this.onClose();
                this.notifier.notify("success", "Successfully created tour!");
            },
            error: err => {
                this.notifier.notify("error", xpError.getErrorMessage(err));
            },
        });
    }
    onClose(): void {
        this.dialog.close();
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || "").trim();

        if (value) {
            this.addTag(value);
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    remove(tag: string): void {
        const index = this.addTourForm.get("tags")!.value!.indexOf(tag);

        if (index >= 0) {
            this.removeTag(index);
        }
    }
}
