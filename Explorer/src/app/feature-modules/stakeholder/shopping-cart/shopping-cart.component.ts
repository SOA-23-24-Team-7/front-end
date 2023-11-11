import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { TourLimitedView } from "../../marketplace/model/tour-limited-view.model";
import { MarketplaceService } from "../../marketplace/marketplace.service";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { AuthService } from "src/app/infrastructure/auth/auth.service";

@Component({
    selector: "xp-shopping-cart",
    templateUrl: "./shopping-cart.component.html",
    styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent {
    @Input() inputTours: TourLimitedView[];
    @Output() onRemove = new EventEmitter<null>();
    cartTours: TourLimitedView[] = [];

    constructor(
        private service: MarketplaceService,
        public dialogRef: MatDialog,
        private authService: AuthService,
        public dialog: MatDialogRef<ShoppingCartComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    gOnInit(): void {
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
                      })
                  }
              }
          })
      });*/
    }
}
