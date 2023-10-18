import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPreferencesComponent } from './tour-preferences/tour-preferences.component';
import { TourPreferenceFormComponent } from './tour-preference-form/tour-preference-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TourPreferencesComponent,
    TourPreferenceFormComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    TourPreferencesComponent,
    TourPreferenceFormComponent
  ]
})
export class MarketplaceModule { }
