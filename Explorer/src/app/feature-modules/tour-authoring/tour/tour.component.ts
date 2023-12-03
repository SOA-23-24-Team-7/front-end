import { Component, OnInit, ViewChild } from '@angular/core';
import { Tour, TourStatus } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourCardViewComponent } from 'src/app/shared/tour-card-view/tour-card-view.component';

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { KeyPoint } from '../model/key-point.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTourFormComponent } from '../add-tour-form/add-tour-form.component';
import { EditTourFormComponent } from '../edit-tour-form/edit-tour-form.component';
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
import { MapComponent } from 'src/app/shared/map/map.component';
import { PublicFacilities } from '../../marketplace/model/public-facilities.model';
import { PublicKeyPoint } from '../model/public-key-point.model';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';


@Component({
  selector: 'xp-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  user: User;
  tour: Tour[] = [];
  selectedTour: Tour;
  shouldRenderTourForm: boolean = false;
  shouldEdit: boolean = false;
  keyPoints: KeyPoint[] = [];
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
        pageSize: number,
        authorId: number
    } 
    slider: any;
    tours: Tour[] = [];
    publicFacilities: PublicFacilities[] = [];
    publicKeyPoints: PublicKeyPoint[] = [];
    totalCount: number = 0;

  constructor(private authService: AuthService, private tourAuthoringService: TourAuthoringService, public dialogRef: MatDialog, private marketplaceService: MarketplaceService) {}


  ngOnInit(): void {
    this.getTours();
    this.authService.user$.subscribe(user => {
      this.user = user;
  });
    this.searchFilter = {
      name: "",
      longitude: -200, latitude: -200, distance: 0,
      minPrice: 0, maxPrice: 0, 
      minDifficulty: 0, maxDifficulty: 5, 
      minDuration: 0, maxDuration: 0, 
      minAverageRating: 0,
      minLength: 0, maxLength: 0, 
      page: 0, pageSize: 0,
      authorId: this.user.id
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
    // this.getPublicFacilities();
    // this.getPublicKeyPoints();
    this.resetMinPrice();
    this.resetMaxPrice();
    this.resetMinDuration();
    this.resetMaxDuration();
    this.resetMinLength();
    this.resetMaxLength();
    // this.onSearch();
  }

  getTourStatusText(status: TourStatus | undefined): string {
    if (status === undefined) {
      return 'N/A'; 
    }
    switch (status) {
      case TourStatus.Draft:
        return 'Draft';
      case TourStatus.Published:
        return 'Published';
      case TourStatus.Archived:
        return 'Archived';
      default:
        return '';
    }
  }

  onPublishClicked(tour: Tour): void{
    if(tour.id){
      this.tourAuthoringService.getKeyPoints(tour.id).subscribe({
        next: (result: KeyPoint[]) =>{
          this.keyPoints = result;

          if(this.keyPoints.length > 1 && tour.durations && tour.durations.length > 0){
            this.tourAuthoringService.publishTour(tour).subscribe({
              next: () => {
                  this.getTours();
              },
            })
          }
          else{
            alert("Tour can't be published because it does not have needed requiements!");
          }
        },
        error:(err: any) => {
          console.log(err);
        }
      })
    }
  }

  getTours(): void {
    this.tourAuthoringService.getTours().subscribe({
      next: (result: PagedResults<Tour>) =>{
        this.tours = result.results;
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }

  deleteTour(id: number): void {
    this.tourAuthoringService.deleteTour(id).subscribe({
      next: () => {
        this.getTours();
      },
    })
  }

  onEditClicked(tour: Tour): void {
    //this.selectedTour = tour;
    //this.shouldRenderTourForm = true;
    //this.shouldEdit = true;
    this.dialogRef.open(EditTourFormComponent, {
      data: tour,
    });
  }

  onAddClicked(): void {
    //this.shouldEdit = false;
    //this.shouldRenderTourForm = true;
    this.dialogRef.open(AddTourFormComponent, {
      data: this.tour,
      
    });   
  }

  onArchiveClicked(tour: Tour): void{
    this.tourAuthoringService.archiveTour(tour).subscribe({
      next: () => {
        this.getTours();
      },
    })
  }

  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;

  onMapClicked(): void {
    this.mapComponent.getClickCoordinates((lat, lng) => {
        this.latitude = lat;
        this.longitude = lng;
    });
}

onSearch(): void {
    this.tourAuthoringService
        .searchTours(this.searchFilter)
        .subscribe({
            next: (result: PagedResults<Tour>) => {
                this.tours = result.results;
                this.totalCount = result.totalCount;
                console.log(this.tours);
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
      this.marketplaceService.getPublicFacilities().subscribe({
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
      this.marketplaceService.getPublicKeyPoints().subscribe({
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
      this.marketplaceService.getPublishedTours().subscribe({
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
