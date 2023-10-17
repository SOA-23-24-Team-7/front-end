import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingFormComponent } from './rating-form/rating-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../layout/home/home.component';




@NgModule({
  declarations: [
    RatingFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,  ],
  exports: [
    RatingFormComponent
  ]
})
export class MarketplaceModule { }
