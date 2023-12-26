
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
  faBarChart

} from "@fortawesome/free-solid-svg-icons";

import { User } from "src/app/infrastructure/auth/model/user.model";

import { MatDialog } from "@angular/material/dialog";
import { EditTourFormComponent } from "src/app/feature-modules/tour-authoring/edit-tour-form/edit-tour-form.component";
import { CouponsComponent } from "src/app/feature-modules/marketplace/coupons/coupons.component";
import { NotifierService } from "angular-notifier";
import { Tour } from "../../tour-authoring/model/tour.model";
import { TourLimitedView } from "../model/tour-limited-view.model";
import { TourToken } from "../model/tour-token.model";
import { MarketplaceService } from "../marketplace.service";
import { TourAuthoringService } from "../../tour-authoring/tour-authoring.service";

@Component({
  selector: 'xp-tourists-wishlist',
  templateUrl: './tourists-wishlist.component.html',
  styleUrls: ['./tourists-wishlist.component.css']
})
export class TouristsWishlistComponent {



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

  

  

  

  BuyTour(): void {
    if (this.tour.id != null) {
        this.marketplaceService.addToken(
            this.tour.id,
            this.user.id,
            this.tour.price as number,
            this.tour.price as number,
        );
        alert("You have successfully bought the tour!");
    }
  }

 

onImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  if (target) {
    target.src = "https://imgs.search.brave.com/udmDGOGRJTYO6lmJ0ADA03YoW4CdO6jPKGzXWvx1XRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzY4LzU1LzYw/LzM2MF9GXzI2ODU1/NjAxMl9jMVdCYUtG/TjVyalJ4UjJleVYz/M3puSzRxblllS1pq/bS5qcGc";
  }
}
}
