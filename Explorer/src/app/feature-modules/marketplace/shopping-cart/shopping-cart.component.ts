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
        //enabling input
        /*console.log(this, this.inputTours);
      if (!this.inputTours || this.inputTours.length === 0)
          //this.getPublishedTours();
      else this.publishedTours = this.inputTours;
      this.authService.user$.subscribe(user => {
          this.user = user;
          this.service.getShoppingCart(this.user.id).subscribe({
              next:(result:ShoppingCart)=>{
                  this.shoppingCart=result
                  console.log(result)
                  if(result==null){
                      this.shoppingCart={}
                      this.service.addShoppingCart(this.shoppingCart).subscribe({
                          next: (result: ShoppingCart) => {
                              this.shoppingCart = result;
                          }
                      })[
                  }
              }
          })
      });*/
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        this.getShoppingCart();
        this.isEmpty();
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
            },
        });
    }
    checkout(): void {
        for (let tour of this.data) {
            this.service.addToken(tour.id).subscribe({
                next: (result: TourToken) => {
                    console.log(result);
                },
            });
        }

        this.service.deleteShoppingKart(this.shoppingCart.id).subscribe({
            next: () => {
                this.dialogRef.closeAll();
                alert("You have successfully bought tours!");
                this.shoppingCart = {};
                this.service.addShoppingCart(this.shoppingCart).subscribe({
                    next: (result: ShoppingCart) => {
                        this.shoppingCart = result;
                    },
                });
            },
        });
    }
    isEmpty(): void {
        this.isDisabled = this.data.length == 0;
    }
}
