import { Component, Input, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { Router } from '@angular/router';
import { TourExecutionService } from '../tour-execution.service';
import { environment } from 'src/env/environment';

@Component({
  selector: 'xp-purchased-tour-card',
  templateUrl: './purchased-tour-card.component.html',
  styleUrls: ['./purchased-tour-card.component.css']
})
export class PurchasedTourCardComponent implements OnInit{
  @Input() tour: Tour;
  @Input() hasActiveTour: boolean;
  @Input() activeTourId: number;
  tourImage: string
  isTourActive: boolean = false
  constructor(private router: Router, private service: TourExecutionService){}
  ngOnInit(): void {
    this.CheckIfTourIsActive()
    this.tourImage = environment.imageHost + this.tour.keyPoints![0].imagePath
  }
  StartTour(){
    this.service.startTour(this.tour.id!).subscribe(() => {
      this.router.navigate(['/tour-executing/' + this.tour.id]);
    });
  }
  ContinueTour(){
    this.router.navigate(['/tour-executing/' + this.tour.id]);
  }
  CheckIfTourIsActive(){
    if(this.hasActiveTour){
      if(this.tour.id == this.activeTourId){
        this.isTourActive = true
      }
    }
  }
  ShowKeyPoints(){
    // get key points of tour
  }
}
