import { Component, OnInit } from "@angular/core";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { AdministrationService } from "../administration.service";
import { RatingUsername } from "../model/ratingWithUsername";

@Component({
    selector: "xp-rating",
    templateUrl: "./rating.component.html",
    styleUrls: ["./rating.component.css"],
})
export class RatingComponent implements OnInit {
    ratings: RatingUsername[] = [];

    constructor(private service: AdministrationService) {}

    ngOnInit(): void {
        this.getRatings();
    }

    getRatings(): void {
        this.service.getRatings().subscribe({
            next: (result: PagedResults<RatingUsername>) => {
                this.ratings = result.results;
            },
            error: () => {},
        });
    }
}
