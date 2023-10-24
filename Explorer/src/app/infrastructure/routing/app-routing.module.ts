import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "src/app/feature-modules/layout/home/home.component";
import { LoginComponent } from "../auth/login/login.component";
import { EquipmentComponent } from "src/app/feature-modules/administration/equipment/equipment.component";
import { AuthGuard } from "../auth/auth.guard";
import { RegistrationComponent } from "../auth/registration/registration.component";
import { UsersOverviewComponent } from "src/app/feature-modules/administration/users-overview/users-overview.component";
import {UserProfileComponent} from 'src/app/feature-modules/stakeholder/user-profile/user-profile.component';
import { RatingComponent } from "src/app/feature-modules/administration/rating/rating.component";
import { RatingFormComponent } from "src/app/feature-modules/marketplace/rating-form/rating-form.component";
import { ReviewComponent } from "src/app/feature-modules/marketplace/review/review.component";
import { ProblemComponent } from "src/app/feature-modules/marketplace/problem/problem.component";
import { ProblemViewComponent } from "src/app/feature-modules/administration/problem-view/problem-view.component";
import { TourComponent } from "src/app/feature-modules/tour-authoring/tour/tour.component";
import { TourEquipmentFormComponent } from "src/app/feature-modules/tour-authoring/tour-equipment-form/tour-equipment-form.component";
import {EditProfileComponent} from "../../feature-modules/stakeholder/edit-profile/edit-profile.component";

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegistrationComponent },
    {
        path: "equipment",
        component: EquipmentComponent,
        canActivate: [AuthGuard],
    },
    { path: "ratings", component: RatingComponent, canActivate: [AuthGuard] },
    {
        path: "ratingForm",
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
        path: "usersOverview",
        component: UsersOverviewComponent,
        canActivate: [AuthGuard],
    },
    {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard],}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
