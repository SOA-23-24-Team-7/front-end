import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
} from "@angular/core";
import { AdministrationService } from "../../administration/administration.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Tour } from "../model/tour.model";
import { TourAuthoringService } from "../tour-authoring.service";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { NotifierService } from "angular-notifier";
import { xpError } from "src/app/shared/model/error.model";

@Component({
    selector: "xp-edit-tour-form",
    templateUrl: "./edit-tour-form.component.html",
    styleUrls: ["./edit-tour-form.component.css"],
})
export class EditTourFormComponent implements OnInit {
    @Output() toursUpdated = new EventEmitter<null>();

    separatorKeysCodes: number[] = [ENTER, COMMA];

    public tour: Tour = {
        name: "",
        description: "",
        difficulty: parseInt("0"),
        tags: [],
        price: parseInt("0"),
    };

    editTourForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        difficulty: new FormControl("", [Validators.required]),
        tags: new FormControl([] as string[], [Validators.required]),
        price: new FormControl("", [Validators.required]),
    });

    faXmark = faXmark;

    constructor(
        private service: TourAuthoringService,
        public dialog: MatDialogRef<EditTourFormComponent>,
        private notifier: NotifierService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit() {
        // console.log(this.data);
        this.editTourForm.reset();
        const tourPatch = {
            name: this.data.name || null,
            description: this.data.description || null,
            difficulty: this.data.difficulty.toString() || null,
            tags: this.data.tags || null,
            price: this.data.price.toString() || null,
        };
        this.editTourForm.patchValue(tourPatch);
    }

    addTag(tag: string): void {
        const tagArray = this.editTourForm.get("tags");
        if (tagArray && tagArray.value) {
            const tags = tagArray.value;
            if (tag && !tags.includes(tag)) {
                tags.push(tag);
                tagArray.setValue(tags);
            }
        }
    }

    removeTag(index: number): void {
        const tagArray = this.editTourForm.get("tags");
        if (tagArray && tagArray.value) {
            const tags = tagArray.value;
            tags.splice(index, 1);
            tagArray.setValue(tags);
        }
    }
    submit(): void {
        const updatedData = this.editTourForm.value;
        // console.log(updatedData);
        const tour: Tour = {
            id: this.data.id,
            name: updatedData.name || "",
            description: updatedData.description || "",
            difficulty: parseInt(updatedData.difficulty || "0"),
            tags: updatedData.tags ? updatedData.tags : [],
            price: parseInt(updatedData.price || "0"),
            durations: this.data.durations,
        };

        // console.log(this.data.id);
        this.service.updateTour(tour).subscribe({
            next: () => {
                this.data.name = tour.name;
                this.data.description = tour.description;
                this.data.difficulty = tour.difficulty;
                this.data.tags = tour.tags;
                this.data.price = tour.price;
                this.toursUpdated.emit();
                this.onClose();
                this.notifier.notify("success", "Successfully updated tour!");
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

        // Add our fruit
        if (value) {
            this.addTag(value);
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    remove(tag: string): void {
        const index = this.editTourForm.get("tags")!.value!.indexOf(tag);

        if (index >= 0) {
            this.removeTag(index);
        }
    }
}
