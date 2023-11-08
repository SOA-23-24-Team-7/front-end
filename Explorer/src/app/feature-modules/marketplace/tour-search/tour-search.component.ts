import { Component, OnInit, ViewChild } from "@angular/core";
import { MapComponent } from "src/app/shared/map/map.component";
import { MarketplaceService } from "../marketplace.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Tour } from "../../tour-authoring/model/tour.model";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { PublicFacilities } from "../model/public-facilities.model";
import { PublicKeyPoint } from "../model/public-key-point.model";

@Component({
    selector: "xp-tour-search",
    templateUrl: "./tour-search.component.html",
    styleUrls: ["./tour-search.component.css"],
})
export class TourSearchComponent implements OnInit {
    @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;
    longitude: number = -200;
    latitude: number = -200;
    distance: number = 0;
    slider: any;
    tours: Tour[] = [];
    count: number = 0;
    publicFacilities: PublicFacilities[] = [];
    publicKeyPoints: PublicKeyPoint[] = [];

    constructor(private service: MarketplaceService) {}

    ngOnInit(): void {
        this.slider = document.getElementById("slider");
        this.getPublicFacilities();
        this.getPublicKeyPoints();
    }

    onMapClicked(): void {
        this.mapComponent.getClickCoordinates((lat, lng) => {
            this.latitude = lat;
            this.longitude = lng;
        });
    }

    onSearch(): void {
        if (this.longitude != -200 && this.latitude != -200) {
            this.service
                .findNearbyTours(this.longitude, this.latitude, this.distance)
                .subscribe({
                    next: (result: PagedResults<Tour>) => {
                        this.tours = result.results;
                        this.count = result.totalCount;
                        console.log(this.tours);
                    },
                    error: errData => {
                        console.log(errData);
                    },
                });
        } else {
            alert("You have to choose the location on the map");
        }
    }

    onSliderChanged(): void {
        this.distance = this.slider.value;
    }

    getPublicFacilities(): void {
        this.service.getPublicFacilities().subscribe({
            next: (result: PagedResults<PublicFacilities>) => {
                this.publicFacilities = result.results;
                for (let fac of this.publicFacilities) {
                    this.mapComponent.setMarkersForAllFacilities(
                        fac.latitude,
                        fac.longitude,
                    );
                }
            },
        });
    }

    getPublicKeyPoints(): void {
        this.service.getPublicKeyPoints().subscribe({
            next: (result: PagedResults<PublicKeyPoint>) => {
                this.publicKeyPoints = result.results;
                console.log(this.publicKeyPoints);
                for (let pkp of this.publicKeyPoints) {
                    this.mapComponent.setMarkersForPublicKeyPoints(
                        pkp.latitude,
                        pkp.longitude,
                    );
                }
            },
        });
    }

    faFilter = faFilter;
}
