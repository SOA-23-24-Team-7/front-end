import { Component } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ClubInvitationWithClubAndOwnerName } from '../../marketplace/model/club-invitation-with-club-and-owner-name.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { NotifierService } from 'angular-notifier';
import { MyClubJoinRequest } from '../../marketplace/model/my-club-join-request.model';

@Component({
  selector: 'xp-club-notifications',
  templateUrl: './club-notifications.component.html',
  styleUrls: ['./club-notifications.component.css']
})
export class ClubNotificationsComponent {
  faCheck = faCheck;
  faXmark = faXmark;
  invitations: ClubInvitationWithClubAndOwnerName[] = [];
  requests: MyClubJoinRequest[] = [];
  user: User;
  nums: number[] = [1, 2, 3];

  constructor(private service: MarketplaceService, private authService: AuthService, private notifier: NotifierService) {}
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.getInvitations();
      this.getMyClubJoinRequests();
    })
  }

  getInvitations(): void {
    this.service.getInvitations().subscribe({
      next: (result: PagedResults<ClubInvitationWithClubAndOwnerName>) => {
        this.invitations = result.results;
      },
      error: (errData) => {
        console.log(errData);
      }
    })
  }

  getMyClubJoinRequests(): void {
    this.service.getMyClubJoinRequests().subscribe({
      next: (result: PagedResults<MyClubJoinRequest>) => {
        this.requests = result.results.filter(request => request.status == 'Accepted' || request.status == 'Rejected');
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }

  acceptInvite(invitation: ClubInvitationWithClubAndOwnerName): void {
    this.service.acceptInvite(invitation.id).subscribe({
      next: () => {
        this.getInvitations();
        this.getMyClubJoinRequests();
        this.notifier.notify('success', `You have joined the "${invitation.clubName}" club.`);
      },
      error: (errData) => {
        console.log(errData);
      }
    })
  }
  
  rejectInvite(invitation: ClubInvitationWithClubAndOwnerName): void {
    this.service.rejectInvite(invitation.id).subscribe({
      next: () => {
        this.getInvitations();
        this.getMyClubJoinRequests();
        this.notifier.notify('error', `You have rejected your invite for the"${invitation.clubName}" club.`)
      },
      error: (errData) => {
        console.log(errData);
      }
    })
  }
}
