import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MapComponent } from 'src/app/shared/map/map.component';
import { environment } from 'src/env/environment';
import { KeyPoint } from '../model/key-point.model';
import { Tour, TourStatus } from '../model/tour.model';
import { TourDuration, TransportType } from '../model/tourDuration.model';
import { PublicKeyPointsComponent } from '../public-key-points/public-key-points.component';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';


@Component({
  selector: 'xp-tourists-key-points',
  templateUrl: './tourists-key-points.component.html',
  styleUrls: ['./tourists-key-points.component.css']
})
export class TouristsKeyPointsComponent implements OnInit{
    tour: Tour | null = null;
    keyPoints: KeyPoint[] = [];   
    recommendedTours: Tour[] = [];
    keyPointIds: number[] = [];
    selectedKeyPoint: KeyPoint | null = null;
    mapLongLat: [number, number];
    mapLocationAddress: string;
    shouldRenderKeyPointForm: boolean = false;
    shouldEdit: boolean = false;
    refreshEventsSubject: BehaviorSubject<number>;
    tourIdTemp: number = 0;
    areButtonsEnabled: boolean = true;
    hasTourActive: boolean
    activeTourId: number
    
    @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;

    public distance: number;
    public walkingDuration: number = 0;
    public bicycleRideDuration: number = 0;
    public carRideDuration: number = 0;

    checkedWalkingDuration: boolean = false;
    checkedBicycleRideDuration: boolean = false;
    checkedCarRideDuration: boolean = false;
    keyPointContainer: any;
    tourContainer: any;
    constructor(
        private route: ActivatedRoute,
        private service: TourAuthoringService,
        public dialogRef: MatDialog,
        private router: Router,
    ) {}

    checkBoxForm = new FormGroup({
        onFootChecked: new FormControl<boolean>(false),
        bicycleRideChecked: new FormControl<boolean>(false),
        carRideChecked: new FormControl<boolean>(false),
    });

    ngOnInit(): void {
        this.keyPointContainer = document.querySelector(
            ".key-point-cards-container",
        );
        this.getKeyPoints();
        this.tourContainer = document.querySelector(
            ".tour-cards-container",
        );
        this.enableButtons();
    }

    enableButtons(): void {
        this.service
            .getTour(this.tourIdTemp)
            .subscribe((tourResult: Tour | undefined) => {
                if (tourResult?.status == TourStatus.Ready) {
                    this.areButtonsEnabled = false;
                    this.getDurationInfo(tourResult);
                } else {
                    this.areButtonsEnabled = true;
                }
            });
    }

    getImagePath(imageName: string): string {
        return environment.imageHost + imageName;
    }

    deleteKeyPoint(id: number): void {
        this.route.paramMap.subscribe({
            next: (params: ParamMap) => {
                this.service.deleteKeyPoint(+params.get("id")!, id).subscribe({
                    next: () => {
                        this.getKeyPoints();
                    },
                });
            },
        });
    }



   

    getKeyPoints(): void {
        this.route.paramMap.subscribe({
            next: (params: ParamMap) => {
                let tourId = +params.get("id")!;
                this.tourIdTemp = tourId;

                if (!this.refreshEventsSubject) {
                    this.refreshEventsSubject = new BehaviorSubject<number>(
                        tourId,
                    );
                } else {
                    this.refreshEventsSubject.next(tourId);
                }

                this.service.getKeyPoints(tourId).subscribe({
                    next: (result: KeyPoint[]) => {
                        this.keyPoints = result;
                        //console.log(this.keyPoints);
                        if(result){
                            this.getRecommendedTours();
                        }
                        

                        if (this.keyPoints.length < 2) {
                            this.walkingDuration = 0;
                            this.bicycleRideDuration = 0;
                            this.carRideDuration = 0;
                        } else if (this.mapComponent.tourDistance != 0) {
                            this.calculateDurations(
                                this.mapComponent.tourDistance,
                            );
                        } else {
                            this.service.getTour(this.tourIdTemp).subscribe({
                                next: (result: Tour) => {
                                    this.tour = result;
                                    if (this.tour.distance) {
                                        this.calculateDurations(
                                            this.tour.distance,
                                        );
                                        this.handleCheckBoxes(this.tour);
                                    }
                                },
                            });
                        }
                        
                    },
                    error: () => {},
                });
            },
        });
    }

