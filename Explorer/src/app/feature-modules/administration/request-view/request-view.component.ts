import { Component, OnInit } from '@angular/core';
import { PublicKeyPointRequest, PublicStatus } from '../../tour-authoring/model/public-key-point-request';
import { AdministrationService } from '../administration.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { PublicFacilityRequest } from '../../tour-authoring/model/public-facility-request';

@Component({
  selector: 'xp-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class RequestViewComponent implements OnInit{
  requests: PublicKeyPointRequest[]=[]
  facilityRequests: PublicFacilityRequest[]=[]
  status:PublicStatus;
  constructor(private service: AdministrationService){}
  ngOnInit(): void {
    this.getRequests();   
  }
  requestForm = new FormGroup({
    comment: new FormControl("")
});

  getRequests(): void {
    this.service.getRequests().subscribe({
      next: (result: PagedResults<PublicKeyPointRequest>) => {
          this.requests = result.results;
          this.service
              .getFacilityRequests()
              .subscribe({
                  next: (result: PagedResults<PublicFacilityRequest>) => {
                      this.facilityRequests = result.results;
                  },
              });
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
  acceptPublicKeyPointRequest(request: PublicKeyPointRequest): void {
    request.status = 1;
    request.comment = "",
    this.service.respondPublicKeyPointRequest(request).subscribe({
      next: () => {
        request.status = 1;
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }

  rejectPublicKeyPointRequest(request: PublicKeyPointRequest): void {
    request.status = 2;
    request.comment = this.requestForm.value.comment || "",
    this.service.respondPublicKeyPointRequest(request).subscribe({
      next: () => {
        request.status = 2;
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }
  getPublicStatusText(status: PublicStatus  | undefined): string {
    if (status === undefined) {
      return 'N/A'; 
    }
    switch (status) {
      case PublicStatus.Accepted:
        return 'Accepted';
      case PublicStatus.Rejected:
        return 'Rejected';
      default:
        return 'Pending';
    }
  }
  acceptPublicFacilityRequest(request: PublicFacilityRequest): void {
    request.status = 1;
    request.comment = "",
    this.service.respondPublicFacilityRequest(request).subscribe({
      next: () => {
        request.status = 1;
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }

  rejectPublicFacilityRequest(request: PublicFacilityRequest): void {
    request.status = 2;
    request.comment = this.requestForm.value.comment || "",
    this.service.respondPublicFacilityRequest(request).subscribe({
      next: () => {
        request.status = 2;
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }
}
