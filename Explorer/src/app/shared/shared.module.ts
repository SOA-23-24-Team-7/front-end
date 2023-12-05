import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TagComponent } from "./tag/tag.component";
import { TourCardViewComponent } from './tour-card-view/tour-card-view.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PositionSimulatorComponent } from './position-simulator/position-simulator.component';

@NgModule({
  declarations: [MapComponent, TourCardViewComponent, TagComponent, PositionSimulatorComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [MapComponent, TourCardViewComponent, TagComponent],

})
export class SharedModule {}
