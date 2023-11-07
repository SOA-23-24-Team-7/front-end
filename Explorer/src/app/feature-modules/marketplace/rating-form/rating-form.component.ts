import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Rating } from "../../administration/model/rating.model";
import { AdministrationService } from "../../administration/administration.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { MarketplaceService } from "../marketplace.service";
import { Router } from "@angular/router";

@Component({
    selector: "xp-rating-form",
    templateUrl: "./rating-form.component.html",
    styleUrls: ["./rating-form.component.css"],
})
export class RatingFormComponent implements OnInit {
    rating: Rating;
    canDelete: boolean = true;
    canEdit: boolean = true;
    isEditing: boolean = false;
    canAdd: boolean = false;

    constructor(
        private marketplaceService: MarketplaceService,
        private authService: AuthService,
        private router: Router,
    ) {}

    ratingForm = new FormGroup({
        grade: new FormControl(5, [Validators.required]),
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
                    this.ratingForm.disable();
                    if (this.rating == null) {
                        this.canDelete = false;
                        this.canEdit = false;
                        this.canAdd = true;
                        this.ratingForm.enable();
                    }
                },
                error: () => {},
            });
    }

    ngOnChanges(): void {
        this.ratingForm.reset({ grade: 5 });
    }

    addRating(): void {
        const rating: Rating = {
            grade: this.ratingForm.value.grade || 5,
            comment: this.ratingForm.value.comment || "",
            dateTime: new Date(),
            userId: this.authService.user$.getValue().id,
        };
        this.marketplaceService.addRating(rating).subscribe({
            next: (result: Rating) => {
                this.canDelete = true;
                this.canEdit = true;
                this.canAdd = false;
                //this.router.navigate(['../home'])
                this.ratingForm.disable();
                this.rating = result;
            },
        });
    }

    deleteRating(id: number): void {
        this.marketplaceService.deleteRating(id).subscribe({
            next: () => {
                this.ratingForm.reset({ grade: 5 });
                this.getRating();
            },
        });
    }

    updateRating(): void {
        const rating: Rating = {
            grade: this.ratingForm.value.grade || 5,
            comment: this.ratingForm.value.comment || "",
            dateTime: new Date(),
            userId: this.authService.user$.getValue().id,
        };
        rating.id = this.rating.id;
        this.marketplaceService.updateRating(rating).subscribe({
            next: (result: Rating) => {
                this.rating = result;
                this.isEditing = false;
                this.ratingForm.disable();
            },
        });
    }

    onUpdateClicked(): void {
        this.isEditing = true;
        this.ratingForm.enable();
    }
}
