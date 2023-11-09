import { Component, Input } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';

@Component({
  selector: 'xp-purchased-tour-card',
  templateUrl: './purchased-tour-card.component.html',
  styleUrls: ['./purchased-tour-card.component.css']
})
export class PurchasedTourCardComponent {
  @Input() tour: Tour;
}
