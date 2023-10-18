import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { OwnerClubsComponent } from 'src/app/feature-modules/marketplace/owner-clubs/owner-clubs.component';
import { ClubsComponent } from 'src/app/feature-modules/marketplace/clubs/clubs.component';
import { MyClubJoinRequestsComponent } from 'src/app/feature-modules/marketplace/my-club-join-requests/my-club-join-my-club-join-requests.component';
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard],},
  {path: 'ownerclubs', component: OwnerClubsComponent, canActivate: [AuthGuard]},
  {path: 'clubs', component: ClubsComponent, canActivate: [AuthGuard]},
  {path: 'clubs', component: ClubsComponent, canActivate: [AuthGuard]},
  {path: 'my-club-join-requests', component: MyClubJoinRequestsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
