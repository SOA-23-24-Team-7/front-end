import { Component, Input, OnInit } from "@angular/core";
import { Review } from "../model/review.model";
import { MarketplaceService } from "../marketplace.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ReviewFormComponent } from "../review-form/review-form.component";
import {
    faStar,
    faEdit,
    faTrashAlt,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FullSizeImageComponent } from "../full-size-image/full-size-image.component";

@Component({
    selector: "xp-review",
    templateUrl: "./review.component.html",
    styleUrls: ["./review.component.css"],
})
export class ReviewComponent implements OnInit {
    user: User;
    reviews: Review[] = [];
    selectedReview: Review;
    shouldEdit: boolean;
    shouldRenderReviewForm: boolean = false;
    tourId: number;
    tourIdHelper: number;
    faStar = faStar;
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;
    faXmark = faXmark;
    @Input() reviewExists: boolean = false;

    constructor(
        private service: MarketplaceService,
        private authService: AuthService,
        private route: ActivatedRoute,
        public dialogRef: MatDialog,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });

        this.route.params.subscribe(params => {
            this.tourId = params["tourId"];
            this.getReviews();
        });
    }

    getReviews(): void {
        if (this.tourId > 0) {
            this.tourIdHelper = this.tourId;
            this.service.getReviews(this.tourIdHelper).subscribe({
                next: (result: PagedResults<Review>) => {
                    this.reviews = result.results;
                    this.service
                        .reviewExists(this.user.id, this.tourIdHelper)
                        .subscribe({
                            next: (result: boolean) => {
                                this.reviewExists = result;
                            },
                        });
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
        }
    }

    getReviewsByTourId(): void {
        this.service.getReviews(this.tourIdHelper).subscribe({
            next: (result: PagedResults<Review>) => {
                this.reviews = result.results;
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }

    onEditClicked(review: Review): void {
        this.shouldRenderReviewForm = true;
        this.selectedReview = review;
        this.shouldEdit = true;
        const dialogRef = this.dialogRef.open(ReviewFormComponent, {
            data: {
                shouldEdit: true,
                tourIdHelper: this.tourIdHelper,
                review: this.selectedReview,
            },
        });

        dialogRef.afterClosed().subscribe((result: Array<boolean>) => {
            console.log("Rezultat recenzije:", result);
            if (result[1] == true) {
                this.getReviewsByTourId();
            }
        });
    }

    onAddClicked(): void {
        if (this.tourIdHelper > 0) {
            this.shouldRenderReviewForm = true;
            this.shouldEdit = false;
        }
        const dialogRef = this.dialogRef.open(ReviewFormComponent, {
            data: {
                shouldEdit: false,
                tourIdHelper: this.tourIdHelper,
            },
        });

        dialogRef.afterClosed().subscribe((result: Array<boolean>) => {
            console.log("Rezultat recenzije:", result);
            this.reviewExists = result[0];
            if (this.reviewExists == true) {
                this.getReviewsByTourId();
            }
        });
    }

    deleteReview(review: Review): void {
        this.service.deleteReview(review).subscribe({
            next: () => {
                this.service.getReviews(this.tourIdHelper).subscribe({
                    next: (result: PagedResults<Review>) => {
                        this.reviews = result.results;
                        this.reviewExists = false;
                    },
                    error: (err: any) => {
                        console.log(err);
                    },
                });
            },
        });
    }

    /* onReviewAdded(isAdded: boolean) {
        this.reviewExists = isAdded;
    }*/
    toggleShowMore(review: Review) {
        review.showMore = !review.showMore;
    }

    showImage(imageUrl: string) {
        const dialogRef = this.dialogRef.open(FullSizeImageComponent, {
            data: {
                imagePath: imageUrl,
            },
        });
    }
}
