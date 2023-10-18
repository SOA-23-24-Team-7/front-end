import { Component, OnInit } from '@angular/core';
import { Club } from '../model/club.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MyClubJoinRequest } from '../model/my-club-join-request.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-clubs',
  templateUrl: './my-club-join-requests.component.html',
  styleUrls: ['./my-club-join-requests.component.css']
})
export class MyClubJoinRequestsComponent implements OnInit{
  requests: MyClubJoinRequest[] = []
  user: User | undefined
  constructor(private service: MarketplaceService, private authService: AuthService){}
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getMyClubJoinRequests()
  }

  getMyClubJoinRequests(): void {
    this.service.getMyClubJoinRequests().subscribe({
      next: (result: PagedResults<MyClubJoinRequest>) => {
        this.requests = result.results;
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }

  cancelClubJoinRequest(request: MyClubJoinRequest): void {
    this.service.cancelClubJoinRequest(request.id).subscribe({
      next: () => {
        this.removeClubJoinRequest(request)
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }

  removeClubJoinRequest(request: MyClubJoinRequest): void {
    const requestsRemoved = this.requests.filter((r) => r.id !== request.id);
    this.requests = requestsRemoved;
  }
}
