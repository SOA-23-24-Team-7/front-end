import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { ProblemViewComponent } from './problem-view/problem-view.component';



@NgModule({
  declarations: [
    EquipmentFormComponent,
    EquipmentComponent,
    RatingComponent
    ProblemViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    EquipmentComponent,
    EquipmentFormComponent,
    RatingComponent
  ]
})
export class AdministrationModule { }
