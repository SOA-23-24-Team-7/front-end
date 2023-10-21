import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service';
import { PagedResults } from '../model/paged-results.model';
import { KeyPoint } from 'src/app/feature-modules/tour-authoring/model/key-point.model';

@Component({
  selector: 'xp-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private keyPoints: any;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.registerOnClick();
    this.getTourKeyPoints(1);
  }

  search(): void {
    this.mapService.search('Strazilovska 19, Novi Sad').subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('Pozdrav iz Strazilovske 19.')
          .openPopup();
      },
      error: () => {},
    });
  }

  setRoute(waypoints: any): void {
    const routeControl = L.Routing.control({
      waypoints,
      router: L.routing.mapbox(
        'pk.eyJ1IjoiY2Vrc29uIiwiYSI6ImNsbnl2YTAwdzAxNnoya2xxcG8wMm56ZjAifQ.23pAV3nrCN0BBo-1F8j8gg',
        { profile: 'mapbox/walking' }
      ),
    }).addTo(this.map);

    routeControl.on('routesfound', function (e) {
      var routes = e.routes;
      var summary = routes[0].summary;
      alert(
        'Total distance is ' +
          summary.totalDistance / 1000 +
          ' km and total time is ' +
          Math.round((summary.totalTime % 3600) / 60) +
          ' minutes'
      );
    });
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      const mp = new L.Marker([lat, lng]).addTo(this.map);
      alert(mp.getLatLng());
    });
  }

  // ovo prima Id ture na kojoj se trenutno nalazimo (kupi sa fronta)
  getTourKeyPoints(tourId: number): void {
    this.mapService.getTourKeyPoints(tourId).subscribe({
      next: (result: any) => {
        this.keyPoints = result;
        let waypoints = this.createWaypoints();
        this.setRoute(waypoints);
      },
      error: () => {
        console.log('Cannot fetch keypoints for tourId:', tourId);
      },
    });
  }

  createWaypoints(): any[] {
    let waypoints: any[] = [];
    for (let keyPoint of this.keyPoints) {
      waypoints.push(L.latLng(keyPoint.latitude, keyPoint.longitude));
    }
    return waypoints;
  }
}
