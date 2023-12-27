import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
    faStar,
    faCoins,
    faCartShopping,
    faShareNodes,
    faMapLocation,
    faPersonHiking,
    faTrash,
    faBoxArchive,
    faPen,
    faMoneyBills,
    faBoxOpen,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { MarketplaceService } from "../../marketplace/marketplace.service";
import { TourAuthoringService } from "../tour-authoring.service";
import { MatDialog } from "@angular/material/dialog";
import { AddBundleFormComponent } from "../add-bundle-form/add-bundle-form.component";
import { EditBundleFormComponent } from "../edit-bundle-form/edit-bundle-form.component";
import { Bundle, BundleStatus } from "../model/bundle.model";
import { ViewBundleToursComponent } from "../view-bundle-tours/view-bundle-tours.component";
import { ShoppingCart } from "../../marketplace/model/shopping-cart";
import { TourToken } from "../../marketplace/model/tour-token.model";
import { Tour } from "../model/tour.model";
import { BundleOrderItem } from "../../marketplace/model/bundle-order-item.model";

@Component({
    selector: "xp-bundle-card",
    templateUrl: "./bundle-card.component.html",
    styleUrls: ["./bundle-card.component.css"],
})
export class BundleCardComponent {
    faStar = faStar;
    faCoins = faCoins;
    faCartShopping = faCartShopping;
    faShareNodes = faShareNodes;
    faMapLocation = faMapLocation;
    faPersonHiking = faPersonHiking;
    faTrash = faTrash;
    faBoxArchive = faBoxArchive;
    faPen = faPen;
    faMoneyBills = faMoneyBills;
    faBoxOpen = faBoxOpen;
    faXmark = faXmark;
    @Input() hideIcons: boolean = false;
    @Input() bundle: Bundle;
    @Input() showX: boolean = false;
    @Output() callParentMethodEvent: EventEmitter<void> =
        new EventEmitter<void>();
    user: User;
    shoppingCart: ShoppingCart;
    tokens: TourToken[];
    addedTours: Tour[];

    constructor(
        private authService: AuthService,
        private marketplaceService: MarketplaceService,
        private tourAuthoringService: TourAuthoringService,
        public dialogRef: MatDialog,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
            if (user.role.toLocaleLowerCase() === "tourist") {
                this.getShoppingCart();
            }
        });
    }

    onEditClicked(): void {
        this.dialogRef.open(EditBundleFormComponent, {
            data: this.bundle,
        });
    }

    publish(): void {
        if (this.bundle.bundleItems.length < 2) {
            alert(
                "You must have at least 2 published tours to publish a bundle.",
            );
            return;
        }

        this.tourAuthoringService.publishBundle(this.bundle.id!).subscribe({
            next: (result: Bundle) => {
                this.bundle.status = BundleStatus.Published;
                console.log("publishovano");
            },
        });
    }

    archive(): void {
        this.tourAuthoringService.archiveBundle(this.bundle.id!).subscribe({
            next: (result: Bundle) => {
                this.bundle.status = BundleStatus.Archived;
                console.log("arhivirano");
            },
        });
    }

    delete(): void {
        this.tourAuthoringService.deleteBundle(this.bundle.id!).subscribe({
            next: (result: Bundle) => {
                this.bundle.status = BundleStatus.Deleted;
                console.log("izbrisano");
            },
        });
    }

    viewTours(): void {
        this.dialogRef.open(ViewBundleToursComponent, {
            data: this.bundle,
        });
    }

    addBundleOrderItem(): void {
        console.log("pre");
        const bundleOrderItem = {
            bundleId: this.bundle.id,
            price: this.bundle.price,
        };
        let bundleIds = this.shoppingCart.bundleOrderItems?.map(
            boi => boi.bundleId,
        );
        console.log(this.shoppingCart);
        if (bundleIds?.includes(this.bundle.id)) {
            alert("You have already added this item to the cart.");
            return;
        }
        if (this.allToursPurchased()) {
            alert("You have already purcheased all tours in this bundle.");
            return;
        }
        this.marketplaceService.addBundleOrderItem(bundleOrderItem).subscribe({
            next: (result: any) => {
                this.marketplaceService.getToursInCart(this.user.id).subscribe({
                    next: result => {
                        this.getShoppingCart();
                        alert("Item successfully added to cart!");
                    },
                });
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }

    removeBundle(): void {
        this.shoppingCart.bundleOrderItems?.forEach(boi => {
            if (boi.bundleId == this.bundle.id) {
                this.marketplaceService
                    .removeBundleOrderItem(boi.id!)
                    .subscribe({
                        next: (result: any) => {
                            this.callParentMethod();
                            this.getShoppingCart();
                        },
                    });
            }
        });
    }

    allToursPurchased() {
        let tourIds = this.bundle.bundleItems.map(bi => bi.tourId);
        let flag = true;
        tourIds.forEach(tourId => {
            if (!this.isTourPurchased(tourId)) {
                flag = false;
            }
        });
        return flag;
    }

    isTourPurchased(tourId: number) {
        let flag = false;
        this.tokens.forEach(token => {
            if (token.tourId == tourId) {
                flag = true;
            }
        });
        return flag;
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

    callParentMethod() {
        this.callParentMethodEvent.emit();
    }
}
