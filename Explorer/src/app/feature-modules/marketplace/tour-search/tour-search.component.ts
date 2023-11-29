import { Component, OnInit, ViewChild } from "@angular/core";
import { MapComponent } from "src/app/shared/map/map.component";
import { MarketplaceService } from "../marketplace.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Tour } from "../../tour-authoring/model/tour.model";
import { PublicFacilities } from "../model/public-facilities.model";
import { PublicKeyPoint } from "../model/public-key-point.model";
import { 
    faFilter,
    faXmark, 
    faChevronDown,
    faArrowUpWideShort,
    faArrowDownWideShort,
    faChevronLeft,
    faChevronRight,
    faLocationDot,
    faStar,
    faClock
} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-tour-search",
    templateUrl: "./tour-search.component.html",
    styleUrls: ["./tour-search.component.css"],
})
export class TourSearchComponent implements OnInit {
    faFilter = faFilter;
    faXmark = faXmark;
    faChevronDown = faChevronDown;
    faArrowUpWideShort = faArrowUpWideShort;
    faArrowDownWideShort = faArrowDownWideShort;
    faChevronLeft= faChevronLeft;
    faChevronRight = faChevronRight;
    faLocationDot = faLocationDot;
    faStar = faStar;
    faClock = faClock; 
    dropped: { [key: string]: boolean } = {};
    @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;
    longitude: number = -200;
    latitude: number = -200;
    distance: number = 0;
    searchFilter: {
        longitude: number, 
        latitude: number, 
        distance: number,
        name: string,
        minPrice: number | string,
        maxPrice: number | string,
        minDifficulty: number,
        maxDifficulty: number,
        minDuration: number | string,
        maxDuration: number | string,
        minAverageRating: number, 
        minLength: number | string,
        maxLength: number | string,
        page: number, 
        pageSize: number
    } 
    slider: any;
    tours: Tour[] = [];
    publicFacilities: PublicFacilities[] = [];
    publicKeyPoints: PublicKeyPoint[] = [];
    totalCount: number = 0;
    currentPage: number = 1;
    pageSize: number =10;
    pages: any[] = [];

    constructor(private service: MarketplaceService) {}

    ngOnInit(): void {
        this.searchFilter = {
            name: "",
            longitude: -200, latitude: -200, distance: 0,
            minPrice: 0, maxPrice: 0, 
            minDifficulty: 0, maxDifficulty: 5, 
            minDuration: 0, maxDuration: 0, 
            minAverageRating: 0,
            minLength: 0, maxLength: 0, 
            page: this.currentPage, pageSize: this.pageSize
        };
        this.dropped = {
            locationDropped: true, 
            nameDropped: true,
            priceDropped: true,
            difficultyDropped: true,
            durationDropped: true,
            ratingDropped: true,
            lengthDropped: true
        }
        this.slider = document.getElementById("slider");
        this.getPublicFacilities();
        this.getPublicKeyPoints();
        this.resetMinPrice();
        this.resetMaxPrice();
        this.resetMinDuration();
        this.resetMaxDuration();
        this.resetMinLength();
        this.resetMaxLength();
        this.onSearch(1);
    }

    onMapClicked(): void {
        this.mapComponent.getClickCoordinates((lat, lng) => {
            this.latitude = lat;
            this.longitude = lng;
        });
    }

