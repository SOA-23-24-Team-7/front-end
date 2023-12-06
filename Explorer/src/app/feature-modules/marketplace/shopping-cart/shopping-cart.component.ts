import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { TourLimitedView } from "../../marketplace/model/tour-limited-view.model";
import { MarketplaceService } from "../../marketplace/marketplace.service";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { Review } from "../../marketplace/model/review.model";
import { ReviewCardComponent } from "../../layout/review-cards/review-card.component";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { OrderItem } from "../model/order-item";
import { Observable } from "rxjs";
import { ShoppingCart } from "../model/shopping-cart";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { TourToken } from "../model/tour-token.model";
import { StakeholderService } from "../../stakeholder/stakeholder.service";
import { CouponsModalComponent } from "../coupons-modal/coupons-modal.component";
import { Bundle } from "../../tour-authoring/model/bundle.model";

@Component({
    selector: "xp-shopping-cart",
    templateUrl: "./shopping-cart.component.html",
    styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent {
    user: User;
    orderItem: OrderItem;
    shoppingCart: ShoppingCart;
    isDisabled: boolean;
    bundles: Bundle[] = [];

    constructor(
        private service: MarketplaceService,
        private stakeholderService: StakeholderService,
        public dialogRef: MatDialog,
        public dialogRefCoupons: MatDialog,
        private authService: AuthService,
        public dialog: MatDialogRef<ShoppingCartComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
            this.getShoppingCart();
        });
    }

    getBundles() {
        this.bundles = [];
        this.shoppingCart.bundleOrderItems?.forEach(boi => {
            this.service.getBundleById(boi.bundleId!).subscribe({
                next: (result: Bundle) => {
                    this.bundles.push(result);
                }
            })
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
                                        this.isEmpty();
                                        this.getShoppingCart(); // update the price
                                    },
                                });
                        },
                    });
            },
        });
    }
    getShoppingCart(): void {
        this.service.getShoppingCart(this.user.id).subscribe({
            next: (result: ShoppingCart) => {
                this.shoppingCart = result;
                this.isEmpty();
                this.getBundles();
            },
        });
    }
    checkout(): void {
        var totalPrice = this.shoppingCart.totalPrice;
        var storedShoppingCart = this.shoppingCart;
        var uslo = false;
        console.log(totalPrice);
        this.stakeholderService.getTouristWallet().subscribe(result => {
            var wallet = result;
            if (wallet.adventureCoin >= (totalPrice as number)) {
                //dobaviti order iteme
                const orderItems = this.shoppingCart.orderItems;

                this.service
                    .deleteShoppingKart(this.shoppingCart.id)
                    .subscribe({
                        next: () => {
                            this.shoppingCart = {};
                            console.log(storedShoppingCart);
                            this.service
                                .addShoppingCart(this.shoppingCart)
                                .subscribe({
                                    next: async (result: ShoppingCart) => {
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
                                                    tour.id,
                                                    this.shoppingCart
                                                        .touristId as number,
                                                    totalPrice as number,
                                                    orderItemPrice as number,
                                                );
                                            totalPrice =
                                                (totalPrice as number) -
                                                tour.price;
                                            console.log(result);
                                            alert(
                                                "You have successfully bought tours!",
                                            );
                                            this.shoppingCart = newShoppingCart;
                                        }
                                        for (let boi of this.shoppingCart.bundleOrderItems!) {
                                            await this.service.buyBundle(boi.bundleId!);
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

    isEmpty(): boolean {
        return this.data.length == 0 && this.bundles.length == 0;
    }

    removeBundleOrderItem() {
        // this.bundles = this.bundles.filter(b => b.id != bundleId);
        this.getShoppingCart();
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
}
