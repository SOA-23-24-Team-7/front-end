import { Component, Input, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TourExecutionService } from '../tour-execution.service';

@Component({
  selector: 'xp-tour-executing',
  templateUrl: './tour-executing.component.html',
  styleUrls: ['./tour-executing.component.css']
})
export class TourExecutingComponent implements OnInit{
  tourId: any
  tour: Tour = {
    name: '.',
    description: '.',
    tags: ['.'],
    difficulty: 1
  }
  constructor (private route: ActivatedRoute, private service: TourExecutionService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.tourId = params.get('data')
    })
      this.getTour(this.tourId)
  }
  getTour(tourId: any){
    this.service.getTour(tourId).subscribe({
      next: (result: Tour) => {
        this.tour = result;
      }
    });
  }
}
