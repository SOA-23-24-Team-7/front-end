import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'src/app/shared/map/map.component'


@Component({
  selector: 'xp-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.css']
})
export class TourSearchComponent implements OnInit{
  @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;

  ngOnInit(): void {
  }
}
