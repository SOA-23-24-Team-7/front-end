import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasedToursComponent } from './purchased-tour-cards/purchased-tour-cards.component';
import { PurchasedTourCardComponent } from './purchased-tour-card/purchased-tour-card.component';
import { TouristPositionSimulatorComponent } from './tourist-position-simulator/tourist-position-simulator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TourExecutingComponent } from './tour-executing/tour-executing.component';
import { ClickedKeyPointComponent } from './clicked-key-point/clicked-key-point.component';
import { TourExecutionHistoryComponent } from './tour-execution-history/tour-execution-history.component';



@NgModule({
  declarations: [
    PurchasedToursComponent,
    PurchasedTourCardComponent,
    TouristPositionSimulatorComponent,
    TourExecutingComponent,
    ClickedKeyPointComponent,
    TourExecutionHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TourExecutionModule { }
