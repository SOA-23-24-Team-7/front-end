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

    constructor(
        private service: MarketplaceService,
        public dialogRef: MatDialog,
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
            },
        });
    }
    checkout(): void {
        var totalPrice=this.shoppingCart.totalPrice
        var storedShoppingCart=this.shoppingCart
        var uslo=false
        this.service.deleteShoppingKart(this.shoppingCart.id).subscribe({
            next: () => {
                this.shoppingCart = {};
                console.log(storedShoppingCart);
                this.service.addShoppingCart(this.shoppingCart).subscribe({
                    next: async (result: ShoppingCart) => {
                        this.shoppingCart = result;
                        var newShoppingCart=result;
                        for (let tour of this.data) {
                            this.shoppingCart=storedShoppingCart;
                            const result = await this.service.addToken(tour.id,this.shoppingCart.touristId as number,totalPrice as number);
                            console.log(result);
                            alert("You have successfully bought tours!");
                            this.shoppingCart=newShoppingCart;
                        }
                        this.dialogRef.closeAll();
                    }, 
                });
            },
        });
    }
    isEmpty(): void {
        this.isDisabled = this.data.length == 0;
    }
}