    onSearch(page: number): void {
        this.searchFilter.page = page;
        this.currentPage = page;
        this.service
            .searchTours(this.searchFilter)
            .subscribe({
                next: (result: PagedResults<Tour>) => {
                    this.tours = result.results;
                    this.totalCount = result.totalCount;
                    console.log(this.tours);
                    this.setPages();
                },
                error: errData => {
                    console.log(errData);
                },
            });
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

    getPublishedTours(): void {
        this.service.getPublishedTours().subscribe({
            next: (result: PagedResults<Tour>) => {
                this.tours = result.results;
                this.totalCount = result.totalCount;
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }

    toggle(name: string) {
        this.dropped[name] = !this.dropped[name]
    }

    countFilters(): number {
        let number = 0;
        if(this.longitude !== -200 && this.latitude !== -200 && this.distance !== 0) number++;
        if(this.searchFilter.name !== '') number++
        if(this.searchFilter.minPrice !== '' && +this.searchFilter.minPrice > 0) number++
        if(this.searchFilter.maxPrice !== '' && +this.searchFilter.maxPrice > 0) number++
        if(this.searchFilter.minDifficulty > 0) number++
        if(this.searchFilter.maxDifficulty < 5) number++
        if(this.searchFilter.minDuration !== '' && +this.searchFilter.minDuration > 0) number++
        if(this.searchFilter.maxDuration !== '' && +this.searchFilter.maxDuration > 0) number++
        if(this.searchFilter.minAverageRating > 0) number++
        if(this.searchFilter.minLength !== '' && +this.searchFilter.minLength > 0) number++
        if(this.searchFilter.maxLength !== '' && +this.searchFilter.maxLength > 0) number++
        return number
    }

    resetLocationFilter() {
        this.longitude = -200;
        this.latitude = -200;
        this.distance = 0;
    }

    setPages(): void {
        this.pages = [];
        const pageNumber = Math.ceil(this.totalCount / this.pageSize);
        if(this.currentPage > 1) this.pages.push("<");
        if(this.currentPage > 3) this.pages.push(1);
        if(this.currentPage > 4) this.pages.push("...");
        if(this.currentPage > 2) this.pages.push(this.currentPage - 2);
        if(this.currentPage > 1) this.pages.push(this.currentPage - 1);
        this.pages.push(this.currentPage);
        if(pageNumber - this.currentPage > 0) this.pages.push(this.currentPage + 1);
        if(pageNumber - this.currentPage > 1) this.pages.push(this.currentPage + 2);
        if(pageNumber - this.currentPage > 3) this.pages.push("...");
        if(pageNumber - this.currentPage > 2) this.pages.push(pageNumber);
        if(pageNumber - this.currentPage > 0) this.pages.push(">");
    }

    switchPage(command: any): void {
        if(command === "..." || command === this.currentPage) return;
        if(command === "<") this.currentPage--;
        if(command === ">") this.currentPage++;
        if(typeof command === 'number') this.currentPage = command;
        this.onSearch(this.currentPage);
    }

    validateMinPrice() {
        if(this.searchFilter.minPrice !== 0 && this.searchFilter.maxPrice !== 0 &&
            this.searchFilter.minPrice !== "" && this.searchFilter.maxPrice !== "") {
            if (+this.searchFilter.minPrice >= +this.searchFilter.maxPrice) {
                this.searchFilter.minPrice = +this.searchFilter.maxPrice - 1;
            }
        }
        var inputElement = document.getElementsByName('minPrice')[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.minPrice.toString();
        if(this.searchFilter.minPrice == 0 || this.searchFilter.minPrice == -1) {
            inputElement.value = "";
        }
    }

    validateMaxPrice() {
        if(this.searchFilter.minPrice !== 0 && this.searchFilter.maxPrice !== 0 &&
            this.searchFilter.minPrice !== "" && this.searchFilter.maxPrice !== "") {
            if (+this.searchFilter.minPrice >= +this.searchFilter.maxPrice) {
                this.searchFilter.maxPrice = +this.searchFilter.minPrice + 1;
            }
        }
        var inputElement = document.getElementsByName('maxPrice')[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.maxPrice.toString();
        if(this.searchFilter.maxPrice == 0 || this.searchFilter.maxPrice == -1) {
            inputElement.value = "";
        }
    }

    validateMinDifficulty () {
        if(this.searchFilter.minDifficulty >= this.searchFilter.maxDifficulty) {
          this.searchFilter.maxDifficulty = Number((this.searchFilter.minDifficulty + 1).toFixed(1));
        }
        if(this.searchFilter.maxDifficulty == 6) this.searchFilter.maxDifficulty = 5;
    }
    
    validateMaxDifficulty() {
        if(this.searchFilter.maxDifficulty <= this.searchFilter.minDifficulty) {
          this.searchFilter.minDifficulty = Number((this.searchFilter.maxDifficulty - 1).toFixed(1));
        }
        if(this.searchFilter.maxDifficulty == 0) {
            this.searchFilter.minDifficulty = 0
            this.searchFilter.maxDifficulty = 1;
            var inputElement = document.getElementsByName('maxDifficulty')[0] as HTMLInputElement;
            inputElement.value = "1";
        } 
    }

    validateMinDuration() {
        if(this.searchFilter.minDuration !== 0 && this.searchFilter.maxDuration !== 0 &&
            this.searchFilter.minDuration !== "" && this.searchFilter.maxDuration !== "") {
            if (this.searchFilter.minDuration >= this.searchFilter.maxDuration) {
                this.searchFilter.minDuration = +this.searchFilter.maxDuration - 1;
            }
        }
        var inputElement = document.getElementsByName('minDuration')[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.minDuration.toString();
        if(this.searchFilter.minDuration == 0 || this.searchFilter.minDuration == -1) {
            inputElement.value = "";
        }
    }

    validateMaxDuration() {
        if(this.searchFilter.minDuration !== 0 && this.searchFilter.maxDuration !== 0 &&
            this.searchFilter.minDuration !== "" && this.searchFilter.maxDuration !== "") {
            if (this.searchFilter.minDuration >= this.searchFilter.maxDuration) {
                this.searchFilter.maxDuration = +this.searchFilter.minDuration + 1;
            }
        }
        var inputElement = document.getElementsByName('maxDuration')[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.maxDuration.toString();
        if(this.searchFilter.maxDuration == 0 || this.searchFilter.maxDuration == -1) {
            inputElement.value = "";
        }
    }

    validateMinLength() {
        if(this.searchFilter.minLength !== 0 && this.searchFilter.maxLength !== 0 &&
            this.searchFilter.minLength !== "" && this.searchFilter.maxLength !== "") {
            if (this.searchFilter.minLength >= this.searchFilter.maxLength) {
                this.searchFilter.minLength = +this.searchFilter.maxLength - 1;
            }
        }
        var inputElement = document.getElementsByName('minLength')[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.minLength.toString();
        if(this.searchFilter.minLength == 0 || this.searchFilter.minLength == -1) {
            inputElement.value = "";
        }
    }

    validateMaxLength() {
        if(this.searchFilter.minLength !== 0 && this.searchFilter.maxLength !== 0 &&
            this.searchFilter.minLength !== "" && this.searchFilter.maxLength !== "") {
            if (this.searchFilter.minLength >= this.searchFilter.maxLength) {
                this.searchFilter.maxLength = +this.searchFilter.minLength + 1;
            }
        }
        var inputElement = document.getElementsByName('maxLength')[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.maxLength.toString();
        if(this.searchFilter.maxLength == 0 || this.searchFilter.maxLength == -1) {
            inputElement.value = "";
        }
    }

    resetMinPrice() {
        this.searchFilter.minPrice = "";
        var inputElement = document.getElementsByName('minPrice')[0] as HTMLInputElement;
        inputElement.value = "";
    }

    resetMaxPrice() {
        this.searchFilter.maxPrice = "";
        var inputElement = document.getElementsByName('maxPrice')[0] as HTMLInputElement;
        inputElement.value = "";
    }

    resetMinDuration() {
        this.searchFilter.minDuration = "";
        var inputElement = document.getElementsByName('minDuration')[0] as HTMLInputElement;
        inputElement.value = "";
    }

    resetMaxDuration() {
        this.searchFilter.maxDuration = "";
        var inputElement = document.getElementsByName('maxDuration')[0] as HTMLInputElement;
        inputElement.value = "";
    }

    resetMinLength() {
        this.searchFilter.minLength = "";
        var inputElement = document.getElementsByName('minLength')[0] as HTMLInputElement;
        inputElement.value = "";
    }

    resetMaxLength() {
        this.searchFilter.maxLength = "";
        var inputElement = document.getElementsByName('maxLength')[0] as HTMLInputElement;
        inputElement.value = "";
    }
}
