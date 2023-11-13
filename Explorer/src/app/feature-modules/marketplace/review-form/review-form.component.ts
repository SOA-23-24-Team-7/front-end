import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MarketplaceService } from "../marketplace.service";
import { Review } from "../model/review.model";

@Component({
    selector: "xp-review-form",
    templateUrl: "./review-form.component.html",
    styleUrls: ["./review-form.component.css"],
})
export class ReviewFormComponent implements OnChanges {
    @Output() reviewsUpdated = new EventEmitter<null>();
    @Output() reviewAdded = new EventEmitter<boolean>();
    @Input() review: Review;
    @Input() shouldEdit: boolean = false;
    @Input() tourIdHelper: number;
    @Input() reviewExists: boolean;
    constructor(private service: MarketplaceService) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.reviewForm.reset();
        if (this.shouldEdit) {
            this.reviewForm.patchValue(this.review);
        }
    }

    imagesList: Array<string> = Array<string>();
    imagesForm = new FormGroup({
        image: new FormControl("", [Validators.required]),
    });

    reviewForm = new FormGroup({
        rating: new FormControl(0, [Validators.required]),
        comment: new FormControl("", [Validators.required]),
        tourVisitDate: new FormControl(new Date(), [Validators.required]),
        images: new FormControl(Array<string>(), [Validators.required]),
    });

    addImage(): void {
        const img = this.imagesForm.value.image || "";
        this.imagesList.push(img);
        this.imagesForm.reset();
    }

    addReview(): void {
        const review: Review = {
            rating: this.reviewForm.value.rating || 0,
            comment: this.reviewForm.value.comment || "",
            tourVisitDate: this.reviewForm.value.tourVisitDate || new Date(),
            tourId: this.tourIdHelper || 0,
            images: this.imagesList || Array<string>(),
        };

        this.service.addReview(review).subscribe({
            next: _ => {
                this.reviewsUpdated.emit();
                console.log(this.reviewForm.value);
                this.reviewForm.reset();
                this.imagesList = Array<string>();
                this.reviewAdded.emit(true);
            },
        });
    }

    updateReview(): void {
        const review: Review = {
            rating: this.reviewForm.value.rating || 0,
            comment: this.reviewForm.value.comment || "",
            tourVisitDate: this.reviewForm.value.tourVisitDate || new Date(),
            tourId: this.review.tourId || 0,
            images: this.review.images,
        };
        review.id = this.review.id;
        review.touristId = this.review.touristId;
        review.commentDate = this.review.commentDate;
        this.service.updateReview(review).subscribe({
            next: () => {
                this.reviewsUpdated.emit();
                this.reviewForm.reset();
            },
        });
    }
}
