import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { RouterModule } from '@angular/router';
import { ReviewFormComponent } from './review-form/review-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProblemComponent } from './problem/problem.component';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReviewComponent,
    ReviewFormComponent,
    ProblemComponent,
    ProblemFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReviewComponent,
    ReactiveFormsModule,
    ProblemComponent
  ]
})
export class MarketplaceModule { }
