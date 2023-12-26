import { Component, OnInit } from "@angular/core";
import { KeyPointCardComponent } from "../../tour-authoring/key-point-card/key-point-card.component";
import {
    faStar,
    faCoins,
    faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Tour } from "../../tour-authoring/model/tour.model";
import { ActivatedRoute } from "@angular/router";
import { TourAuthoringService } from "../../tour-authoring/tour-authoring.service";
import { environment } from "src/env/environment";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { OrderItem } from "../model/order-item";
import { MarketplaceService } from "../marketplace.service";
import { ShoppingCart } from "../model/shopping-cart";
import { TourLimitedView } from "../model/tour-limited-view.model";
import { TourToken } from "../model/tour-token.model";

@Component({
    selector: "xp-tour-page",
    templateUrl: "./tour-page.component.html",
    styleUrls: ["./tour-page.component.css"],
})
export class TourPageComponent {
    faStar = faStar;
    faCoins = faCoins;
    faCartShopping = faCartShopping;
    tour?: Tour;
    tourId: number;
    imageHost: string = environment.imageHost;
    images: string[] = [];
    user: User;
    currentIndex: number = 0;
    keyPointContainer: any;
    shoppingCart: ShoppingCart = {};
    addedTours: TourLimitedView[] = [];
    tokens: TourToken[] = [];

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private service: TourAuthoringService,
        private marketplaceService: MarketplaceService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.tourId = params["tourId"];
            this.service.getTour(this.tourId).subscribe({
                next: (result: Tour) => {
                    this.tour = result;
                    if (this.tour.keyPoints)
                        this.images = this.tour.keyPoints.map(kp =>
                            kp.imagePath.startsWith("http")
                                ? kp.imagePath
                                : environment.imageHost + kp.imagePath,
                        );
                },
            });
        });

        this.authService.user$.subscribe(user => {
            this.user = user;
            if (user.role.toLocaleLowerCase() === "tourist") {
                this.getShoppingCart();
            }
        });

        this.keyPointContainer = document.querySelector(
            ".key-point-cards-container",
        );
    }

    formatDate(date: Date | undefined): string | null {
        if (!this.tour) return "01. 01. 0001.";
        if (!date) return "01. 01. 0001.";
        const dateString = date?.toString();
        const year = parseInt(dateString.slice(0, 4), 10);
        const month = parseInt(dateString.slice(5, 7), 10) - 1;
        const day = parseInt(dateString.slice(8, 10), 10);
        return `${day}. ${month}. ${year}.`;
    }

    scrollToNextCard(): void {
        this.currentIndex++;
        if (this.currentIndex >= this.keyPointContainer.children.length) {
            this.currentIndex = 0;
        }
        this.keyPointContainer.scrollLeft +=
            this.keyPointContainer.children[this.currentIndex].clientWidth;
    }

    scrollToPrevCard(): void {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.keyPointContainer!.children.length - 1;
        }
        this.keyPointContainer!.scrollLeft -=
            this.keyPointContainer.children[this.currentIndex].clientWidth;
    }

    addOrderItem(): void {
        const orderItem: OrderItem = {
            tourId: this.tour?.id,
            tourName: this.tour?.name,
            price: this.tour?.price,
            shoppingCartId: this.shoppingCart.id,
        };
        console.log(orderItem);
        if (this.addedTours.find(tr => tr.id == this.tour?.id)) {
            alert("You have already added this item to the cart.");
            return;
        }
        if (this.tokens.find(tok => tok.tourId == this.tour?.id)) {
            alert("You have already purcheased this tour.");
            return;
        }
        this.marketplaceService.addOrderItem(orderItem).subscribe({
            next: (result: OrderItem) => {
                this.marketplaceService.getToursInCart(this.user.id).subscribe({
                    next: result => {
                        this.addedTours = result.results;
                        this.marketplaceService
                            .getShoppingCart(this.user.id)
                            .subscribe();
                        alert("Item successfully added to cart!");
                    },
                });
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }

    getShoppingCart(): void {
        this.marketplaceService.cart$.subscribe({
            next: (result: ShoppingCart) => {
                this.shoppingCart = result;
                console.log(result);
                this.getTokens();
                if (result == null) {
                    this.shoppingCart = {};
                    this.marketplaceService
                        .addShoppingCart(this.shoppingCart)
                        .subscribe({
                            next: (result: ShoppingCart) => {
                                this.shoppingCart = result;
                                this.getTokens();
                            },
                        });
                } else {
                    this.marketplaceService
                        .getToursInCart(this.user.id)
                        .subscribe({
                            next: result => {
                                this.addedTours = result.results;
                            },
                        });
                }
            },
        });
    }

    getTokens(): void {
        this.marketplaceService.getTouristTokens().subscribe({
            next: result => {
                this.tokens = result;
            },
        });
    }

    onImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        if (target) {
            target.src =
                "https://imgs.search.brave.com/udmDGOGRJTYO6lmJ0ADA03YoW4CdO6jPKGzXWvx1XRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzY4LzU1LzYw/LzM2MF9GXzI2ODU1/NjAxMl9jMVdCYUtG/TjVyalJ4UjJleVYz/M3puSzRxblllS1pq/bS5qcGc";
        }
    }
}
