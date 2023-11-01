import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouristPositionSimulatorComponent } from './tourist-position-simulator/tourist-position-simulator.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TouristPositionSimulatorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TourExecutionModule { }
