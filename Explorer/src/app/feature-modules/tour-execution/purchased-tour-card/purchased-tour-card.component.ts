import { Component, Input } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-purchased-tour-card',
  templateUrl: './purchased-tour-card.component.html',
  styleUrls: ['./purchased-tour-card.component.css']
})
export class PurchasedTourCardComponent {
  @Input() tour: Tour;
  constructor(private router: Router){}
  StartTour(){
    console.log(this.tour)
    this.router.navigate(['/tour-executing', {data: this.tour.id}]);
  }
}
