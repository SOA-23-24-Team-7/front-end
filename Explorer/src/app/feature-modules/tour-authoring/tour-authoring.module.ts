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
import {RouterModule} from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TourComponent,
    TourFormComponent,
    KeyPointsComponent,
    KeyPointFormComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule, SharedModule],
  exports: [
    TourComponent,
    TourFormComponent,
    MatCardModule,
    MatButtonModule,
    KeyPointsComponent,
    KeyPointFormComponent,
  ],
})
export class TourAuthoringModule {}
