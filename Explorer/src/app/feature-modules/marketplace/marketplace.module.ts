import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingFormComponent } from "./rating-form/rating-form.component";
import { RouterModule } from "@angular/router";
import { OwnerClubsComponent } from './owner-clubs/owner-clubs.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { ClubsComponent } from './clubs/clubs.component';
import { MyClubJoinRequestsComponent } from './my-club-join-requests/my-club-join-my-club-join-requests.component';
import { ClubJoinRequestManagementComponent } from './club-join-request-management/club-join-request-management.component';
import { ReviewComponent } from "./review/review.component";
import { ReviewFormComponent } from "./review-form/review-form.component";
import { FormsModule } from "@angular/forms";
import { ProblemComponent } from "./problem/problem.component";
import { ProblemFormComponent } from "./problem-form/problem-form.component";
import { ClubMembersInviteFormComponent } from "./club-members-invite-form/club-members-invite-form.component";
import { ClubMembersManagementComponent } from "./club-members-management/club-members-management.component";
import { MyClubInvitationsComponent } from './my-club-invitations/my-club-invitations.component';

@NgModule({
    declarations: [
        OwnerClubsComponent,
        ClubFormComponent,
        ClubsComponent,
        MyClubJoinRequestsComponent,
        ClubJoinRequestManagementComponent,
        ReviewComponent,
        ReviewFormComponent,
        ProblemComponent,
        ProblemFormComponent,
        RatingFormComponent,
        ClubFormComponent,
        ClubsComponent,
        OwnerClubsComponent,
        ClubMembersInviteFormComponent,
        ClubMembersManagementComponent,
        MyClubInvitationsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        ReviewComponent,
        ReactiveFormsModule,
        RatingFormComponent,
        ProblemComponent
        
    ],
})
export class MarketplaceModule {}
