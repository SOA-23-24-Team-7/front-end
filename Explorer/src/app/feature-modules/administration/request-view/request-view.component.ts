import { Component, OnInit } from "@angular/core";
import {
    PublicKeyPointRequest,
    PublicStatus,
} from "../../tour-authoring/model/public-key-point-request.model";
import { AdministrationService } from "../administration.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { PublicFacilityRequest } from "../../tour-authoring/model/public-facility-request.model";
import { CommentRequestFormComponent } from "../comment-request-form/comment-request-form.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CommentKeyPointRequestFormComponent } from "../comment-keypoint-request-form/comment-keypoint-request-form.component";
import {
    faCheck,
    faMapMarker,
    faTimes,
    faBuilding,
    faSquareCheck,
    faSquareXmark
} from "@fortawesome/free-solid-svg-icons";

enum Tab {
    KEYPOINTS,
    FACILITIES,
}
@Component({
    selector: "xp-request-view",
    templateUrl: "./request-view.component.html",
    styleUrls: ["./request-view.component.css"],
})
export class RequestViewComponent implements OnInit {
    requests: PublicKeyPointRequest[] = [];
    facilityRequests: PublicFacilityRequest[] = [];
    status: PublicStatus;
    isVisible: boolean = false;
    faCheck = faCheck;
    faTimes = faTimes;
    faMapMarker = faMapMarker;
    faBuilding = faBuilding;
    faSquareCheck = faSquareCheck;
    faSquareXmark = faSquareXmark;
    Tab = Tab;
    selectedTab: Tab = Tab.KEYPOINTS;
    constructor(
        private service: AdministrationService,
        public dialogRef: MatDialog,
    ) {
        this.selectedTab = Tab.KEYPOINTS;
    }

    ngOnInit(): void {
        this.getRequests();
    }
    requestForm = new FormGroup({
        comment: new FormControl(""),
    });

    setActiveTab(tab: Tab, el: HTMLElement): void {
        this.selectedTab = tab;
        setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1);
    }

    getRequests(): void {
        this.service.getRequests().subscribe({
            next: (result: PagedResults<PublicKeyPointRequest>) => {
                this.requests = result.results;
                this.service.getFacilityRequests().subscribe({
                    next: (result: PagedResults<PublicFacilityRequest>) => {
                        this.facilityRequests = result.results;
                    },
                });
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }
    acceptPublicKeyPointRequest(request: PublicKeyPointRequest): void {
        request.status = 1;
        request.comment = "";
        if (request.id != undefined) {
            this.service.acceptPublicKeyPointRequest(request.id).subscribe({
                next: () => {
                    this.getRequests();
                },
                error: errData => {
                    console.log(errData);
                },
            });
        }
    }

    rejectPublicKeyPointRequest(request: PublicKeyPointRequest): void {
        const dialogRef = this.dialogRef.open(
            CommentKeyPointRequestFormComponent,
            {
                data: request,
            },
        );
        dialogRef.afterClosed().subscribe(result => {
            this.getRequests(); // update the price
        });
    }
    getPublicStatusText(status: PublicStatus | undefined): string {
        if (status === undefined) {
            return "N/A";
        }
        switch (status) {
            case PublicStatus.Accepted:
                return "Accepted";
            case PublicStatus.Rejected:
                return "Rejected";
            default:
                return "Pending";
        }
    }
    acceptPublicFacilityRequest(request: PublicFacilityRequest): void {
        request.status = 1;
        request.comment = "";
        if (request.id != undefined) {
            this.service.acceptPublicFacilityRequest(request.id).subscribe({
                next: () => {
                    this.getRequests();
                },
                error: errData => {
                    console.log(errData);
                },
            });
        }
    }

    rejectPublicFacilityRequest(request: PublicFacilityRequest): void {
        const dialogRef=this.dialogRef.open(CommentRequestFormComponent, {
            data: request,
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getRequests(); // update the price
        });
    }
}
