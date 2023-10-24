import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { ProblemComponent } from 'src/app/feature-modules/marketplace/problem/problem.component';
import { ProblemViewComponent } from 'src/app/feature-modules/administration/problem-view/problem-view.component';
import { TourComponent } from 'src/app/feature-modules/tour-authoring/tour/tour.component';
import { TourEquipmentFormComponent } from 'src/app/feature-modules/tour-authoring/tour-equipment-form/tour-equipment-form.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard],},
  {path: 'problem', component: ProblemComponent, canActivate: [AuthGuard],},
  {path: 'problems', component: ProblemViewComponent, canActivate: [AuthGuard],}
  

  {path: 'tours', component: TourComponent, canActivate: [AuthGuard],},
  {path: 'tours/equipment/:id', component: TourEquipmentFormComponent, canActivate: [AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
