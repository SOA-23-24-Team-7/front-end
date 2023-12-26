import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
} from "@angular/core";
import { MarketplaceService } from "../marketplace.service";
import { Club } from "../model/club.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "xp-club-form",
    templateUrl: "./club-form.component.html",
    styleUrls: ["./club-form.component.css"],
})
export class ClubFormComponent implements OnChanges {
    @Output() clubUpdated = new EventEmitter<null>();
    @Input() club: Club;
    @Input() shouldEdit: boolean = false;
    clubImage: File;
    imagePath: string;

    constructor(
        private service: MarketplaceService,
        public dialogRef: MatDialogRef<ClubFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.club = data.club;
        this.shouldEdit = data.shouldEdit;
    }

    ngOnChanges(): void {
        this.clubForm.reset();
        if (this.shouldEdit) {
            this.clubForm.patchValue(this.club);
        }
    }

    clubForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        image: new FormControl("", [Validators.required]),
    });

    addClub(): void {
        const club: Club = {
            name: this.clubForm.value.name || "",
            description: this.clubForm.value.description || "",
            image: this.imagePath || "",
            ownerId: 0, //na bekendu ce se dodeliti pravi id ulogovanog korisnika
        };
        if (this.isValid(club)) {
            this.service.addClub(club).subscribe({
                next: () => {
                    this.clubUpdated.emit();
                    this.dialogRef.close();
                },
            });
        }
    }
    updateClub(): void {
        const club: Club = {
            ownerId: this.club.ownerId,
            name: this.clubForm.value.name || "",
            description: this.clubForm.value.description || "",
            image: this.imagePath || "",
        };
        club.id = this.club.id;
        if (this.isValid(club)) {
            this.service.updateClub(club).subscribe({
                next: () => {
                    this.clubUpdated.emit();
                    this.dialogRef.close();
                },
            });
        }
    }
    isValid(club: Club) {
        if (!club.name) {
            alert("Name cannot be empty");
            return false;
        }
        if (!club.description) {
            alert("Description cannot be empty");
            return false;
        }
        if (!club.image) {
            alert("Image cannot be empty");
            return false;
        }
        return true;
    }

    onSelectImage(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        if (element.files && element.files[0]) {
            this.clubImage = element.files[0];

            const reader = new FileReader();

            reader.readAsDataURL(this.clubImage);
            reader.onload = (e: ProgressEvent<FileReader>) => {
                this.imagePath = reader.result as string;
            };
        }
    }
}
