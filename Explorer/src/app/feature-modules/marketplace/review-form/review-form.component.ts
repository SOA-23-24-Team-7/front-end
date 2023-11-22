import {
    Inject,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    OnInit,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MarketplaceService } from "../marketplace.service";
import { Review } from "../model/review.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-review-form",
    templateUrl: "./review-form.component.html",
    styleUrls: ["./review-form.component.css"],
})
export class ReviewFormComponent implements OnChanges, OnInit {
    @Output() reviewsUpdated = new EventEmitter<null>();
    //@Output() reviewAdded = new EventEmitter<boolean>();
    review: Review;
    //@Input() shouldEdit: boolean = false;
    //@Input() tourIdHelper: number;
    //@Input() reviewExists: boolean;
    shouldEdit: boolean = false;
    tourIdHelper: number;
    faXmark = faXmark;
    //imageList: { url: string }[] = [];
    constructor(
        private service: MarketplaceService,
        public dialog: MatDialogRef<ReviewFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {
        this.shouldEdit = this.data.shouldEdit;
        this.tourIdHelper = this.data.tourIdHelper;
        this.reviewForm.reset();
        if (this.shouldEdit) {
            this.review = this.data.review;
            this.reviewForm.patchValue(this.review);
            this.imagesList = this.review.images;
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.reviewForm.reset();
        if (this.shouldEdit) {
            this.reviewForm.patchValue(this.review);
        }
    }

    currentImageIndex = 0;
    imagesList: string[] = [];
    imagesForm = new FormGroup({
        image: new FormControl("", [Validators.required]),
    });

    reviewForm = new FormGroup({
        rating: new FormControl(0, [Validators.required]),
        comment: new FormControl("", [Validators.required]),
        tourVisitDate: new FormControl(new Date(), [Validators.required]),
        images: new FormControl(Array<string>(), [Validators.required]),
    });

    addReview(): void {
        if (this.isFormValid()) {
            const review: Review = {
                rating: this.reviewForm.value.rating || 0,
                comment: this.reviewForm.value.comment || "",
                tourVisitDate:
                    this.reviewForm.value.tourVisitDate || new Date(),
                tourId: this.tourIdHelper || 0,
                images: this.imagesList || Array<string>(),
            };

            this.service.addReview(review).subscribe({
                next: _ => {
                    this.reviewsUpdated.emit();
                    console.log(this.reviewForm.value);
                    this.reviewForm.reset();
                    this.imagesList = Array<string>();
                    //this.reviewAdded.emit(true);

                    this.dialog.close([true, false]); //review Added, review Updated
                },
            });
        } else alert("All fields are required.");
    }

    updateReview(): void {
        if (this.isFormValid()) {
            const review: Review = {
                rating: this.reviewForm.value.rating || 0,
                comment: this.reviewForm.value.comment || "",
                tourVisitDate:
                    this.reviewForm.value.tourVisitDate || new Date(),
                tourId: this.review.tourId || 0,
                images: this.imagesList || this.review.images,
            };
            review.id = this.review.id;
            review.touristId = this.review.touristId;
            review.commentDate = this.review.commentDate;
            this.service.updateReview(review).subscribe({
                next: () => {
                    //this.reviewsUpdated.emit();
                    this.reviewForm.reset();
                    this.dialog.close([false, true]); //review Added, review Updated
                },
            });
        } else alert("All fields are required.");
    }

    onFileSelected(event: any): void {
        const files = event.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imagesList.push(e.target.result);
                    this.currentImageIndex = this.imagesList.length - 1;
                };
                reader.readAsDataURL(files[i]);
            }
        }
    }

    onFileChange(event: any) {
        const fileList: FileList = event.target.files;
        for (let i = 0; i < fileList.length; i++) {
            this.imagesList.push(URL.createObjectURL(fileList[i]));
        }
    }
    showImage(index: number) {
        this.currentImageIndex = index;
    }

    changeImage(direction: number) {
        this.currentImageIndex += direction;
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.imagesList.length - 1;
        } else if (this.currentImageIndex >= this.imagesList.length) {
            this.currentImageIndex = 0;
        }
    }

    removeCurrentImage() {
        if (this.imagesList.length > 0) {
            this.imagesList.splice(this.currentImageIndex, 1);
            if (this.currentImageIndex >= this.imagesList.length) {
                this.currentImageIndex = this.imagesList.length - 1;
            }
        }
    }

    onClose(): void {
        this.dialog.close([false, false]);
    }

    isRatingInvalid(): boolean {
        return (
            this.reviewForm.value.rating == null ||
            this.reviewForm.value.rating == undefined ||
            this.reviewForm.value.rating < 1 ||
            this.reviewForm.value.rating > 5
        );
    }
    isDateInvalid(): boolean {
        return (
            this.reviewForm.value.tourVisitDate == null ||
            this.reviewForm.value.tourVisitDate == undefined ||
            this.reviewForm.value.tourVisitDate > new Date()
        );
    }
    isCommentInvalid(): boolean {
        return (
            this.reviewForm.value.comment == null ||
            this.reviewForm.value.comment == undefined ||
            this.reviewForm.value.comment == ""
        );
    }

    areImagesInvalid(): boolean {
        return this.imagesList.length < 1;
    }

    isFormValid(): boolean {
        if (
            !this.isCommentInvalid() &&
            !this.isDateInvalid() &&
            !this.isRatingInvalid() &&
            !this.areImagesInvalid()
        )
            return true;
        return false;
    }
}
