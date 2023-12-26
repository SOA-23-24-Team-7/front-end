import { Component, OnInit, ViewChild } from "@angular/core";
import { Facilities } from "../model/facilities.model";
import { TourAuthoringService } from "../tour-authoring.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { MapComponent } from "src/app/shared/map/map.component";
import { FacilitiesFormComponent } from "../facilities-form/facilities-form.component";
import { MatDialog } from "@angular/material/dialog";
import { FacilityModalComponent } from "../facility-modal/facility-modal.component";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { xpError } from "src/app/shared/model/error.model";

@Component({
    selector: "xp-facilities",
    templateUrl: "./facilities.component.html",
    styleUrls: ["./facilities.component.css"],
})
export class FacilitiesComponent implements OnInit {
    @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;
    @ViewChild(FacilitiesFormComponent, { static: false })
    facilitiesFormComponent: FacilitiesFormComponent;

    facilities: Facilities[] = [];
    selectedFacility: Facilities;

    shouldEdit: boolean = false;
    shouldRenderFacilitiesForm: boolean = false;
    facilityContainer: any;
    constructor(
        private service: TourAuthoringService,
        public dialogRef: MatDialog,
        private route: ActivatedRoute,
        private notifier: NotifierService,
    ) {}

    ngOnInit(): void {
        this.facilityContainer = document.querySelector(
            ".key-point-cards-container",
        );
        this.getFacilities();
    }

    getFacilities(): void {
        this.service.getAuthorsFacilities().subscribe({
            next: (result: PagedResults<Facilities>) => {
                this.facilities = result.results;

                for (let f of this.facilities) {
                    this.mapComponent.setMarkersForAllFacilities(
                        f.latitude,
                        f.longitude,
                    );
                }
            },
            error: () => {},
        });
    }

    onMapClicked(): void {
        this.mapComponent.getClickCoordinates((lat, lng) => {
            this.facilitiesFormComponent.newLatitude = lat;
            this.facilitiesFormComponent.newLongitude = lng;

            console.log(this.facilitiesFormComponent.newLatitude);
            console.log(this.facilitiesFormComponent.newLongitude);
        });

        if (this.shouldRenderFacilitiesForm) {
            this.facilitiesFormComponent.isAddButtonDisabled = false;
        }
    }

    onTableRowClicked(facility: Facilities): void {
        this.selectedFacility = facility;
        if (this.mapComponent) {
            this.mapComponent.setMarker(facility.latitude, facility.longitude);
            this.mapComponent.facilitiesUsed = true;
        }
    }

    onCloseClicked(): void {
        this.shouldRenderFacilitiesForm = false;
        this.shouldEdit = false;
    }
    currentIndex: number = 0;
    scrollToNextCard(): void {
        this.currentIndex++;
        if (this.currentIndex >= this.facilityContainer.children.length) {
            this.currentIndex = 0;
        }
        this.facilityContainer.scrollLeft +=
            this.facilityContainer.children[this.currentIndex].clientWidth;
    }
    scrollToPrevCard(): void {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.facilityContainer!.children.length - 1;
        }
        this.facilityContainer!.scrollLeft -=
            this.facilityContainer.children[this.currentIndex].clientWidth;
    }

    openNewFacilityDialog() {
        const dialogRef = this.dialogRef.open(FacilityModalComponent, {
            data: {
                isUpdateForm: false,
            },
        });

        dialogRef.componentInstance.facilityCreated.subscribe(facility => {
            this.facilities.push(facility);
        });
    }
    openEditFacilityDialog(f: Facilities) {
        const dialogRef = this.dialogRef.open(FacilityModalComponent, {
            data: {
                isUpdateForm: true,
                facility: f,
            },
        });

        dialogRef.componentInstance.facilityUpdated.subscribe(facility => {
            let index = this.facilities.findIndex(x => x.id == facility.id);
            this.facilities[index] = facility;
        });
    }

    deleteFacility(id: number): void {
        this.route.paramMap.subscribe({
            next: (params: ParamMap) => {
                this.service.deleteFacility(id).subscribe({
                    next: () => {
                        this.facilities = this.facilities.filter(
                            x => x.id != id,
                        );
                        this.notifier.notify("success", "Removed facility.");
                    },
                    error: (err: any) => {
                        this.notifier.notify(
                            "error",
                            xpError.getErrorMessage(err),
                        );
                    },
                });
            },
        });
    }
}
