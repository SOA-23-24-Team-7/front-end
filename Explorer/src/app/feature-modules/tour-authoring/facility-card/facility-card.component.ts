import { Component, Input } from '@angular/core';
import { environment } from 'src/env/environment';
import { Facilities } from '../model/facilities.model';

@Component({
  selector: 'xp-facility-card',
  templateUrl: './facility-card.component.html',
  styleUrls: ['./facility-card.component.css']
})
export class FacilityCardComponent {
  @Input() facility: Facilities;
  facilityImage:string;
  ngOnInit(): void {
    this.facilityImage = environment.imageHost + this.facility.imagePath;
}
}
