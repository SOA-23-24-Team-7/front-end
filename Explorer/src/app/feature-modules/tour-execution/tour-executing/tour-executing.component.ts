import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { Tour } from "../../tour-authoring/model/tour.model";
import { ActivatedRoute, Router } from "@angular/router";
import { TourExecutionService } from "../tour-execution.service";
import { Observable, Subscription, interval } from "rxjs";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { TouristPosition } from "../model/tourist-position.model";
import { TourExecutionSessionStatus } from "../model/tour-execution-session-status.model";
import { TourExecutionSession } from "../model/tour-execution-session-model";
import { KeyPoint } from "../../tour-authoring/model/key-point.model";
import { MatDialog } from "@angular/material/dialog";
import { ClickedKeyPointComponent } from "../clicked-key-point/clicked-key-point.component";
import { environment } from "src/env/environment";
import { TourExecutionStart } from "../model/tour-execution-start-model";
import { SecretPopupComponent } from "../secret-popup/secret-popup.component";
import { EncounterService } from "../../encounter/encounter.service";
import { KeyPointEncounter } from "../../encounter/model/key-point-encounter.model";

@Component({
    selector: "xp-tour-executing",
    templateUrl: "./tour-executing.component.html",
    styleUrls: ["./tour-executing.component.css"],
})
export class TourExecutingComponent implements OnInit {
    weather: any = {
        wind_speed: 0,
        temp: 0,
        min_temp: 0,
        max_temp: 0,
        sunset: 0,
        sunrise: 0,
        cloud_pct: 0,
        state: "Clear",
    };
    execution: TourExecutionStart = { tourId: 0, isCampaign: false };
    isCampaign: any;
    changePositionObservable: Observable<any>;
    clickedKeyPoint: KeyPoint;
    positionSubscription: Subscription;
    touristId: number;
    session: TourExecutionSession = {
        id: 0,
        tourId: 0,
        status: TourExecutionSessionStatus.Started,
        nextKeyPointId: -1,
        lastActivity: null!,
        progress: 0,
        isCampaign: false,
    };
    tour: Tour = {
        name: ".",
        description: ".",
        tags: ["."],
        difficulty: 1,
    };
    isTourInProgress: boolean = true;
    tourImage: string;
    touristPosition: any = null;
    encounterPoint: KeyPointEncounter;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private service: TourExecutionService,
        private encounterService: EncounterService,
        public dialogRef: MatDialog,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.isCampaign = params.get("isCampaign")!;
            if (this.isCampaign == "false") {
                this.session.isCampaign = false;
            } else {
                this.session.isCampaign = true;
            }
            this.session.tourId = +params.get("tourId")!;
            this.getTour();
        });

        this.authService.user$.subscribe({
            next: (result: User) => {
                this.touristId = result.id;

                this.getTouristPosition();
                this.positionSubscription = interval(1000000).subscribe(() => {
                    this.getTouristPosition();
                });
            },
        });
    }

    activateKeyPointEncounter(
        keyPointId: number,
        touristPosition: TouristPosition,
    ) {
        this.encounterService
            .getEncounterForKeyPoint(keyPointId, touristPosition)
            .subscribe({
                next: (result: KeyPointEncounter) => {
                    this.encounterPoint = result;
                },
            });
    }

    checkKeyPointCompletion() {
        if (this.session.status !== TourExecutionSessionStatus.Started) return;

        this.activateKeyPointEncounter(-1, this.touristPosition);
        this.service
            .checkKeyPointCompletion(
                this.session.tourId,
                this.session.isCampaign,
                this.touristPosition,
            )
            .subscribe({
                next: session => {
                    if (
                        this.session.nextKeyPointId != -1 &&
                        this.session.nextKeyPointId != session.nextKeyPointId
                    ) {
                        this.showSecret(this.session.nextKeyPointId);
                    }
                    this.session = session;
                    if (
                        this.session.status ==
                        TourExecutionSessionStatus.Completed
                    ) {
                        this.isTourInProgress = false;
                        alert("Tour completed");
                    }
                },
                // () => {
                //     alert("No started tour!");
                // },
            });
    }

    getTouristPosition() {
        this.service.getTouristPositionByTouristId(this.touristId).subscribe({
            next: (result: TouristPosition) => {
                if (result) {
                    this.touristPosition = {
                        longitude: result.longitude,
                        latitude: result.latitude,
                    };
                } else {
                    return;
                }
            },
        });
    }

    showSecret(keyPointId: number) {
        this.tour.keyPoints?.forEach(keyPoint => {
            if (keyPoint.id == keyPointId) {
                if (keyPoint.secret?.description != "") {
                    this.dialogRef.open(SecretPopupComponent, {
                        width: "auto",
                        height: "auto",
                        data: {
                            dataKey: keyPoint.secret?.description,
                        },
                    });
                }
            }
        });
    }

    getTour() {
        if (!this.session.isCampaign) {
            this.service.getTour(this.session.tourId).subscribe({
                next: (result: Tour) => {
                    this.tour = result;
                    this.tourImage =
                        environment.imageHost +
                        this.tour.keyPoints![0].imagePath;
                    this.getWeather();
                },
            });
        } else {
            this.service.getCampaign(this.session.tourId).subscribe({
                next: (result: Tour) => {
                    console.log(result);
                    this.tour = result;
                    this.tourImage =
                        environment.imageHost +
                        this.tour.keyPoints![0].imagePath;
                    this.getWeather();
                },
            });
        }
    }

    abandonTour() {
        if (this.session.status != TourExecutionSessionStatus.Started) {
            this.router.navigate(["/purchasedtours"]);
        }
        let r = confirm("Are you sure you want to leave this tour?");
        if (r) {
            this.execution.tourId = this.session.tourId;
            this.execution.isCampaign = this.session.isCampaign;
            this.service.abandonTour(this.execution).subscribe({
                next: (result: TourExecutionSession) => {
                    this.router.navigate(["/purchasedtours"]);
                },
            });
        }
    }

    goBack() {
        this.router.navigate(["/purchasedtours"]);
    }

    createBlog(): void {
        this.router.navigate(["/tourists-blog/" + this.tour.id]);
    }

    getLiveTourExecution() {
        this.service.getLiveTour().subscribe({
            next: (result: TourExecutionSession) => {
                if (result != null) {
                    this.session = result;
                }
            },
        });
    }

    getKeyPoint(LatLng: any) {
        this.tour.keyPoints?.forEach(keyPoint => {
            if (
                keyPoint.latitude == LatLng.lat &&
                keyPoint.longitude == LatLng.lng
            ) {
                this.clickedKeyPoint = keyPoint;
            }
        });
        let nextKeyPointId: number;
        if (this.session.status == TourExecutionSessionStatus.Completed) {
            nextKeyPointId = Number.POSITIVE_INFINITY;
        } else {
            nextKeyPointId = this.session.nextKeyPointId;
        }
        this.dialogRef.open(ClickedKeyPointComponent, {
            width: "auto",
            height: "auto",
            data: {
                dataKey: this.clickedKeyPoint,
                nextKeyPointId: nextKeyPointId,
            },
        });
    }

    @HostListener("window:beforeunload")
    backButtonHandler() {
        this.router.navigate(["/purchasedtours"]);
    }
    getWeather() {
        this.service
            .getWheather(
                this.tour.keyPoints![0].latitude,
                this.tour.keyPoints![0].longitude,
            )
            .subscribe({
                next: (result: any) => {
                    this.weather = result;
                    this.weather.sunrise = new Date(this.weather.sunrise * 1000)
                        .toString()
                        .split(" ")[4];
                    this.weather.sunset = new Date(this.weather.sunset * 1000)
                        .toString()
                        .split(" ")[4];
                    if (this.weather.cloud_pct > 50) {
                        this.weather.state = "Cloudy";
                    } else if (this.weather.cloud_pct > 30) {
                        this.weather.state = "Mostly cloudy";
                    } else {
                        this.weather.state = "Clear";
                    }
                },
            });
    }
}
