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

@NgModule({
  declarations: [
    TourComponent,
    TourFormComponent,
    KeyPointsComponent,
    KeyPointFormComponent,
    FacilitiesFormComponent,
    FacilitiesComponent,
  ],
  imports: [
    CommonModule, 
    MaterialModule, 
    ReactiveFormsModule,
    MatSelectModule
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
  ],
})
export class TourAuthoringModule {}
