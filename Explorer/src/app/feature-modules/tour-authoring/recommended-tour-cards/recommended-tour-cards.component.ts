import { Component, ViewChild } from '@angular/core';
import { TourExecutionSession } from '../../tour-execution/model/tour-execution-session-model';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { Tour } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { TouristsKeyPointsComponent } from '../tourists-key-points/tourists-key-points.component';

@Component({
  selector: 'xp-recommended-tour-cards',
  templateUrl: './recommended-tour-cards.component.html',
  styleUrls: ['./recommended-tour-cards.component.css']
})
export class RecommendedTourCardsComponent {
  recommendedTours: Tour[] = []
  hasTourActive: boolean
  activeTourId: number
  keyPointIds: number[] = [];
  draftTour: Tour;
  @ViewChild(TouristsKeyPointsComponent, { static: false }) touristsKeyPointsComponent: TouristsKeyPointsComponent;

  constructor(private tourExecutionService: TourExecutionService, private tourAuthoringService: TourAuthoringService){}
  
  ngOnInit(): void {
    this.getTours();
    this.getLiveTour();
  }
  
  getTours(){
    this.tourAuthoringService.getTour(this.touristsKeyPointsComponent.tourIdTemp).subscribe({
      next: (result: Tour) => {
        this.draftTour = result;

        if(this.draftTour.keyPoints){
          for(let kp of this.draftTour.keyPoints){
              if(kp.id){
                  this.keyPointIds.push(kp.id);
              }
          }
    
          this.tourAuthoringService.getRecommendedTours(this.keyPointIds).subscribe({
              next: (result: Tour[]) => {
                  this.recommendedTours = result;
              },
              error:(err: any) => {
                console.log(err);
              }
          })
        }
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }
  
  getLiveTour(){
    this.tourExecutionService.getLiveTour().subscribe({
      next: (result: TourExecutionSession) =>{
        if(result == null){
          this.hasTourActive = false
          this.activeTourId = -1
        }else{
          this.hasTourActive = true
          this.activeTourId = result.tourId
        }
      }
    })
  }
}
