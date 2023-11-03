import { Component, OnInit } from "@angular/core";
import { TourAuthoringService } from "../tour-authoring.service";
import { KeyPoint } from "../model/key-point.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { environment } from "src/env/environment";
import { MapService } from "src/app/shared/map/map.service";
import { BehaviorSubject, Subject } from "rxjs";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";

import { ReviewComponent } from "../../marketplace/review/review.component";

@Component({
    selector: "xp-key-points",
    templateUrl: "./key-points.component.html",
    styleUrls: ["./key-points.component.css"],
})
export class KeyPointsComponent implements OnInit {
    keyPoints: KeyPoint[] = [];
    selectedKeyPoint: KeyPoint | null = null;
    mapLongLat: [number, number];
    shouldRenderKeyPointForm: boolean = false;
    shouldEdit: boolean = false;
    refreshEventsSubject: BehaviorSubject<number>;
    keyPointContainer: any;
    constructor(
        private route: ActivatedRoute,
        private service: TourAuthoringService,
        private mapService: MapService,
        public dialogRef: MatDialog,
    ) {}

    ngOnInit(): void {
        this.keyPointContainer = document.querySelector(
            ".key-point-cards-container",
        );
        this.getKeyPoints();
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
        const dialogRef = this.dialogRef.open(
            ReviewComponent, //komponenta sa listom svih javnih tacaka
            {
                //data: this.listaJavnihTacaka, // lista javnih tacaka koju dobijam u ovoj komponenti i ovim je saljem u modalni dijalog
            },
        );

        dialogRef.afterClosed().subscribe(result => {
            console.log("Zatvoren dijalog", result);
            // Obradis rezultat koji dobijes
        });
    }

    /*
        Ovo staviti u komponentu za listu javnih tacaka:
        import { Inject } from "@angular/core";
        U konstruktor:@Inject(MAT_DIALOG_DATA) public data: any -> ovim to 'data' u modalnom dijalogu dobija proslijedjenu listu javnih tacaka

        izabrati odredjene javne tacke u modalnom dijalogu, i proslijediti ih ovoj komponenti na sljedeci nacin:
        @Output() selectedObjects = new EventEmitter<any[]>();  -> ovo se stavi u modalni dijalog
        <button (click)="confirm(selectedItems)">Confirm</button>
        confirm(selectedItems: any[]) {
            this.selectedObjects.emit(selectedItems);
        }
        ovim ce selectedItems biti unutar result-a
    */
}
