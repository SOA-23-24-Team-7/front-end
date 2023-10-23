import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './tour/tour.component';
import { TourFormComponent } from './tour-form/tour-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TourEquipmentFormComponent } from './tour-equipment-form/tour-equipment-form.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TourComponent,
    TourFormComponent,
    TourEquipmentFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    TourComponent,
    TourFormComponent,
    TourEquipmentFormComponent
  ]
})
export class TourAuthoringModule { }
