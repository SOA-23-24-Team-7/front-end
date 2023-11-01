import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'src/app/shared/map/map.component'
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../../tour-authoring/model/tour.model';


@Component({
  selector: 'xp-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.css']
})
export class TourSearchComponent implements OnInit{
  @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;
  longitude: number = -200;
  latitude: number = -200;
  distance: number = 0;
  slider: any;
  tours: Tour[] = [];

  constructor(private service: MarketplaceService) {}

  ngOnInit(): void {
    this.slider = document.getElementById('slider');
  }

  onMapClicked(): void {
    this.mapComponent.getClickCoordinates((lat, lng) => {
       this.latitude = lat;
       this.longitude = lng;
    });
  }

  onSearch(): void {
    if(this.longitude !=-200 && this.latitude != -200){
      this.service.findNearbyTours(this.longitude, this.latitude, this.distance).subscribe({
        next: (result: PagedResults<Tour>) => {
          this.tours = result.results;
          console.log(this.tours);
        },
        error: (errData) => {
          console.log(errData);
        }
      })
    }
    else{
      alert("You have to choose the location on the map");
    }
  }

  onSliderChanged(): void {
    this.distance = this.slider.value;
  }
}
