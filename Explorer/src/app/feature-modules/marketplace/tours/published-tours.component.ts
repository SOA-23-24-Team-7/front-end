import { Component, OnInit, Input } from "@angular/core";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { MarketplaceService } from "../marketplace.service";
import { Tour } from "../../tour-authoring/model/tour.model";
import { KeyPoint } from "../../tour-authoring/model/key-point.model";
import { TourLimitedView } from "../model/tour-limited-view.model";
import { MatDialog } from "@angular/material/dialog";
import { Review } from "../model/review.model";
import { ReviewCardComponent } from "../../layout/review-cards/review-card.component";
import { ShoppingCart } from "../model/shopping-cart";
import { OrderItem } from "../model/order-item";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";

@Component({
    selector: "xp-published-tours",
    templateUrl: "./published-tours.component.html",
    styleUrls: ["./published-tours.component.css"],
})
export class PublishedToursComponent implements OnInit {
    @Input() inputTours: TourLimitedView[];
    publishedTours: TourLimitedView[] = [];
    user: User;
    addedTours: TourLimitedView[] = [];

    constructor(
        private service: MarketplaceService,
        public dialogRef: MatDialog,
        private authService: AuthService,
    ) {}
    shoppingCart: ShoppingCart = {};
    ngOnInit(): void {
        //enabling input
        console.log(this, this.inputTours);
        if (!this.inputTours || this.inputTours.length === 0)
            this.getPublishedTours();
        else this.publishedTours = this.inputTours;
        this.authService.user$.subscribe(user => {
            this.user = user;
            this.service.getShoppingCart(this.user.id).subscribe({
                next: (result: ShoppingCart) => {
                    this.shoppingCart = result;
                    console.log(result);
                    if (result == null) {
                        this.shoppingCart = {};
                        this.service
                            .addShoppingCart(this.shoppingCart)
                            .subscribe({
                                next: (result: ShoppingCart) => {
                                    this.shoppingCart = result;
                                },
                            });
                    }
                },
            });
        });
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
    addOrderItem(
        tourId: number | undefined,
        name: string,
        price: number | undefined,
    ): void {
        const orderItem: OrderItem = {
            tourId: tourId,
            tourName: name,
            price: price,
            shoppingCartId: this.shoppingCart.id,
        };
        console.log(orderItem);
        this.service.addOrderItem(orderItem).subscribe({
            next: (result: OrderItem) => {
                alert("Item successfully added to cart!");
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }

    openCartDialog() {
        this.service.getToursInCart(this.user.id).subscribe({
            next: (result: PagedResults<TourLimitedView>) => {
                this.addedTours = result.results;
                const dialogRef = this.dialogRef.open(ShoppingCartComponent, {
                    height: "600px",
                    width: "800px",
                    data: this.addedTours, // lista javnih tacaka koju dobijam u ovoj komponenti i ovim je saljem u modalni dijalog
                });
            },
        });
    }
}
