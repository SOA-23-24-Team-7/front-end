import { Component, Input } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { Router } from '@angular/router';
import { TourExecutionService } from '../tour-execution.service';

@Component({
  selector: 'xp-purchased-tour-card',
  templateUrl: './purchased-tour-card.component.html',
  styleUrls: ['./purchased-tour-card.component.css']
})
export class PurchasedTourCardComponent {
  @Input() tour: Tour;
  constructor(private router: Router, private service: TourExecutionService){}
  StartTour(){
    this.service.startTour(this.tour.id!).subscribe(() => {
      this.router.navigate(['/tour-executing/' + this.tour.id]);
    });
  }
}
