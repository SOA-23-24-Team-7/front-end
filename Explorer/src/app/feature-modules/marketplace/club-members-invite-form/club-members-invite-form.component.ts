import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketplaceService } from '../marketplace.service';
import { ClubInvitationUsername } from '../model/club-invitation-username.model';

@Component({
  selector: 'xp-club-members-invite-form',
  templateUrl: './club-members-invite-form.component.html',
  styleUrls: ['./club-members-invite-form.component.css']
})
export class ClubMembersInviteFormComponent implements OnChanges {
  
  @Input() clubId: number;

  showError: boolean = false;
  showSuccess: boolean = false;

  constructor(private service: MarketplaceService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.clubMemberForm.reset();
  }

  clubMemberForm = new FormGroup({
    username: new FormControl('', [Validators.required])
  });

  inviteMember(): void {
    const invitation: ClubInvitationUsername = {
      username: this.clubMemberForm.value.username || "",
      clubId: this.clubId
    };

    const result = this.service.inviteMember(invitation).subscribe({
      next: () => {
        this.showSuccess = true;
        if (this.showError = true) this.showError = false;
      },
      error: () => {
        this.showSuccess = false;
        this.showError = true;
      }
    })
  }
}