    onEditClicked(keyPoint: KeyPoint): void {
        this.selectedKeyPoint = keyPoint;
        this.shouldRenderKeyPointForm = true;
        this.shouldEdit = true;
    }

    onAddClicked(): void {
        this.selectedKeyPoint = null;
        this.shouldEdit = false;
        this.shouldRenderKeyPointForm = true;
    }

    currentIndex: number = 0;

    scrollToNextCard(): void {
        this.currentIndex++;
        if (this.currentIndex >= this.keyPointContainer.children.length) {
            this.currentIndex = 0;
        }
        this.keyPointContainer.scrollLeft +=
            this.keyPointContainer.children[this.currentIndex].clientWidth;
    }

    scrollToPrevCard(): void {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.keyPointContainer!.children.length - 1;
        }
        this.keyPointContainer!.scrollLeft -=
            this.keyPointContainer.children[this.currentIndex].clientWidth;
    }

    openDialog() {
        const dialogRef = this.dialogRef.open(PublicKeyPointsComponent, {
            //data: this.listaJavnihTacaka, // lista javnih tacaka koju dobijam u ovoj komponenti i ovim je saljem u modalni dijalog
            data: {
                tourId: this.tourIdTemp,
                keyPoints: this.keyPoints,
            },
        });
        const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
            this.mapComponent.createWaypoints(this.keyPoints);
            let waypoints = [...this.mapComponent.waypointMap.values()];
            this.mapComponent.setRoute(waypoints);
            this.getKeyPoints();
            console.log(this.mapComponent.tourDistance);
        });
    }

    async onBackClicked(): Promise<void> {
        if (this.mapComponent) {
            try {
                const result: Tour | undefined = await this.service
                    .getTour(this.tourIdTemp)
                    .toPromise();
                if (result) {
                    this.tour = result;
                    if (this.mapComponent.waypointMap.size > 1) {
                        this.tour.distance =
                            Math.round(this.mapComponent.tourDistance * 100) /
                            100;
                        this.distance =
                            Math.round(this.mapComponent.tourDistance * 100) /
                            100;
                    } else {
                        this.tour.distance = 0;
                    }

                    if (this.checkBoxForm.value.onFootChecked) {
                        const tourDuration: TourDuration = {
                            duration: this.walkingDuration,
                            transportType: TransportType.Walking,
                        };

                        this.handleCheckedDurations(this.tour, tourDuration);
                    } else {
                        this.handleUncheckedDurations(
                            this.tour,
                            TransportType.Walking,
                        );
                    }

                    if (this.checkBoxForm.value.bicycleRideChecked) {
                        const tourDuration: TourDuration = {
                            duration: this.bicycleRideDuration,
                            transportType: TransportType.Bicycle,
                        };

                        this.handleCheckedDurations(this.tour, tourDuration);
                    } else {
                        this.handleUncheckedDurations(
                            this.tour,
                            TransportType.Bicycle,
                        );
                    }

                    if (this.checkBoxForm.value.carRideChecked) {
                        const tourDuration: TourDuration = {
                            duration: this.carRideDuration,
                            transportType: TransportType.Car,
                        };

                        this.handleCheckedDurations(this.tour, tourDuration);
                    } else {
                        this.handleUncheckedDurations(
                            this.tour,
                            TransportType.Car,
                        );
                    }

                    await this.service.updateTour(this.tour).toPromise();
                } else {
                    console.error("Result is undefined");
                }
            } catch (err) {
                console.error(err);
            }
        }

        this.router.navigate(["/tourists-tour"]);
    }

    calculateDurations(distance: number): void {
        this.walkingDuration =
            Math.round((distance / 3.6) * 60) + this.keyPoints.length * 15;
        this.bicycleRideDuration =
            Math.round((distance / 20) * 60) + this.keyPoints.length * 15;
        this.carRideDuration =
            Math.round((distance / 50) * 60) + this.keyPoints.length * 15;
    }

    getDurationInfo(tour: Tour): void {
        if (tour.durations) {
            for (let t of tour.durations) {
                if (t.transportType == TransportType.Walking) {
                    this.checkedWalkingDuration = true;
                } else if (t.transportType == TransportType.Bicycle) {
                    this.checkedBicycleRideDuration = true;
                } else if (t.transportType == TransportType.Car) {
                    this.checkedCarRideDuration = true;
                }
            }
        }
    }

    handleCheckBoxes(tour: Tour): void {
        // Tick all necessary checkboxes
        if (tour.durations) {
            for (let t of tour.durations) {
                if (t.transportType == TransportType.Walking) {
                    this.checkBoxForm.get("onFootChecked")?.patchValue(true);
                } else if (t.transportType == TransportType.Bicycle) {
                    this.checkBoxForm
                        .get("bicycleRideChecked")
                        ?.patchValue(true);
                } else if (t.transportType == TransportType.Car) {
                    this.checkBoxForm.get("carRideChecked")?.patchValue(true);
                }
            }
        }
    }

    handleCheckedDurations(tour: Tour, tourDuration: TourDuration): void {
        let shouldPush = true;
        if (tour.durations) {
            let counter = 0;
            for (let t of tour.durations) {
                if (
                    t.transportType == tourDuration.transportType &&
                    t.duration == tourDuration.duration
                ) {
                    shouldPush = false;
                    break;
                } else if (
                    t.transportType == tourDuration.transportType &&
                    t.duration != tourDuration.duration
                ) {
                    tour.durations.splice(counter, 1);
                    break;
                }
                counter++;
            }
        }

        if (shouldPush) {
            tour.durations?.push(tourDuration);
        }
    }

    handleUncheckedDurations(tour: Tour, type: TransportType): void {
        if (tour.durations) {
            let counter = 0;
            for (let t of tour.durations) {
                if (t.transportType == type) {
                    tour.durations.splice(counter, 1);
                    break;
                }
                counter++;
            }
        }
    }

    getRecommendedTours(): void{
        this.keyPointIds.length = 0;

        if(this.keyPoints){
            for(let kp of this.keyPoints){
                if(kp.id){
                    this.keyPointIds.push(kp.id);
                }
            }
        
        if(this.keyPointIds.length > 0){
            this.service.getRecommendedTours(this.keyPointIds).subscribe({
                next: (result) => {
                    console.log(result);
                    this.recommendedTours = result.results;
                },
                error: () => {},
            })
        }else{
            this.recommendedTours = [];
        }
        }
    } 

    currentTourIndex: number = 0;
    
    scrollToNextTourCard(): void {
        this.currentTourIndex++;
        if (this.currentTourIndex >= this.tourContainer.children.length) {
          this.currentTourIndex = 0;
        }
        const nextCardWidth = this.tourContainer.children[this.currentTourIndex].clientWidth;
        this.scrollTo(this.tourContainer.scrollLeft + nextCardWidth);
    }
      
    scrollToPrevTourCard(): void {
        this.currentTourIndex--;
        if (this.currentTourIndex < 0) {
          this.currentTourIndex = this.tourContainer.children.length - 1;
        }
        const prevCardWidth = this.tourContainer.children[this.currentTourIndex].clientWidth;
        this.scrollTo(this.tourContainer.scrollLeft - prevCardWidth);
    }
      
    private scrollTo(scrollLeft: number): void {
        this.tourContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
    }
      
}
