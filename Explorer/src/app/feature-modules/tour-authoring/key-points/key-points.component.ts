import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { TourAuthoringService } from "../tour-authoring.service";
import { KeyPoint } from "../model/key-point.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { environment } from "src/env/environment";
import { MapService } from "src/app/shared/map/map.service";

import { BehaviorSubject, Observable, Subject } from "rxjs";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { PublicKeyPointsComponent } from "../public-key-points/public-key-points.component";
import { Router } from "@angular/router";
import { MapComponent } from "src/app/shared/map/map.component";
import { TourComponent } from "../tour/tour.component";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Tour, TourStatus } from "../model/tour.model";
import { FormControl, FormGroup } from "@angular/forms";
import { TourDuration, TransportType } from "../model/tourDuration.model";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
@Component({
    selector: "xp-key-points",
    templateUrl: "./key-points.component.html",
    styleUrls: ["./key-points.component.css"],
})
export class KeyPointsComponent implements OnInit {
    tour?: Tour;
    keyPoints: KeyPoint[] = [];
    selectedKeyPoint: KeyPoint | null = null;
    mapLongLat: [number, number];
    mapLocationAddress: string;
    shouldRenderKeyPointForm: boolean = true;
    shouldEdit: boolean = false;
    tourIdTemp: number = 0;
    areButtonsEnabled: boolean = true;
    @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;

    public distance: number;
    public walkingDuration: number = 0;
    public bicycleRideDuration: number = 0;
    public carRideDuration: number = 0;

    checkedWalkingDuration: boolean = false;
    checkedBicycleRideDuration: boolean = false;
    checkedCarRideDuration: boolean = false;
    keyPointContainer: any;

    faCoins = faCoins;

    constructor(
        private route: ActivatedRoute,
        private service: TourAuthoringService,
        private mapService: MapService,
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

        const param = this.route.snapshot.paramMap.get("id");
        if (param) {
            this.service.getTour(Number(param)).subscribe({
                next: result => {
                    this.tour = result;
                    this.getKeyPoints();
                    this.enableButtons();
                },
            });
        }
    }

    enableButtons(): void {
        if (this.tour?.status == TourStatus.Published) {
            this.areButtonsEnabled = false;
            this.getDurationInfo(this.tour);
        } else {
            this.areButtonsEnabled = true;
        }
    }

    getKeyPoints(): void {
        this.service.getKeyPoints(this.tour?.id!).subscribe({
            next: (result: KeyPoint[]) => {
                this.keyPoints = result;

                if (this.keyPoints.length < 2) {
                    this.walkingDuration = 0;
                    this.bicycleRideDuration = 0;
                    this.carRideDuration = 0;
                } else if (this.mapComponent.tourDistance != 0) {
                    this.calculateDurations(this.mapComponent.tourDistance);
                } else {
                    if (this.tour?.distance) {
                        this.calculateDurations(this.tour.distance);
                        this.handleCheckBoxes(this.tour);
                    }
                }
            },
            error: () => {},
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

        this.router.navigate(["/tours"]);
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
}
