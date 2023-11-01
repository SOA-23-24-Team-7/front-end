import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { KeyPoint } from '../model/key-point.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/env/environment';
import { MapService } from 'src/app/shared/map/map.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourComponent } from '../tour/tour.component';
import { Tour } from '../model/tour.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

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
  shouldRenderKeyPointForm: boolean = false;
  shouldEdit: boolean = false;
  refreshEventsSubject: BehaviorSubject<number>;
  @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;
  tourIdTemp: number = 0;

  constructor(private route: ActivatedRoute, private service: TourAuthoringService, private mapService: MapService, private router: Router) { }

  ngOnInit(): void {
    this.getKeyPoints();
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
                console.log('prosao if i ispisuje distancu ' + this.tour.distance);
              }
              else{
                this.tour.distance = 0;
                console.log('usao u else');
              }
              await this.service.updateTour(this.tour).toPromise();
        } else {
          // Handle the case when result is undefined
          console.error('Result is undefined');
        }
      } catch (err) {
        console.error(err);
      }
    }
  
    this.router.navigate(['/tours']);
  }
}
