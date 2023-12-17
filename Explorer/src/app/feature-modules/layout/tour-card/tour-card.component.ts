import { Component, Input, OnInit } from "@angular/core";
import { Tour } from "../../tour-authoring/model/tour.model";
import { environment } from "src/env/environment";
import { faC, faCoins } from "@fortawesome/free-solid-svg-icons";
@Component({
    selector: "xp-tour-card",
    templateUrl: "./tour-card.component.html",
    styleUrls: ["./tour-card.component.css"],
})
export class TourCardComponent implements OnInit{
    @Input() tour: any;
    visibleTags:[];
    remainingTags:[];
    showMore:boolean;
    displayedTags:string[];
    images:string[] = []
    currentIndex = 0;
    interval:any;
    faCoins=faCoins;
    ngOnInit(): void {
        this.visibleTags = this.tour.tags.slice(0, 3);
        this.remainingTags = this.tour.tags.slice(3);
        this.showMore = false;
        this.displayedTags=this.visibleTags;
        
        this.startImageChangeInterval();

    }
    toggleShowMore() {
        this.showMore = !this.showMore;
        this.displayedTags = this.showMore ? [...this.visibleTags, ...this.remainingTags] : this.visibleTags.slice(0, 3);
    }
    getImagePath(): string {
        for(let kp of this.tour.keyPoints){
            this.images.push(environment.imageHost +kp.imagePath);
        }
        return this.images.length > 0 ? this.images[this.currentIndex] :  environment.imageHost +this.tour.keyPoints[0].imagePath;
        //return environment.imageHost +this.tour.keyPoints[0].imagePath ;
    }
    // tour-card.component.ts

  
  ngOnDestroy(): void {
    this.stopImageChangeInterval();
  }
  
  startImageChangeInterval(): void {
    this.interval = setInterval(() => this.changeImage(), 3000);
  }
  
  stopImageChangeInterval(): void {
    clearInterval(this.interval);
  }
  
  changeImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  
   
}
