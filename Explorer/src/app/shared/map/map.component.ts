import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service'
import { KeyPoint } from 'src/app/feature-modules/tour-authoring/model/key-point.model';
import { Observable, Subscription } from 'rxjs';
import { PagedResults } from '../model/paged-results.model';
import { Facilities } from 'src/app/feature-modules/tour-authoring/model/facilities.model';
import "leaflet-fullscreen"

@Component({
  selector: 'xp-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  private map: any;
  public waypointMap = new Map<number, any>();
  public checkedPointsMap = new Map<number, any>();
  private routeControl: L.Routing.Control;
  private refreshEventsSubscription: Subscription;
  private previousCommitted = false;

  private positionMarker: L.Marker;
  private markerGroup = L.layerGroup();
  private checkedPointMarkerGroup = L.layerGroup();

  public facilitiesUsed: boolean = false;

  public tourDistance: number = 0;

  public touristPosition: [number, number];

  @Input() refreshEvents: Observable<number>;
  @Input() showLegend: boolean = true;
  @Input() selectedKeyPoint: KeyPoint | null;
  @Input() canEdit = false;
  @Input() isKeyPointMap = false;
  @Input() isPositionMap = false;
  @Input() isTourExecutionMap = false;
  @Input() isCampaign = false;
  @Input() executingTourId = 0;
  @Input() height: string = "600px";
  @Input() set startPosition(value: any) {
    if (!value) return;
    if (this.positionMarker) {
      this.positionMarker.remove();
    }
    this.touristPosition = [value.latitude, value.longitude];
    this.positionMarker = L.marker(this.touristPosition, { icon: this.positionIcon }).addTo(this.map)

    if (!this.isTourExecutionMap) return;
    let waypoints = [{ lng: this.touristPosition[1], lat: this.touristPosition[0] }, ...this.waypointMap.values()];
    this.setRoute(waypoints);
    this.setCheckedPointsMarkers();
    setTimeout(() => this.newPositionEvent.emit(), 500);
  }
  @Input() set nextKeyPointId(value: number) {
    if (value !== null && !value) return;
    if (!this.isTourExecutionMap) return;
    if (!this.touristPosition) return;

    [...this.waypointMap.entries()].forEach(entry => {
      if (value == -1 || entry[1].order < this.waypointMap.get(value).order) {
        this.checkedPointsMap.set(entry[0], entry[1]);
        this.waypointMap.delete(entry[0]);
      }
    });
    let waypoints = [{ lng: this.touristPosition[1], lat: this.touristPosition[0] }, ...this.waypointMap.values()];
    this.setRoute(waypoints);
    this.setCheckedPointsMarkers();
  }
  @Output() keyPointClickEvent = new EventEmitter<any>();
  @Output() newLongLatEvent = new EventEmitter<[number, number]>();
  @Output() newPositionEvent = new EventEmitter<void>();

  constructor(private mapService: MapService) { }

  private facilityIcon = L.icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [42, 42],
    iconAnchor: [16, 32],
  });

  private encounterIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5184/5184592.png',
    iconSize: [42, 42],
    iconAnchor: [16, 32],
  });

  private positionIcon = L.icon({
    iconUrl: 'https://images.emojiterra.com/google/android-pie/512px/1f535.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  private completedKeyPointIcon = L.icon({
    iconUrl: 'https://www.pngrepo.com/png/289489/512/red-flag.png',
    iconSize: [46, 46],
    iconAnchor: [0, 46]
  });

  private publicKeyPointIcon = L.icon({
    iconUrl:
      "https://icon-library.com/images/map-marker-icon/map-marker-icon-18.jpg",
    iconSize: [42, 42],
    iconAnchor: [16, 32],
  });

  private defaultIcon = L.icon({
    iconUrl: 'https://icon-library.com/images/map-marker-icon/map-marker-icon-18.jpg',
    iconSize: [46, 46],
    iconAnchor: [26, 46],
  });

  ngOnInit() {
    if (this.isTourExecutionMap) {
      if(this.isCampaign){
        this.getCampaignKeyPoints(this.executingTourId)
      }else{
        this.getTourKeyPoints(this.executingTourId)
      }
      return;
    }
    if (!this.isKeyPointMap) return;
    this.refreshEventsSubscription = this.refreshEvents.subscribe(tourId => this.getTourKeyPoints(tourId));
  }

  ngOnDestroy() {
    if (!this.isKeyPointMap) return;
    this.refreshEventsSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = this.defaultIcon;

    setTimeout(() => {
      this.initMap();
    }, 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isKeyPointMap) return;

    if (this.waypointMap.delete(Number.POSITIVE_INFINITY)) {
      let waypoints = [...this.waypointMap.values()];
      this.setRoute(waypoints);
    }

    if (!this.canEdit) this.previousCommitted = true;
    if (this.selectedKeyPoint) {
      this.panMapTo(this.selectedKeyPoint.latitude, this.selectedKeyPoint.longitude)
    }

    if (this.canEdit) {
      if (!this.previousCommitted) {
        let oldKeyPoint = changes['selectedKeyPoint'].previousValue;

        if (oldKeyPoint && oldKeyPoint.id != undefined) {
          let lng = oldKeyPoint.longitude
          let lat = oldKeyPoint.latitude
          this.waypointMap.set(oldKeyPoint.id, { lng, lat });
        }

        let waypoints = [...this.waypointMap.values()];
        this.setRoute(waypoints);
      }

      this.previousCommitted = false;
    }
  }

  private panMapTo(lat: number, lng: number): void {
    setTimeout(() => {
      this.map.invalidateSize();
      this.map.panTo(new L.LatLng(lat, lng));
    }, 100);
  }

  getColor(d: any) {
    return d === 'Position' ? this.positionIcon.options.iconUrl :
      d === 'Key point' ? this.publicKeyPointIcon.options.iconUrl :
        d == 'Completed key point' ? this.completedKeyPointIcon.options.iconUrl :
          d == 'Encounter' ? this.encounterIcon.options.iconUrl :
            d == 'Facility' ? this.facilityIcon.options.iconUrl : this.defaultIcon.options.iconUrl;
  }

  private initMap(): void {
    this.map = L.map('map', {
      fullscreenControl: true,
      center: [45.2396, 19.8227],
      zoom: 13,
    });
    if (this.showLegend) {
      var legend = new L.Control({ position: 'bottomleft' });
      var outer = this;
      legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
          labels = ['<strong>Legend</strong>'],
          categories = ['Position', 'Key point', 'Completed key point', 'Encounter', 'Facility'];

        for (var i = 0; i < categories.length; i++) {
          div.innerHTML += labels.push('<div style="display: flex; align-items: center; margin-top: 10px; pointer-events: none;"><img style="display: inline; margin: 0 5px;" width="25" height="25" src="' + outer.getColor(categories[i]) + '"></img> ' + (categories[i] ? categories[i] : '+'));
        }
        div.innerHTML = labels.join('</div>');
        return div;
      };
      legend.addTo(this.map);
    }

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

    if (this.isKeyPointMap) {
      this.mapService.getAuthorsFacilities().subscribe({
        next: (result: PagedResults<Facilities>) => {
          let facilities = result.results;

          for (let f of facilities) {
            this.setMarkersForAllFacilities(f.latitude, f.longitude);
          }
        },
        error: () => {
        }
      });
    }
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

  setCheckedPointsMarkers(): void {
    this.checkedPointMarkerGroup.clearLayers();

    [...this.checkedPointsMap.values()].forEach(element => {
      const marker = new L.Marker([element.lat, element.lng], { icon: this.completedKeyPointIcon });
      marker.addEventListener('click', () => {
        this.keyPointClickEvent.emit(element);
      })
      this.markerGroup.addLayer(marker);
    });

    this.map.addLayer(this.markerGroup);
  }

  setRoute(waypoints: any[]): void {
    let keyPointIcon = L.icon({
      iconUrl: 'https://icon-library.com/images/map-marker-icon/map-marker-icon-18.jpg',
      iconSize: [46, 46],
      iconAnchor: [26, 46],
    });
    const planOptions: Record<string, any> = {
      addWaypoints: false,
      draggableWaypoints: false
    };

    if (this.isTourExecutionMap) {
      planOptions['createMarker'] = (i: number, waypoint: any, n: number): any => {
        if (waypoints.length == (this.waypointMap.size + 1) && i == 0) return null;
        const marker = L.marker(waypoint.latLng, { icon: keyPointIcon });
        marker.addEventListener('click', () => {
          this.keyPointClickEvent.emit(waypoint.latLng);
        })
        return marker;
      }
    }

    const plan = new L.Routing.Plan(waypoints, planOptions);

    this.routeControl?.remove();

    this.routeControl = L.Routing.control({
      plan,
      router: L.routing.mapbox(
        'pk.eyJ1IjoiY2Vrc29uIiwiYSI6ImNsbnl2YTAwdzAxNnoya2xxcG8wMm56ZjAifQ.23pAV3nrCN0BBo-1F8j8gg',
        { profile: 'mapbox/walking' }
      ),
    }).addTo(this.map);

    this.routeControl.on('routesfound', (e) => {
      const routes = e.routes;
      if (routes.length > 0) {
        const summary = routes[0].summary;
        this.tourDistance = summary.totalDistance / 1000; // Total distance is in meters, tourDistance in km
      }
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

      if (this.facilitiesUsed) {
        this.markerGroup.clearLayers();
        const marker = new L.Marker([lat, lng], { icon: this.facilityIcon });
        this.markerGroup.addLayer(marker);
        this.map.addLayer(this.markerGroup);

        return;
      }

      if (this.isPositionMap) {
        if (this.positionMarker) {
          this.positionMarker.remove();
        }
        this.positionMarker = L.marker([lat, lng], { icon: this.positionIcon }).addTo(this.map)
        return;
      }

      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );

      if (this.selectedKeyPoint && this.selectedKeyPoint.id != undefined) {
        this.waypointMap.set(this.selectedKeyPoint.id, { lng, lat });
      } else {
        this.waypointMap.set(Number.POSITIVE_INFINITY, { lng, lat });
      }
      let waypoints = [...this.waypointMap.values()];
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
          let order = kp.order;

          this.waypointMap.set(kp.id, { lng, lat, order });
        }

        this.createWaypoints(keyPoints);
        if (!this.touristPosition && !this.isTourExecutionMap) {
          let waypoints = [...this.waypointMap.values()];

          this.setRoute(waypoints);

          if (keyPoints.length > 0) {
            this.panMapTo(keyPoints[0].latitude, keyPoints[0].longitude);
          }
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
      let order = kp.order;
      this.waypointMap.set(kp.id, { lng, lat, order });
    }
  }

  getClickCoordinates(callback: (lat: number, lng: number) => void): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;

      callback(lat, lng);
    });
  }

  setMarker(lat: number, lng: number): void {
    // Clear all previous markers on the map
    this.markerGroup.clearLayers();

    const marker = new L.Marker([lat, lng], { icon: this.facilityIcon });
    this.markerGroup.addLayer(marker);
    this.map.addLayer(this.markerGroup);

    this.map.setView([lat, lng], this.map.getZoom());
  }

  setEncounterMarker(lat: number, lng: number): void {
    const marker = new L.Marker([lat, lng], { icon: this.encounterIcon });
    this.markerGroup.addLayer(marker);
    this.map.addLayer(this.markerGroup);
  }

  setMarkersForAllFacilities(lat: number, lng: number): void {
    const marker = new L.Marker([lat, lng], { icon: this.facilityIcon });
    this.markerGroup.addLayer(marker);
    this.map.addLayer(this.markerGroup);

    if (!this.isKeyPointMap) this.map.setView([lat, lng], this.map.getZoom());
  }
  setMarkersForPublicKeyPoints(lat: number, long: number): void {
    const marker = new L.Marker([lat, long], {
      icon: this.publicKeyPointIcon,
    });
    this.markerGroup.addLayer(marker);
    this.map.addLayer(this.markerGroup);

    if (!this.isKeyPointMap)
      this.map.setView([lat, long], this.map.getZoom());
  }

  getCampaignKeyPoints(campaignId: number): void {
    this.mapService.getCampaignKeyPoints(campaignId).subscribe({
      next: (result: any) => {
        this.waypointMap.clear();

        let keyPoints = result;
        // da li ce order dobro raditi ovako???
        let i = 0
        for (const kp of keyPoints) {
          let lng = kp.longitude;
          let lat = kp.latitude;
          let order = i;
          i++;
          this.waypointMap.set(kp.id, { lng, lat, order });
        }

        //this.createWaypoints(keyPoints);
        if (!this.touristPosition && !this.isTourExecutionMap) {
          let waypoints = [...this.waypointMap.values()];

          this.setRoute(waypoints);

          if (keyPoints.length > 0) {
            this.panMapTo(keyPoints[0].latitude, keyPoints[0].longitude);
          }
        }
      },
      error: () => {
        console.log('Cannot fetch keypoints for campaignId:', campaignId);
      },
    });
  }
}