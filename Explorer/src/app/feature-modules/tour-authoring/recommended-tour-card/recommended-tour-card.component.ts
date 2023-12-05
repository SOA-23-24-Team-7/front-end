import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { environment } from "src/env/environment";
import { KeyPointsViewComponent } from "../../tour-execution/key-points-view/key-points-view.component";
import { TourExecutionService } from "../../tour-execution/tour-execution.service";
import { Tour } from "../model/tour.model";
import { MarketplaceService } from "../../marketplace/marketplace.service";
import { AdministrationService } from "../../administration/administration.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";


@Component({
    selector: "xp-recommended-tour-card",
    templateUrl: "./recommended-tour-card.component.html",
    styleUrls: ["./recommended-tour-card.component.css"],
})
export class RecommendedTourCardComponent {
  @Input() tour: Tour;
  @Input() hasActiveTour: boolean;
  @Input() activeTourId: number;
  tourImage: string
  isTourActive: boolean = false
  user: User;
  
  constructor(private router: Router, private service: MarketplaceService, public dialogRef: MatDialog, private authService: AuthService){}
  
  ngOnInit(): void {
    this.tourImage = environment.imageHost + this.tour.keyPoints![0].imagePath;
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
  
  BuyTour(): void {
        if (this.tour.id != null) {
            this.service.addToken(
                this.tour.id,
                this.user.id,
                this.tour.price as number,
                this.tour.price as number,
            );
            alert("You have successfully bought the tour!");
        }
    }

  ShowKeyPoints() {
    const dialogRef = this.dialogRef.open(KeyPointsViewComponent, {
        data: {
            keyPoints: this.tour.keyPoints,
        },
    });    
  }

}
