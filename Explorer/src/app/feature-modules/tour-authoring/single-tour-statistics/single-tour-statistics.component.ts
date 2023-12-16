import { Component, OnInit } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { ActivatedRoute } from '@angular/router';
import { KeyPoint } from '../model/key-point.model';

@Component({
  selector: 'xp-single-tour-statistics',
  templateUrl: './single-tour-statistics.component.html',
  styleUrls: ['./single-tour-statistics.component.css']
})
export class SingleTourStatisticsComponent implements OnInit{
  
  salesNumber: string;
  startNumber: string;
  completionNumber: string;

  keyPoints: KeyPoint[] = [];
  keyPointContainer: any;

  statistics: number[] = [];

  constructor(private service: TourAuthoringService,
              private route: ActivatedRoute){ }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get("id");

    this.service.getSalesNumber(Number(param)).subscribe({
      next: (result: number) =>{
        this.salesNumber = result.toString();

        this.service.getStartsNumber(Number(param)).subscribe({
          next: (result: number) =>{
            this.startNumber = result.toString();

            this.service.getCompletionNumber(Number(param)).subscribe({
              next: (result: number) =>{
                this.completionNumber = result.toString();

              }
            });
          }
        });
      }
    });

    this.service.getKeyPoints(Number(param)).subscribe({
      next: (result: KeyPoint[]) =>{
        this.keyPoints = result;

        this.service.getKeyPointVisitPercentage(Number(param)).subscribe({
          next: (result: number[]) =>{
            this.statistics = result;
          }
        });
      }
    });
  }
  
  currentIndex: number = 0;

  scrollToNextCard(): void {
    this.currentIndex++;
    if (this.currentIndex >= this.keyPointContainer.children.length) {
        this.currentIndex = 0;
    }
    this.keyPointContainer.scrollLeft += this.keyPointContainer.children[this.currentIndex].clientWidth;
  }

  scrollToPrevCard(): void {
    this.currentIndex--;
    if (this.currentIndex < 0) {
        this.currentIndex = this.keyPointContainer!.children.length - 1;
    }
    this.keyPointContainer!.scrollLeft -= this.keyPointContainer.children[this.currentIndex].clientWidth;
  }

}
