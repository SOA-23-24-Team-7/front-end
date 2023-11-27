import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveEncounterViewComponent } from './active-encounter-view/active-encounter-view.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ActiveEncounterViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EncounterModule { }
