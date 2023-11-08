import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { KeyPoint } from '../model/key-point.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/env/environment';
import { MapService } from 'src/app/shared/map/map.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MapComponent } from 'src/app/shared/map/map.component';
import { Tour, TourStatus } from '../model/tour.model';
import { FormControl, FormGroup } from '@angular/forms';
import { TourDuration, TransportType } from '../model/tourDuration.model';

@Component({
  selector: 'xp-key-points',
  templateUrl: './key-points.component.html',
  styleUrls: ['./key-points.component.css']
})
export class KeyPointsComponent implements OnInit {

  tour: Tour | null = null;
  keyPoints: KeyPoint[] = [];
  selectedKeyPoint: KeyPoint | null = null;
  mapLongLat: [number, number];
  mapLocationAddress: string;
  shouldRenderKeyPointForm: boolean = false;
  shouldEdit: boolean = false;
  refreshEventsSubject: BehaviorSubject<number>;
  tourIdTemp: number = 0;
  areButtonsEnabled: boolean = true;
  @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;

  public distance: number;
  public walkingDuration: number = 0;
  public bicycleRideDuration: number = 0;
  public carRideDuration: number = 0;
  
  checkedWalkingDuration: boolean = false;
  checkedBicycleRideDuration: boolean = false;
  checkedCarRideDuration: boolean = false;

  constructor(private route: ActivatedRoute, private service: TourAuthoringService, private mapService: MapService, private router: Router) { }

  checkBoxForm = new FormGroup({
    onFootChecked: new FormControl<boolean>(false),
    bicycleRideChecked: new FormControl<boolean>(false),
    carRideChecked: new FormControl<boolean>(false)
  });

  ngOnInit(): void {
    this.getKeyPoints();
    this.enableButtons();
  }

  enableButtons(): void{
    this.service.getTour(this.tourIdTemp).subscribe(
      (tourResult: Tour | undefined) => {
        if(tourResult?.status == TourStatus.Published){
          this.areButtonsEnabled = false;
          this.getDurationInfo(tourResult);
        }
        else{
          this.areButtonsEnabled = true; 
        }
      },
    )
  } 

  getImagePath(imageName: string): string {
    return environment.imageHost + imageName;
  }

