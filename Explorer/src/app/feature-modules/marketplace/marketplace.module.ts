import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from './problem/problem.component';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProblemComponent,
    ProblemFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ProblemComponent
  ]
})
export class MarketplaceModule { }
