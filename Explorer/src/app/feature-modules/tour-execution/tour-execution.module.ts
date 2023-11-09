import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasedToursComponent } from './purchased-tour-cards/purchased-tour-cards.component';
import { PurchasedTourCardComponent } from './purchased-tour-card/purchased-tour-card.component';



@NgModule({
  declarations: [
    PurchasedToursComponent,
    PurchasedTourCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TourExecutionModule { }
