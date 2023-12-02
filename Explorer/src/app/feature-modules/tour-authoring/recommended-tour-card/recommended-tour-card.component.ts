import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/env/environment';
import { KeyPointsViewComponent } from '../../tour-execution/key-points-view/key-points-view.component';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { Tour } from '../model/tour.model';

@Component({
  selector: 'xp-recommended-tour-card',
  templateUrl: './recommended-tour-card.component.html',
  styleUrls: ['./recommended-tour-card.component.css']
})
export class RecommendedTourCardComponent {
  @Input() tour: Tour = {
    name: "name",
    description: "desc"
  };
  @Input() hasActiveTour: boolean;
  @Input() activeTourId: number;
  tourImage: string
  isTourActive: boolean = false
  
  constructor(private router: Router, private service: TourExecutionService, public dialogRef: MatDialog){}
  
  ngOnInit(): void {
    this.CheckIfTourIsActive()
    this.tourImage = environment.imageHost + this.tour.keyPoints![0].imagePath
  }
  
  StartTour(){
    this.service.startTour(this.tour.id!).subscribe(() => {
      this.router.navigate(['/tour-executing/' + this.tour.id]);
    });
  }
  
  ContinueTour(){
    this.router.navigate(['/tour-executing/' + this.tour.id]);
  }
  
  CheckIfTourIsActive(){
    if(this.hasActiveTour){
      if(this.tour.id == this.activeTourId){
        this.isTourActive = true
      }
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