  deleteKeyPoint(id: number): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.service.deleteKeyPoint(+params.get('id')!, id).subscribe({
          next: () => {
            this.getKeyPoints();
          },
        });
      }
    });
  }

  getKeyPoints(): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        let tourId = +params.get('id')!;
        this.tourIdTemp = tourId;

        if (!this.refreshEventsSubject) {
          this.refreshEventsSubject = new BehaviorSubject<number>(tourId);
        } else {
          this.refreshEventsSubject.next(tourId);
        }

        this.service.getKeyPoints(tourId).subscribe({
          next: (result: KeyPoint[]) => {
            this.keyPoints = result;

            if(this.keyPoints.length < 2){
              this.walkingDuration = 0;
              this.bicycleRideDuration = 0;
              this.carRideDuration = 0;
            }
            else if(this.mapComponent.tourDistance != 0){
              this.calculateDurations(this.mapComponent.tourDistance);
            }
            else
            {
              this.service.getTour(this.tourIdTemp).subscribe({
                next: (result: Tour) => {
                  this.tour = result;
                  if(this.tour.distance){  
                    this.calculateDurations(this.tour.distance);
                    this.handleCheckBoxes(this.tour);
                  }
                }
              });
            }
          },
          error: () => { }
        });
      }
    });
  }

  onEditClicked(keyPoint: KeyPoint): void {
    this.selectedKeyPoint = keyPoint;
    this.shouldRenderKeyPointForm = true;
    this.shouldEdit = true;
  }

  onAddClicked(): void {
    this.selectedKeyPoint = null;
    this.shouldEdit = false;
    this.shouldRenderKeyPointForm = true;
  }

  async onBackClicked(): Promise<void> {
    if (this.mapComponent) {
      try {
        const result: Tour | undefined = await this.service.getTour(this.tourIdTemp).toPromise();
        if (result) {
              this.tour = result;
              if(this.mapComponent.waypointMap.size > 1){
                this.tour.distance = Math.round(this.mapComponent.tourDistance*100)/100;
                this.distance = Math.round(this.mapComponent.tourDistance*100)/100;
              }
              else{
                this.tour.distance = 0;
              }

              if(this.checkBoxForm.value.onFootChecked){
                const tourDuration: TourDuration = {
                  duration: this.walkingDuration,
                  transportType: TransportType.Walking
                };

                this.handleCheckedDurations(this.tour, tourDuration);
              }
              else{
                this.handleUncheckedDurations(this.tour, TransportType.Walking);
              }

              if(this.checkBoxForm.value.bicycleRideChecked){
                const tourDuration: TourDuration = {
                  duration: this.bicycleRideDuration,
                  transportType: TransportType.Bicycle
                };

                this.handleCheckedDurations(this.tour, tourDuration);
              }
              else{
                this.handleUncheckedDurations(this.tour, TransportType.Bicycle);
              }

              if(this.checkBoxForm.value.carRideChecked){
                const tourDuration: TourDuration = {
                  duration: this.carRideDuration,
                  transportType: TransportType.Car
                };
                
                this.handleCheckedDurations(this.tour, tourDuration);
              }
              else{
                this.handleUncheckedDurations(this.tour, TransportType.Car);
              }

              await this.service.updateTour(this.tour).toPromise();
        } else {
          console.error('Result is undefined');
        }
      } catch (err) {
        console.error(err);
      }
    }
  
    this.router.navigate(['/tours']);
  }

  calculateDurations(distance: number): void{
    this.walkingDuration = Math.round(distance / 3.6 * 60) + this.keyPoints.length * 15; 
    this.bicycleRideDuration = Math.round(distance / 20 * 60) + this.keyPoints.length * 15;
    this.carRideDuration = Math.round(distance / 50 * 60) + this.keyPoints.length * 15;
  }

  getDurationInfo(tour: Tour): void{
    if(tour.durations){
      for(let t of tour.durations){
        if (t.transportType == TransportType.Walking) {
          this.checkedWalkingDuration = true;
        } else if (t.transportType == TransportType.Bicycle) {
          this.checkedBicycleRideDuration = true;
        } else if (t.transportType == TransportType.Car) {
          this.checkedCarRideDuration = true;
        }
      }
    }
  }

  handleCheckBoxes(tour: Tour): void{
    // Tick all necessary checkboxes
    if (tour.durations) {
      for (let t of tour.durations) {
        if (t.transportType == TransportType.Walking) {
          this.checkBoxForm.get('onFootChecked')?.patchValue(true);
        } else if (t.transportType == TransportType.Bicycle) {
          this.checkBoxForm.get('bicycleRideChecked')?.patchValue(true);
        } else if (t.transportType == TransportType.Car) {
          this.checkBoxForm.get('carRideChecked')?.patchValue(true);
        }
      }
    }
  }

  handleCheckedDurations(tour: Tour, tourDuration: TourDuration): void{
    let shouldPush = true;
    if(tour.durations){
      let counter = 0;
      for(let t of tour.durations){
        if(t.transportType == tourDuration.transportType && t.duration == tourDuration.duration){
          shouldPush = false;
          break;
        }
        else if(t.transportType == tourDuration.transportType && t.duration != tourDuration.duration){
          tour.durations.splice(counter);
          break;
        }
        counter++;
      }
    }
                
    if(shouldPush){
      tour.durations?.push(tourDuration);
    }
  }

  handleUncheckedDurations(tour: Tour, type: TransportType): void {
    if(tour.durations){
      let counter = 0;
      for(let t of tour.durations){
        if(t.transportType == type){
          tour.durations.splice(counter);
          break;
        }
        counter++;
      }
    }
  }
}