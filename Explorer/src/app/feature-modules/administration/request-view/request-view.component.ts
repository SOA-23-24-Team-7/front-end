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
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
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
    constructor(
        private service: AdministrationService,
        public dialogRef: MatDialog,
    ) {}

    ngOnInit(): void {
        this.getRequests();
    }
    requestForm = new FormGroup({
        comment: new FormControl(""),
    });

    getRequests(): void {
        this.service.getRequests().subscribe({
            next: (result: PagedResults<PublicKeyPointRequest>) => {
                this.requests = result.results;
                this.service.getFacilityRequests().subscribe({
                    next: (result: PagedResults<PublicFacilityRequest>) => {
                        this.facilityRequests = result.results;
                        this.sortKeyPointRequests();
                        this.sortFacilityRequests();
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
        this.dialogRef.open(CommentKeyPointRequestFormComponent, {
            data: request,
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
        this.dialogRef.open(CommentRequestFormComponent, {
            data: request,
        });
    }

    sortKeyPointRequests(): void {
        this.requests = this.requests.sort((a, b) => {
            if (a.status === 0 && b.status !== 0) {
                return -1;
            } else if (a.status !== 0 && b.status === 0) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    sortFacilityRequests(): void {
        this.facilityRequests = this.facilityRequests.sort((a, b) => {
            if (a.status === 0 && b.status !== 0) {
                return -1;
            } else if (a.status !== 0 && b.status === 0) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}
