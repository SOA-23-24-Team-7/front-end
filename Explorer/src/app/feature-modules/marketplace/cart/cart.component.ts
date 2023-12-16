import { Component, OnInit } from "@angular/core";
import { ShoppingCart } from "../model/shopping-cart";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { MarketplaceService } from "../marketplace.service";
import { Bundle } from "../../tour-authoring/model/bundle.model";
import { StakeholderService } from "../../stakeholder/stakeholder.service";
import { Review } from "../model/review.model";
import { ReviewCardComponent } from "../../layout/review-cards/review-card.component";
import { MatDialog } from "@angular/material/dialog";
import { OrderItem } from "../model/order-item";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { TourLimitedView } from "../model/tour-limited-view.model";
import { CouponsModalComponent } from "../coupons-modal/coupons-modal.component";

@Component({
    selector: "xp-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
    shoppingCart: ShoppingCart;
    user: User;
    bundles: Bundle[] = [];
    orderItem: OrderItem;
    isDisabled: boolean;
    data: TourLimitedView[] = [];

    constructor(
        private service: MarketplaceService,
        private stakeholderService: StakeholderService,
        private authService: AuthService,
        public dialogRef: MatDialog,
        public dialogRefCoupons: MatDialog,
    ) {}

    ngOnInit(): void {
        const navHeight = document.querySelector(".navbar")!.clientHeight + 1;
        const newHeight = window.innerHeight - navHeight;

        document.getElementById("sidebar")!.style.height = `${newHeight}px`;

        this.authService.user$.subscribe(user => {
            this.user = user;
            this.getShoppingCart();
        });
    }

    showReviews(input: Review[]) {
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

    removeOrderItem(tourId: number): void {
        this.service.getOrderItem(tourId, this.user.id).subscribe({
            next: (result: OrderItem) => {
                this.orderItem = result;
                this.service
                    .removeOrderItem(
                        this.orderItem.id,
                        this.orderItem.shoppingCartId,
                    )
                    .subscribe({
                        next: () => {
                            alert("Item successfully removed from cart!");

                            this.service
                                .getToursInCart(this.user.id)
                                .subscribe({
                                    next: (
                                        result: PagedResults<TourLimitedView>,
                                    ) => {
                                        this.data = result.results;
                                        this.getShoppingCart(); // update the price
                                    },
                                });
                        },
                    });
            },
        });
    }

    getShoppingCart(): void {
        this.service.cart$.subscribe(cart => {
            this.shoppingCart = cart;
            this.getBundles();
            console.log(this.shoppingCart);
        });
    }

    getBundles() {
        this.bundles = [];
        this.shoppingCart.bundleOrderItems?.forEach(boi => {
            this.service.getBundleById(boi.bundleId!).subscribe({
                next: (result: Bundle) => {
                    this.bundles.push(result);
                },
            });
        });
    }

    checkout(): void {
        console.log("1");
        let totalPrice = this.shoppingCart.totalPrice;
        let storedShoppingCart = this.shoppingCart;
        let uslo = false;
        console.log(totalPrice);
        this.stakeholderService.getTouristWallet().subscribe(result => {
            console.log("2");
            var wallet = result;
            if (wallet.adventureCoin >= (totalPrice as number)) {
                //dobaviti order iteme
                const orderItems = this.shoppingCart.orderItems;
                const bundleOrderItems = this.shoppingCart.bundleOrderItems;
                this.service
                    .deleteShoppingKart(this.shoppingCart.id)
                    .subscribe({
                        next: () => {
                            console.log("3");
                            this.shoppingCart = {};
                            console.log(storedShoppingCart);
                            this.service
                                .addShoppingCart(this.shoppingCart)
                                .subscribe({
                                    next: async (result: ShoppingCart) => {
                                        console.log("4");
                                        this.shoppingCart = result;
                                        var newShoppingCart = result;
                                        for (let tour of this.data) {
                                            this.shoppingCart =
                                                storedShoppingCart;
                                            const orderItemPrice =
                                                orderItems?.find(
                                                    o => o.tourId == tour.id,
                                                )?.price;
                                            const result =
                                                await this.service.addToken(
                                                    tour.id!,
                                                    this.shoppingCart
                                                        .touristId as number,
                                                    totalPrice as number,
                                                    orderItemPrice as number,
                                                );
                                            totalPrice =
                                                (totalPrice as number) -
                                                tour.price!;
                                            console.log(result);
                                            alert(
                                                "You have successfully bought tours!",
                                            );
                                            this.shoppingCart = newShoppingCart;
                                        }
                                        for (let boi of bundleOrderItems!) {
                                            console.log("5");
                                            this.service
                                                .buyBundle(boi.bundleId!)
                                                .subscribe({
                                                    next: () => {},
                                                });
                                        }
                                        this.dialogRef.closeAll();
                                    },
                                });
                        },
                    });
            } else {
                alert("You don't have enough coins.");
            }
        });
    }

    openCouponModal(): void {
        const dialogRef = this.dialogRefCoupons.open(CouponsModalComponent, {
            //data: this.listaJavnihTacaka, // lista javnih tacaka koju dobijam u ovoj komponenti i ovim je saljem u modalni dijalog
            height: "400px",
            width: "300px",
            data: {
                shoppingCartId: this.shoppingCart.id,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getShoppingCart(); // update the price
        });
    }

    // isEmpty(): boolean {
    //     return this.data.length === 0 && this.bundles.length === 0;
    // }
}
