import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { KeyPointMapComponent } from './key-point-map/key-point-map.component';

@NgModule({
  declarations: [MapComponent, KeyPointMapComponent],
  imports: [CommonModule],
  exports: [MapComponent, KeyPointMapComponent],
})
export class SharedModule {}
