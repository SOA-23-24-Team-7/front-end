import { Component, OnInit } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { KeyPoint } from '../model/key-point.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/env/environment';

@Component({
  selector: 'xp-key-points',
  templateUrl: './key-points.component.html',
  styleUrls: ['./key-points.component.css']
})
export class KeyPointsComponent implements OnInit {

  keyPoints: KeyPoint[] = [];
  selectedKeyPoint: KeyPoint;
  shouldRenderKeyPointForm: boolean = false;
  shouldEdit: boolean = false;

  constructor(private route: ActivatedRoute, private service: TourAuthoringService) { }

  ngOnInit(): void {
    this.getKeyPoints();
  }

  getImagePath(imageName: string): string {
    return environment.imageHost + imageName;
  }

  deleteKeyPoint(id: number): void {
    this.service.deleteKeyPoint(id).subscribe({
      next: () => {
        this.getKeyPoints();
      },
    })
  }

  getKeyPoints(): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.service.getKeyPoints(+params.get('id')!).subscribe({
          next: (result: KeyPoint[]) => {
            this.keyPoints = result;
          },
          error: () => {
          }
        });
      }
    })
  }

  onEditClicked(keyPoint: KeyPoint): void {
    this.selectedKeyPoint = keyPoint;
    this.shouldRenderKeyPointForm = true;
    this.shouldEdit = true;
  }

  onAddClicked(): void {
    this.shouldEdit = false;
    this.shouldRenderKeyPointForm = true;
  }

}
