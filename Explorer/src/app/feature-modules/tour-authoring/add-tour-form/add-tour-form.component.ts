import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { TourAuthoringService } from "../tour-authoring.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Tour, TourCategory } from "../model/tour.model";
import { Bundle } from "../model/bundle.model";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
    category: number;
    @Output() toursUpdated = new EventEmitter<Tour>();
    public tour: Tour = {
        name: "",
        description: "",
        difficulty: parseInt("0"),
        tags: [],
        price: parseInt("0"),
        category: TourCategory.Adventure,
    };

    addTourForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        difficulty: new FormControl("", [Validators.required]),
        tags: new FormControl([] as string[], [Validators.required]),
        price: new FormControl("", [Validators.required]),
        category: new FormControl("", [Validators.required]),
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
        //var categ = TourCategory.Adventure;

        if (this.addTourForm.value.category == "Adventure")
            var categ = TourCategory.Adventure;
        else if (this.addTourForm.value.category == "FamilyTrips")
            var categ = TourCategory.FamilyTrips;
        else if (this.addTourForm.value.category == "Cruise")
            var categ = TourCategory.Cruise;
        else if (this.addTourForm.value.category == "Cultural")
            var categ = TourCategory.Cultural;
        else var categ = TourCategory.Undefined;
        // console.log(this.addTourForm.value);
        console.log(categ);
        this.category = categ;
        const tour: Tour = {
            name: this.addTourForm.value.name || "",
            description: this.addTourForm.value.description || "",
            difficulty: parseInt(this.addTourForm.value.difficulty || "0"),
            tags: this.addTourForm.value.tags
                ? this.addTourForm.value.tags
                : [],
            price: parseInt(this.addTourForm.value.price || "0"),
            category: categ,
        };
        if (!this.isValidForm()) {
            this.notifier.notify("error", "Please enter valid data.");
            return;
        }
        if (!this.isValidCategory()) {
            this.notifier.notify("error", "Please select category.");
            return;
        }
        this.service.addTour(tour).subscribe({
            next: () => {
                // console.log("uslo");
                this.toursUpdated.emit(tour);
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
    isValidForm(): boolean {
        return (
            this.addTourForm.value.description != "" &&
            this.addTourForm.value.name != "" &&
            this.addTourForm.value.price != "" &&
            this.addTourForm.value.difficulty != "" &&
            parseInt(this.addTourForm.value.price!) >= 0 &&
            parseInt(this.addTourForm.value.difficulty!) >= 1 &&
            parseInt(this.addTourForm.value.difficulty!) <= 5
        );
    }
    isValidCategory(): boolean {
        return this.category != 4;
    }
}
