import { Component, OnInit } from '@angular/core';
import { ClubInvitationWithClubAndOwnerName } from '../model/club-invitation-with-club-and-owner-name.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-my-club-invitations',
  templateUrl: './my-club-invitations.component.html',
  styleUrls: ['./my-club-invitations.component.css']
})
export class MyClubInvitationsComponent implements OnInit {

  invitations: ClubInvitationWithClubAndOwnerName[];
  user: User;

  constructor(private service: MarketplaceService, private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.getInvitations();
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

  acceptInvite(invitation: ClubInvitationWithClubAndOwnerName): void {
    this.service.acceptInvite(invitation.id).subscribe({
      next: () => {
        this.getInvitations();
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
      },
      error: (errData) => {
        console.log(errData);
      }
    })
  }

}
