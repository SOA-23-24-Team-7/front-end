import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/env/environment';
import { KeyPointsViewComponent } from '../../tour-execution/key-points-view/key-points-view.component';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { Tour } from '../model/tour.model';
import { MarketplaceService } from '../../marketplace/marketplace.service';

@Component({
  selector: 'xp-recommended-tour-card',
  templateUrl: './recommended-tour-card.component.html',
  styleUrls: ['./recommended-tour-card.component.css']
})
export class RecommendedTourCardComponent {
  @Input() tour: Tour;
  @Input() hasActiveTour: boolean;
  @Input() activeTourId: number;
  tourImage: string
  isTourActive: boolean = false
  
  constructor(private router: Router, private service: MarketplaceService, public dialogRef: MatDialog){}
  
  ngOnInit(): void {
    //this.CheckIfTourIsActive()
    this.tourImage = environment.imageHost + this.tour.keyPoints![0].imagePath
  }
  
  /*StartTour(){
    this.service.startTour(this.tour.id!).subscribe(() => {
      this.router.navigate(['/tour-executing/' + this.tour.id]);
    });
  }*/
  
  /*ContinueTour(){
    this.router.navigate(['/tour-executing/' + this.tour.id]);
  }*/
  
  /*CheckIfTourIsActive(){
    if(this.hasActiveTour){
      if(this.tour.id == this.activeTourId){
        this.isTourActive = true
      }
    }
  }*/
  
  BuyTour(): void{
    if(this.tour.id != null){
      this.service.addToken(this.tour.id);
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
