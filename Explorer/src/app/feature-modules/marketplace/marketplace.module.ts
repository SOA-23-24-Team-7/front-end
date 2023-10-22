import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPreferencesComponent } from './tour-preferences/tour-preferences.component';
import { TourPreferenceFormComponent } from './tour-preference-form/tour-preference-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TourPreferencesComponent,
    TourPreferenceFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserModule,
    TagInputModule, 
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [
    TourPreferencesComponent,
    TourPreferenceFormComponent
  ]
})
export class MarketplaceModule { }
