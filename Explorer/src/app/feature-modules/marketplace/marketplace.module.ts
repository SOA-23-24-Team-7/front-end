import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { OwnerClubsComponent } from './owner-clubs/owner-clubs.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClubsComponent } from './clubs/clubs.component';
import { MyClubJoinRequestsComponent } from './my-club-join-requests/my-club-join-my-club-join-requests.component';
import { ClubJoinRequestManagementComponent } from './club-join-request-management/club-join-request-management.component';
import { ClubMembersManagementComponent } from './club-members-management/club-members-management.component';
import { ClubMembersInviteFormComponent } from './club-members-invite-form/club-members-invite-form.component';

@NgModule({
  declarations: [
    OwnerClubsComponent,
    ClubFormComponent,
    ClubsComponent,
    MyClubJoinRequestsComponent,
    ClubJoinRequestManagementComponent,
    ClubMembersManagementComponent,
    ClubMembersInviteFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class MarketplaceModule { }
