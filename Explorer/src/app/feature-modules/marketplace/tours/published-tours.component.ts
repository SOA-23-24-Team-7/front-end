import { Component, OnInit } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MarketplaceService } from '../marketplace.service';
import { Tour } from '../../tour-authoring/model/tour.model';
import { KeyPoint } from '../../tour-authoring/model/key-point.model';

@Component({
  selector: 'xp-published-tours',
  templateUrl: './published-tours.component.html',
  styleUrls: ['./published-tours.component.css']
})

export class PublishedToursComponent implements OnInit {

  publishedTours: Tour[] = [];
  keyPoint: KeyPoint;

  constructor(private service: MarketplaceService) {}

  ngOnInit(): void {
    this.getPublishedTours();
  }

  getPublishedTours(): void {
    this.service.getPublishedTours().subscribe({
      next: (result: PagedResults<Tour>) =>{
        this.publishedTours = result.results;

        for(let pt of this.publishedTours){
          this.getFirstKeyPointForTour(pt);
        }
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }

  getFirstKeyPointForTour(tour: Tour): void {
    if(tour && tour.id){
      this.service.getToursFirstKeyPoint(tour.id).subscribe({
        next: (result: KeyPoint) => {
          this.keyPoint = result;    
          tour.keyPoints?.push(this.keyPoint);      
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  };
}