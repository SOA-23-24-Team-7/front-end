import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../map/map.service'
import { KeyPoint } from 'src/app/feature-modules/tour-authoring/model/key-point.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'xp-key-point-map',
  templateUrl: './key-point-map.component.html',
  styleUrls: ['./key-point-map.component.css'],
})
export class KeyPointMapComponent implements AfterViewInit, OnChanges {
  private map: any;
  private waypointMap = new Map<number, any>();
  private routeControl: L.Routing.Control;
  private refreshEventsSubscription: Subscription;
  private previousCommitted = false;

  @Input() refreshEvents: Observable<number>;
  @Input() selectedKeyPoint: KeyPoint | null;
  @Input() canEdit: boolean = false;
  @Output() newLongLatEvent = new EventEmitter<[number, number]>();

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.refreshEventsSubscription = this.refreshEvents.subscribe(tourId => this.getTourKeyPoints(tourId));
  }

  ngOnDestroy() {
    this.refreshEventsSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.waypointMap.delete(Number.POSITIVE_INFINITY);

    if (!this.canEdit) this.previousCommitted = true;
    if (!this.selectedKeyPoint) return;

    this.panMapTo(this.selectedKeyPoint.latitude, this.selectedKeyPoint.longitude)

    if (this.canEdit) {
      if (!this.previousCommitted) {
        let oldKeyPoint = changes['selectedKeyPoint'].previousValue;

        if (oldKeyPoint && oldKeyPoint.id != undefined) {
          let lng = oldKeyPoint.longitude
          let lat = oldKeyPoint.latitude
          this.waypointMap.set(oldKeyPoint.id, { lng, lat });
        }
      }

      this.previousCommitted = false;
    }

    let waypoints = [...this.waypointMap.values()];
    this.routeControl?.remove();
    this.setRoute(waypoints);
  }

  private panMapTo(lat: number, lng: number): void {
    setTimeout(() => {
      this.map.invalidateSize();
      this.map.panTo(new L.LatLng(lat, lng));
    }, 100);
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
      error: () => { },
    });
  }

  setRoute(waypoints: any): void {
    const planOptions = { addWaypoints: false, draggableWaypoints: false };
    const plan = new L.Routing.Plan(waypoints, planOptions);

    this.routeControl = L.Routing.control({
      plan,
      router: L.routing.mapbox(
        'pk.eyJ1IjoiY2Vrc29uIiwiYSI6ImNsbnl2YTAwdzAxNnoya2xxcG8wMm56ZjAifQ.23pAV3nrCN0BBo-1F8j8gg',
        { profile: 'mapbox/walking' }
      ),
    }).addTo(this.map);

    this.routeControl.on('routesfound', function (e) {
      var routes = e.routes;
      var summary = routes[0].summary;
    });
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      if (!this.canEdit) return;

      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;

      this.newLongLatEvent.emit([lng, lat]);

      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
      });

      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );

      if (this.selectedKeyPoint && this.selectedKeyPoint.id != undefined) {
        this.waypointMap.set(this.selectedKeyPoint.id, { lng, lat });
      } else {
        this.waypointMap.set(Number.POSITIVE_INFINITY, { lng, lat });
      }
      let waypoints = [...this.waypointMap.values()];
      this.routeControl?.remove();
      this.setRoute(waypoints);
    });
  }

  // ovo prima Id ture na kojoj se trenutno nalazimo (kupi sa fronta)
  getTourKeyPoints(tourId: number): void {
    this.mapService.getTourKeyPoints(tourId).subscribe({
      next: (result: any) => {
        this.waypointMap.clear();

        let keyPoints = result;

        for (const kp of keyPoints) {
          let lng = kp.longitude;
          let lat = kp.latitude;
          this.waypointMap.set(kp.id, { lng, lat });
        }

        this.createWaypoints(keyPoints);
        let waypoints = [...this.waypointMap.values()];

        this.routeControl?.remove();
        this.setRoute(waypoints);

        if (keyPoints[0]) {
          this.panMapTo(keyPoints[0].latitude, keyPoints[0].longitude);
        }
      },
      error: () => {
        console.log('Cannot fetch keypoints for tourId:', tourId);
      },
    });
  }

  createWaypoints(keyPoints: any): void {
    for (const kp of keyPoints) {
      let lng = kp.longitude;
      let lat = kp.latitude;
      this.waypointMap.set(kp.id, { lng, lat });
    }
  }
}
