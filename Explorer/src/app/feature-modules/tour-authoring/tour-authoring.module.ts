import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilitiesComponent } from './facilities/facilities.component';
import { FacilitiesFormComponent } from './facilities-form/facilities-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FacilitiesComponent,
    FacilitiesFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    FacilitiesComponent,
    FacilitiesFormComponent
  ]
})
export class TourAuthoringModule { }
