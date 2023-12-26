import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
} from "@angular/core";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { MarketplaceService } from "../../feature-modules/marketplace/marketplace.service";
import { environment } from "src/env/environment";
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
    faBarChart,
    faBookmark,
    faMap

} from "@fortawesome/free-solid-svg-icons";
import { TourLimitedView } from "../../feature-modules/marketplace/model/tour-limited-view.model";
import { Tour } from "../../feature-modules/tour-authoring/model/tour.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { TourToken } from "../../feature-modules/marketplace/model/tour-token.model";
import { ShoppingCart } from "../../feature-modules/marketplace/model/shopping-cart";
import { OrderItem } from "../../feature-modules/marketplace/model/order-item";
import { TourAuthoringService } from "../../feature-modules/tour-authoring/tour-authoring.service";
import { KeyPoint } from "../../feature-modules/tour-authoring/model/key-point.model";
import { MatDialog } from "@angular/material/dialog";
import { EditTourFormComponent } from "src/app/feature-modules/tour-authoring/edit-tour-form/edit-tour-form.component";
import { CouponsComponent } from "src/app/feature-modules/marketplace/coupons/coupons.component";
import { NotifierService } from "angular-notifier";
import { xpError } from "../model/error.model";

@Component({
    selector: "xp-tour-card-view",
    templateUrl: "./tour-card-view.component.html",
    styleUrls: ["./tour-card-view.component.css"],
})
export class TourCardViewComponent implements OnChanges {
    faStar = faStar;
    faCoins = faCoins;
    faCartShopping = faCartShopping;
    faShareNodes = faShareNodes;
    faMapLocation = faMapLocation;
    faPersonHiking = faPersonHiking;
    faPen = faPen;
    faTrash = faTrash;
    faBoxArchive = faBoxArchive;
    faMoneyBills = faMoneyBills;
    faBarChart = faBarChart;
    faBookmark = faBookmark;
    faMap = faMap;
    user: User;
    @Input() hideIcons: boolean = false;
    @Input() tour: Tour;
    @Input() selectable: boolean = false;
    @Input() selected: boolean = false;
    @Input() preliminaryDiscount: number | null = null;
    @Input() hideAddToCart: boolean = false;
    discount: number | null = null;
    discountedPrice: number | null = null;
    addedTours: TourLimitedView[] = [];
    tokens: TourToken[] = [];
    shoppingCart: ShoppingCart = {};
    imageHost: string = environment.imageHost;
    images: string[] = [];
    @Output() notifyParent: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private authService: AuthService,
        private marketplaceService: MarketplaceService,
        private tourAuthoringService: TourAuthoringService,
        public dialogRef: MatDialog,
        private notifier: NotifierService,
    ) {}

    ngOnChanges(): void {
        this.discount = this.preliminaryDiscount;
        this.discountedPrice =
            this.tour.price! - this.tour.price! * this.discount!;
    }

    ngOnInit(): void {
        this.images = this.tour.keyPoints!.map(kp =>
            kp.imagePath.startsWith("http")
                ? kp.imagePath
                : environment.imageHost + kp.imagePath,
        );
        if (this.preliminaryDiscount) {
            this.discount = this.preliminaryDiscount;
            this.discountedPrice =
                this.tour.price! - this.tour.price! * this.discount!;
        } else {
            this.getDiscount();
        }

        this.authService.user$.subscribe(user => {
            this.user = user;
            if (user.role.toLocaleLowerCase() === "tourist") {
                this.getShoppingCart();
            }
        });
    }

    getDiscount() {
        this.marketplaceService
            .getDiscountForTour(this.tour.id!)
            .subscribe(discount => {
                this.discount = discount;
                if (this.discount) {
                    this.discountedPrice =
                        this.tour.price! - this.tour.price! * discount!;
                }
            });
    }

    getTour(id: number): void {
        this.marketplaceService.getTourById(1).subscribe({
            next: (result: Tour) => {
                this.tour = result;
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }

    getShoppingCart(): void {
        this.marketplaceService.getShoppingCart(this.user.id).subscribe({
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
        if (this.addedTours.find(tr => tr.id == tourId)) {
            alert("You have already added this item to the cart.");
            return;
        }
        if (this.tokens.find(tok => tok.tourId == tourId)) {
            alert("You have already purcheased this tour.");
            return;
        }
        this.marketplaceService.addOrderItem(orderItem).subscribe({
            next: (result: OrderItem) => {
                this.marketplaceService.getToursInCart(this.user.id).subscribe({
                    next: result => {
                        this.addedTours = result.results;
                        alert("Item successfully added to cart!");
                    },
                });
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }

    onPublishClicked(tour: Tour): void {
        if (tour.id) {
            this.tourAuthoringService.getKeyPoints(tour.id).subscribe({
                next: (result: KeyPoint[]) => {
                    const keyPoints = result;

                    if (
                        keyPoints.length > 1 &&
                        tour.durations &&
                        tour.durations.length > 0
                    ) {
                        this.tourAuthoringService.publishTour(tour).subscribe({
                            next: () => {
                                this.tour.status = 1;
                            },
                        });
                    } else {
                        alert(
                            "Tour can't be published because it does not have needed requiements!",
                        );
                    }
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
        }
    }

    onArchiveClicked(tour: Tour): void {
        this.tourAuthoringService.archiveTour(tour).subscribe({
            next: () => {
                this.tour.status = 2;
                this.notifier.notify("success", "Tour archived.");
            },
            error: err => {
                this.notifier.notify(
                    "error",
                    "Failed to archive tour. " + xpError.getErrorMessage(err),
                );
            },
        });
    }

  onEditClicked(): void {
    //this.shouldEdit = false;
    //this.shouldRenderTourForm = true;
    this.dialogRef.open(EditTourFormComponent, {
      data: this.tour,
      
    });
  }
  
  onCouponClicked(tour: Tour): void{
    this.dialogRef.open(CouponsComponent, {
      data: tour,
      
    });
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = "https://imgs.search.brave.com/udmDGOGRJTYO6lmJ0ADA03YoW4CdO6jPKGzXWvx1XRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzY4LzU1LzYw/LzM2MF9GXzI2ODU1/NjAxMl9jMVdCYUtG/TjVyalJ4UjJleVYz/M3puSzRxblllS1pq/bS5qcGc";
    }
  }

  onAddToWishlistClicked(tourId: number){
    this.marketplaceService.addTourToWishlist(tourId).subscribe({
        next: () => {
            this.notifier.notify("success", "Added to wishlist.");
        },
        error: err => {
            this.notifier.notify(
                "error",
                "Failed to add tour to wishlist. " + xpError.getErrorMessage(err),
            );
        },
    });
  }

}
