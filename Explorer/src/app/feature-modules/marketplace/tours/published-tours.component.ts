import { Component, OnInit, Input } from "@angular/core";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { MarketplaceService } from "../marketplace.service";
import { Tour } from "../../tour-authoring/model/tour.model";
import { KeyPoint } from "../../tour-authoring/model/key-point.model";
import { TourLimitedView } from "../model/tour-limited-view.model";
import { MatDialog } from "@angular/material/dialog";
import { Review } from "../model/review.model";
import { ReviewCardComponent } from "../../layout/review-cards/review-card.component";

@Component({
    selector: "xp-published-tours",
    templateUrl: "./published-tours.component.html",
    styleUrls: ["./published-tours.component.css"],
})
export class PublishedToursComponent implements OnInit {
    @Input() inputTours: TourLimitedView[];
    publishedTours: TourLimitedView[] = [];

    constructor(
        private service: MarketplaceService,
        public dialogRef: MatDialog,
    ) {}

    ngOnInit(): void {
        //enabling input
        console.log(this, this.inputTours);
        if (!this.inputTours || this.inputTours.length === 0)
            this.getPublishedTours();
        else this.publishedTours = this.inputTours;
    }

    ngOnChanges(): void {
        this.publishedTours = this.inputTours;
    }

    getPublishedTours(): void {
        this.service.getPublishedTours().subscribe({
            next: (result: PagedResults<TourLimitedView>) => {
                this.publishedTours = result.results;
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }
    openDialog(input: Review[]) {
        console.log(input);
        const dialogRef = this.dialogRef.open(ReviewCardComponent, {
            //data: this.listaJavnihTacaka, // lista javnih tacaka koju dobijam u ovoj komponenti i ovim je saljem u modalni dijalog
            height: "400px",
            width: "600px",
            data: {
                reviews: input,
            },
        });
    }
}
