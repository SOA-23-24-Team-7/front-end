import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RatingFormComponent } from "./rating-form/rating-form.component";
import { RouterModule } from "@angular/router";
import { OwnerClubsComponent } from "./owner-clubs/owner-clubs.component";
import { ClubFormComponent } from "./club-form/club-form.component";
import { ClubsComponent } from "./clubs/clubs.component";
import { MyClubJoinRequestsComponent } from "./my-club-join-requests/my-club-join-my-club-join-requests.component";
import { ClubJoinRequestManagementComponent } from "./club-join-request-management/club-join-request-management.component";
import { ReviewComponent } from "./review/review.component";
import { ReviewFormComponent } from "./review-form/review-form.component";
import { ProblemComponent } from "./problem/problem.component";
import { ProblemFormComponent } from "./problem-form/problem-form.component";
import { ClubMembersInviteFormComponent } from "./club-members-invite-form/club-members-invite-form.component";
import { ClubMembersManagementComponent } from "./club-members-management/club-members-management.component";
import { TourSearchComponent } from "./tour-search/tour-search.component";
import { SharedModule } from "src/app/shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LayoutModule } from "src/app/feature-modules/layout/layout.module";
import { KeypointsNotificationsComponent } from "./keypoints-notifications/keypoints-notifications.component";
import { FacilitiesNotificationsComponent } from "./facilities-notifications/facilities-notifications.component";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyClubInvitationsComponent } from './my-club-invitations/my-club-invitations.component';
import { TourPreferencesComponent } from './tour-preferences/tour-preferences.component';
import { TourPreferenceFormComponent } from './tour-preference-form/tour-preference-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PublishedToursComponent } from './tours/published-tours.component';
import { TourDetailsComponent } from './tour-details/tour-details.component';
import { FullSizeImageComponent } from './full-size-image/full-size-image.component';

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
        MyClubInvitationsComponent,
        TourPreferencesComponent,
        TourPreferenceFormComponent,
        PublishedToursComponent,
        TourSearchComponent,
        KeypointsNotificationsComponent,
        FacilitiesNotificationsComponent,
        ShoppingCartComponent,
        TourDetailsComponent,
        FullSizeImageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        BrowserModule,
        TagInputModule,
        BrowserAnimationsModule,
        SharedModule,
        FontAwesomeModule,
        FormsModule,
        LayoutModule,
    ],
    exports: [
        ReviewComponent,
        ReactiveFormsModule,
        RatingFormComponent,
        ProblemComponent,
        TourPreferencesComponent,
        TourPreferenceFormComponent,
        KeypointsNotificationsComponent,
        FacilitiesNotificationsComponent,
    ],
})
export class MarketplaceModule {}
