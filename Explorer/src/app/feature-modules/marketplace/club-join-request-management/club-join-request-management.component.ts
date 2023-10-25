import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ClubJoinRequest } from '../model/club-join-request.model copy';

@Component({
  selector: 'xp-clubs',
  templateUrl: './club-join-request-management.component.html',
  styleUrls: ['./club-join-request-management.component.css']
})
export class ClubJoinRequestManagementComponent implements OnInit{
  clubId: number
  requests: ClubJoinRequest[] = []
  user: User | undefined
  constructor(private route: ActivatedRoute, private service: MarketplaceService, private authService: AuthService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idString = params['clubId'];
      this.clubId = parseInt(idString, 10);
    });
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getClubJoinRequests()
  }

  getClubJoinRequests(): void {
    this.service.getClubJoinRequestsByClub(this.clubId).subscribe({
      next: (result: PagedResults<ClubJoinRequest>) => {
        this.requests = result.results;
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }

  acceptClubJoinRequest(request: ClubJoinRequest): void {
    this.service.respondClubJoinRequest(request.id, true).subscribe({
      next: () => {
        request.status = 'Accepted';
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }

  rejectClubJoinRequest(request: ClubJoinRequest): void {
    this.service.respondClubJoinRequest(request.id, false).subscribe({
      next: () => {
        request.status = 'Rejected';
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }
}
