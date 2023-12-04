import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "src/app/feature-modules/layout/home/home.component";
import { LoginComponent } from "../auth/login/login.component";
import { EquipmentComponent } from "src/app/feature-modules/administration/equipment/equipment.component";
import { TourPreferencesComponent } from "src/app/feature-modules/marketplace/tour-preferences/tour-preferences.component";
import { TourPreferenceFormComponent } from "src/app/feature-modules/marketplace/tour-preference-form/tour-preference-form.component";
import { AuthGuard } from "../auth/auth.guard";
import { RegistrationComponent } from "../auth/registration/registration.component";
import { BlogsComponent } from "src/app/feature-modules/blog/blogs/blogs.component";
import { BlogComponent } from "src/app/feature-modules/blog/blog/blog.component";
import { UsersOverviewComponent } from "src/app/feature-modules/administration/users-overview/users-overview.component";
import { UserProfileComponent } from "src/app/feature-modules/stakeholder/user-profile/user-profile.component";
import { RatingComponent } from "src/app/feature-modules/administration/rating/rating.component";
import { RatingFormComponent } from "src/app/feature-modules/marketplace/rating-form/rating-form.component";
import { ReviewComponent } from "src/app/feature-modules/marketplace/review/review.component";
import { ProblemComponent } from "src/app/feature-modules/marketplace/problem/problem.component";
import { TourComponent } from "src/app/feature-modules/tour-authoring/tour/tour.component";
import { TourEquipmentFormComponent } from "src/app/feature-modules/tour-authoring/tour-equipment-form/tour-equipment-form.component";
import { EditProfileComponent } from "../../feature-modules/stakeholder/edit-profile/edit-profile.component";
import { OwnerClubsComponent } from "src/app/feature-modules/marketplace/owner-clubs/owner-clubs.component";
import { ClubsComponent } from "src/app/feature-modules/marketplace/clubs/clubs.component";
import { MyClubJoinRequestsComponent } from "src/app/feature-modules/marketplace/my-club-join-requests/my-club-join-my-club-join-requests.component";
import { ClubJoinRequestManagementComponent } from "src/app/feature-modules/marketplace/club-join-request-management/club-join-request-management.component";
import { TouristEquipmentSelectionComponent } from "src/app/feature-modules/layout/tourist-equipment-selection/tourist-equipment-selection.component";
import { ClubMembersManagementComponent } from "src/app/feature-modules/marketplace/club-members-management/club-members-management.component";
import { FacilitiesComponent } from "src/app/feature-modules/tour-authoring/facilities/facilities.component";
import { KeyPointsComponent } from "src/app/feature-modules/tour-authoring/key-points/key-points.component";
import { MyClubInvitationsComponent } from "src/app/feature-modules/marketplace/my-club-invitations/my-club-invitations.component";
import { ProblemsOverviewComponent } from "src/app/feature-modules/stakeholder/problems-overview/problems-overview.component";
import { ProblemAnswerComponent } from "src/app/feature-modules/stakeholder/problem-answer/problem-answer.component";
import { TouristPositionSimulatorComponent } from "src/app/feature-modules/tour-execution/tourist-position-simulator/tourist-position-simulator.component";
import { RequestViewComponent } from "src/app/feature-modules/administration/request-view/request-view.component";
import { PurchasedToursComponent } from "src/app/feature-modules/tour-execution/purchased-tour-cards/purchased-tour-cards.component";
import { PublishedToursComponent } from "src/app/feature-modules/marketplace/tours/published-tours.component";
import { TourExecutingComponent } from "src/app/feature-modules/tour-execution/tour-executing/tour-executing.component";
import { BlogFormComponent } from "src/app/feature-modules/blog/blog-form/blog-form.component";
import { MyBlogsComponent } from "src/app/feature-modules/blog/my-blogs/my-blogs.component";
import { TourSearchComponent } from "src/app/feature-modules/marketplace/tour-search/tour-search.component";
import { NotificationTabsComponent } from "src/app/feature-modules/stakeholder/notification-tabs/notification-tabs.component";
import { TourDetailsComponent } from "src/app/feature-modules/marketplace/tour-details/tour-details.component";
import { UserNotificationsComponent } from "src/app/feature-modules/stakeholder/user-notifications/user-notifications.component";
import { TourCardViewComponent } from "src/app/shared/tour-card-view/tour-card-view.component";
import { ActiveEncounterViewComponent } from "src/app/feature-modules/encounter/active-encounter-view/active-encounter-view.component";
import { TourPageComponent } from "src/app/feature-modules/marketplace/tour-page/tour-page.component";
import { PaymentHistoryComponent } from "src/app/feature-modules/stakeholder/payment-history/payment-history.component";
import { TouristsTourComponent } from "src/app/feature-modules/tour-authoring/tourists-tour/tourists-tour.component";
import { TouristsKeyPointsComponent } from "src/app/feature-modules/tour-authoring/tourists-key-points/tourists-key-points.component";
import { TouristsEquipmentComponent } from "src/app/feature-modules/tour-authoring/tourists-equipment/tourists-equipment.component";
import { CouponsViewComponent } from "src/app/feature-modules/marketplace/coupons-view/coupons-view.component";
const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegistrationComponent },
    { path: "user-notifications", component: UserNotificationsComponent },
    {
        path: "equipment",
        component: EquipmentComponent,
        canActivate: [AuthGuard],
    },
    { path: "", component: HomeComponent },
    { path: "ratings", component: RatingComponent, canActivate: [AuthGuard] },
    {
        path: "rating-form",
        component: RatingFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "review/:tourId",
        component: ReviewComponent,
        canActivate: [AuthGuard],
    },
    { path: "problem", component: ProblemComponent, canActivate: [AuthGuard] },
    {
        path: "problems",
        component: ProblemsOverviewComponent,
        canActivate: [AuthGuard],
    },
    { path: "tours", component: TourComponent, canActivate: [AuthGuard] },
    {
        path: "purchasedtours",
        component: PurchasedToursComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "published-tours",
        component: PublishedToursComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tours/equipment/:id",
        component: TourEquipmentFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "facilities",
        component: FacilitiesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour/:id/key-points",
        component: KeyPointsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tourist-position-simulator",
        component: TouristPositionSimulatorComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tourist-position-simulator",
        component: TouristPositionSimulatorComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour-executing/:tourId",
        component: TourExecutingComponent,
        canActivate: [AuthGuard],
    },

    {
        path: "user-management",
        component: UsersOverviewComponent,
        canActivate: [AuthGuard],
    },
    { path: "clubs", component: ClubsComponent, canActivate: [AuthGuard] },
    { path: "blogs", component: BlogsComponent },
    { path: "my-blogs", component: MyBlogsComponent },
    { path: "blog/:blogId", component: BlogComponent },
    { path: "my-blogs/blog-form/:blogId", component: BlogFormComponent },
    { path: "blog-form/:blogId", component: BlogFormComponent },
    {
        path: "profile",
        component: UserProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "edit-profile",
        component: EditProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "my-clubs",
        component: OwnerClubsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "clubs",
        component: ClubsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "my-club-join-requests",
        component: MyClubJoinRequestsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "club-join-request-management/:clubId",
        component: ClubJoinRequestManagementComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tourist-equipment-selection",
        component: TouristEquipmentSelectionComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "club-members-management/:clubId",
        component: ClubMembersManagementComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "my-club-invitations",
        component: MyClubInvitationsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "club-members-invite-form",
        component: ClubMembersManagementComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour-preference",
        component: TourPreferencesComponent,
    },
    {
        path: "tour-preference/tour-preference-form",
        component: TourPreferenceFormComponent,
    },
    {
        path: "problem/problem-comment",
        component: ProblemAnswerComponent,
    },
    {
        path: "public-requests",
        component: RequestViewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "notification-tabs",
        component: NotificationTabsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour-search",
        component: TourSearchComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "public-requests",
        component: RequestViewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour-card",
        component: TourCardViewComponent,
    },
    { path: "tour-details/:tourId", component: TourDetailsComponent },
    {
        path: "active-encounters",
        component: ActiveEncounterViewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tourists-tour",
        component: TouristsTourComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour/:id/tourists-key-points",
        component: TouristsKeyPointsComponent,
        canActivate: [AuthGuard],
    },
    {
        path:"tourists-tour/equipment/:id",
        component: TouristsEquipmentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour/:tourId",
        component: TourPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "payment-history",
        component: PaymentHistoryComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "coupons",
        component: CouponsViewComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
