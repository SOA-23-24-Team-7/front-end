import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "src/app/feature-modules/layout/home/home.component";
import { LoginComponent } from "../auth/login/login.component";
import { EquipmentComponent } from "src/app/feature-modules/administration/equipment/equipment.component";
import { TourPreferencesComponent } from "src/app/feature-modules/marketplace/tour-preferences/tour-preferences.component";
import { TourPreferenceFormComponent } from "src/app/feature-modules/marketplace/tour-preference-form/tour-preference-form.component";
import { AuthGuard } from "../auth/auth.guard";
import { RegistrationComponent } from "../auth/registration/registration.component";
import { CreateBlogComponent } from "../../feature-modules/blog/create-blog/create-blog.component";
import { BlogsComponent } from "src/app/feature-modules/blog/blogs/blogs.component";
import { BlogComponent } from "src/app/feature-modules/blog/blog/blog.component";
import { UsersOverviewComponent } from "src/app/feature-modules/administration/users-overview/users-overview.component";
import { UserProfileComponent } from "src/app/feature-modules/stakeholder/user-profile/user-profile.component";
import { RatingComponent } from "src/app/feature-modules/administration/rating/rating.component";
import { RatingFormComponent } from "src/app/feature-modules/marketplace/rating-form/rating-form.component";
import { ReviewComponent } from "src/app/feature-modules/marketplace/review/review.component";
import { ProblemComponent } from "src/app/feature-modules/marketplace/problem/problem.component";
import { ProblemViewComponent } from "src/app/feature-modules/administration/problem-view/problem-view.component";
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
import { UpdateBlogFormComponent } from "src/app/feature-modules/blog/update-blog-form/update-blog-form.component";
import { UserNotificationsComponent } from "src/app/feature-modules/stakeholder/user-notifications/user-notifications.component";

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
    { path: "create-blog", component: CreateBlogComponent },
    { path: "update-blog/:id", component: UpdateBlogFormComponent },

    { path: "", component: HomeComponent },
    {
        path: "equipment",
        component: EquipmentComponent,
        canActivate: [AuthGuard],
    },
    { path: "ratings", component: RatingComponent, canActivate: [AuthGuard] },
    {
        path: "rating-form",
        component: RatingFormComponent,
        canActivate: [AuthGuard],
    },
    { path: "review", component: ReviewComponent, canActivate: [AuthGuard] },
    { path: "problem", component: ProblemComponent, canActivate: [AuthGuard] },
    {
        path: "problems",
        component: ProblemViewComponent,
        canActivate: [AuthGuard],
    },
    { path: "tours", component: TourComponent, canActivate: [AuthGuard] },
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
        path: "user-management",
        component: UsersOverviewComponent,
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
    { path: "clubs", component: ClubsComponent, canActivate: [AuthGuard] },
    { path: "blogs", component: BlogsComponent },
    { path: "blog/:blogId", component: BlogComponent },
    {
        path: "profile",
        component: UserProfileComponent,
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
