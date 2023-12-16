import { Component, OnInit } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'xp-single-tour-statistics',
  templateUrl: './single-tour-statistics.component.html',
  styleUrls: ['./single-tour-statistics.component.css']
})
export class SingleTourStatisticsComponent implements OnInit{
  
  salesNumber: string;
  startNumber: string;
  completionNumber: string;

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
  }
  
}
