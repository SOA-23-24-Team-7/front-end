import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './tour/tour.component';
import { TourFormComponent } from './tour-form/tour-form.component';
import { KeyPointsComponent } from './key-points/key-points.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyPointFormComponent } from './key-point-form/key-point-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FacilitiesComponent } from './facilities/facilities.component';
import { FacilitiesFormComponent } from './facilities-form/facilities-form.component';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { TourEquipmentFormComponent } from './tour-equipment-form/tour-equipment-form.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    TourComponent,
    TourFormComponent,
    KeyPointsComponent,
    KeyPointFormComponent,
    FacilitiesFormComponent,
    FacilitiesComponent,
    TourEquipmentFormComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule, 
    ReactiveFormsModule,
    MatSelectModule,
    SharedModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    TourComponent,
    TourFormComponent,
    MatCardModule,
    MatButtonModule,
    KeyPointsComponent,
    KeyPointFormComponent,
    FacilitiesComponent,
    FacilitiesFormComponent,
    TourEquipmentFormComponent
  ]
})
export class TourAuthoringModule {}
