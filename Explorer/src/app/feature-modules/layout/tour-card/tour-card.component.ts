import { Component, Input, OnInit } from "@angular/core";
import { Tour } from "../../tour-authoring/model/tour.model";
import { environment } from "src/env/environment";
import { faC, faCoins, faStar } from "@fortawesome/free-solid-svg-icons";
import { trigger, transition, style, animate } from "@angular/animations";
import { MarketplaceService } from "../../marketplace/marketplace.service";
@Component({
    selector: "xp-tour-card",
    templateUrl: "./tour-card.component.html",
    styleUrls: ["./tour-card.component.css"],
    animations: [
        trigger("carouselAnimation", [
            transition("void => *", [
                style({ opacity: 0 }),
                animate("300ms", style({ opacity: 1 })),
            ]),
            transition("* => void", [animate("300ms", style({ opacity: 0 }))]),
        ]),
    ],
})
export class TourCardComponent implements OnInit {
    @Input() tour: any;
    faStar = faStar;
    visibleTags: [];
    remainingTags: [];
    showMore: boolean;
    displayedTags: string[];
    images: string[] = [];
    currentIndex = 0;
    interval: any;
    faCoins = faCoins;
    image: string = "";
    discount: number | null = null;
    discountedPrice: number | null = null;
    constructor(private marketplaceService: MarketplaceService) {}
    ngOnInit(): void {
        this.visibleTags = this.tour.tags.slice(0, 3);
        this.remainingTags = this.tour.tags.slice(3);
        this.showMore = false;
        this.displayedTags = this.visibleTags;
        this.getImagePath();
        this.image = this.images[0];
        this.startImageChangeInterval();
        this.getDiscount();
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
    toggleShowMore() {
        this.showMore = !this.showMore;
        this.displayedTags = this.showMore
            ? [...this.visibleTags, ...this.remainingTags]
            : this.visibleTags.slice(0, 3);
    }
    getImagePath(): string {
        for (let kp of this.tour.keyPoints) {
            if (kp.imagePath.startsWith("http")) {
                // console.log(kp.imagePath)
                this.images.push(kp.imagePath);
            } else this.images.push(environment.imageHost + kp.imagePath);
        }
        var firstImage = this.tour.keyPoints[0].imagePath;
        if (!firstImage.startsWith("http"))
            firstImage = environment.imageHost + firstImage;
        return this.images.length > 0
            ? this.images[this.currentIndex]
            : firstImage;
        //return environment.imageHost +this.tour.keyPoints[0].imagePath ;
    }
    // tour-card.component.ts

    ngOnDestroy(): void {
        this.stopImageChangeInterval();
    }

    startImageChangeInterval(): void {
        this.interval = setInterval(() => this.changeImage(), 5000);
    }

    stopImageChangeInterval(): void {
        clearInterval(this.interval);
    }

    changeImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        //this.image=this.images[this.currentIndex]
        //this.startImageChangeInterval();
        //setInterval(()=>this.promeniSliku(), 3000); // Promena slike svakih 3 sekunde (3000ms)
    }

    getFirstImage() {
        return environment.imageHost + this.tour.keyPoints[0].imagePath;
    }
}
