import { Component, OnInit } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { KeyPoint } from '../model/key-point.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/env/environment';
import { MapService } from 'src/app/shared/map/map.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'xp-key-points',
  templateUrl: './key-points.component.html',
  styleUrls: ['./key-points.component.css']
})
export class KeyPointsComponent implements OnInit {

  keyPoints: KeyPoint[] = [];
  selectedKeyPoint: KeyPoint | null = null;
  mapLongLat: [number, number];
  shouldRenderKeyPointForm: boolean = false;
  shouldEdit: boolean = false;
  refreshEventsSubject: BehaviorSubject<number>;

  constructor(private route: ActivatedRoute, private service: TourAuthoringService, private mapService: MapService) { }

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

}
