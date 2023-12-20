import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Rating } from "../../administration/model/rating.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { MarketplaceService } from "../marketplace.service";
import { MatDialogRef } from "@angular/material/dialog";
import { NotifierService } from 'angular-notifier';

@Component({
    selector: "xp-rating-form",
    templateUrl: "./rating-form.component.html",
    styleUrls: ["./rating-form.component.css"],
})
export class RatingFormComponent implements OnInit {
    rating: Rating;

    constructor(
        private marketplaceService: MarketplaceService,
        private authService: AuthService,
        private dialogRef: MatDialogRef<RatingFormComponent>,
        private notifier: NotifierService
    ) {}

    ratingForm = new FormGroup({
        grade: new FormControl(0, [Validators.min(1), Validators.max(5)]),
        comment: new FormControl("", []),
    });

    ngOnInit(): void {
        this.getRating();
    }

    getRating(): void {
        this.marketplaceService
            .getRating(this.authService.user$.getValue().id)
            .subscribe({
                next: (result: Rating) => {
                    this.rating = result;
                    this.ratingForm.patchValue(result);
                },
                error: () => {},
            });
    }

    ngOnChanges(): void {
        this.ratingForm.reset({ grade: 5 });
    }

    addRating(): void {
        const rating: Rating = {
            grade: this.ratingForm.value.grade || 0,
            comment: this.ratingForm.value.comment || "",
            dateTime: new Date(),
            userId: this.authService.user$.getValue().id,
        };
        this.marketplaceService.addRating(rating).subscribe({
            next: (result: Rating) => {
                this.notifier.notify('success', 'Thank you for your feedback!');
                this.closeForm();
            },
        });
    }

    deleteRating(id: number): void {
        this.marketplaceService.deleteRating(id).subscribe({
            next: () => {
                this.notifier.notify('success', 'Rating successfully removed.');
                this.closeForm();
            },
        });
    }

    updateRating(): void {
        const rating: Rating = {
            grade: this.ratingForm.value.grade || 0,
            comment: this.ratingForm.value.comment || "",
            dateTime: new Date(),
            userId: this.authService.user$.getValue().id,
        };
        rating.id = this.rating.id;
        this.marketplaceService.updateRating(rating).subscribe({
            next: (result: Rating) => {
                this.notifier.notify('success', 'Thank you for your feedback!');
                this.closeForm();
            },
        });
    }

    onSubmit(): void {
        if (!this.ratingForm.valid) return;
        
        if (this.rating) {
            this.updateRating();
        } else {
            this.addRating();
        }
    }

    onDelete(): void {
        this.deleteRating(this.rating.id!);
    }

    closeForm(): void {
        this.dialogRef.close();
    }
}
