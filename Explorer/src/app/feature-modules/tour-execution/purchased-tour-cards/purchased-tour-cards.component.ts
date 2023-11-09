import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourExecutionService } from '../tour-execution.service';

@Component({
  selector: 'xp-purchased-tour-cards',
  templateUrl: './purchased-tour-cards.component.html',
  styleUrls: ['./purchased-tour-cards.component.css']
})
export class PurchasedToursComponent implements OnInit {
  purchasedTours: Tour[] = []
  constructor(private tourExecutionService: TourExecutionService){}
  ngOnInit(): void {
    this.getTours();
  }
  getTours(){
    this.tourExecutionService.getTours().subscribe({
      next: (result: PagedResults<Tour>) =>{
        this.purchasedTours = result.results;
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }
}
