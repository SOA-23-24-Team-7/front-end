import { Component, OnInit } from "@angular/core";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { AdministrationService } from "../administration.service";
import { UserRating } from "../model/user-rating.model";

@Component({
    selector: "xp-rating",
    templateUrl: "./rating.component.html",
    styleUrls: ["./rating.component.css"],
})
export class RatingComponent implements OnInit {
    ratings: UserRating[] = [];
    ratingHistogram: number[] = [0, 0, 0, 0, 0]
    averageRating: number = 0;

    constructor(private service: AdministrationService) { }

    ngOnInit(): void {
        this.getRatings();
    }

    getRatings(): void {
        this.service.getRatings().subscribe({
            next: (result: PagedResults<UserRating>) => {
                this.ratings = result.results;

                let ratingCount = this.ratings.length;
                let ratingSums = [0, 0, 0, 0, 0];
                let ratingTotal = 0

                for (let rating of this.ratings) {
                    ratingSums[rating.grade - 1] += 1;
                    ratingTotal += rating.grade;
                }

                if (ratingCount) {
                    for (let grade of [1, 2, 3, 4, 5]) {
                        this.ratingHistogram[grade - 1] = ratingSums[grade - 1] / ratingCount * 100;
                    }

                    this.averageRating = ratingTotal / ratingCount;
                }
            },
            error: () => { },
        });
    }

    formatDate(d: any): string {
        let date = new Date(d);

        const formattedDate = date.toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

        return formattedDate;
    }
}
