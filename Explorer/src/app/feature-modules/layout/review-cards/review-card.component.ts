import { Component, Input, OnInit, Inject } from "@angular/core";
import { Review } from "../../marketplace/model/review.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "xp-review-card",
    templateUrl: "./review-card.component.html",
    styleUrls: ["./review-card.component.css"],
})
export class ReviewCardComponent {
    reviews: Review[];
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
    ngOnInit(): void {
        this.reviews = this.data.reviews;
    }
}
