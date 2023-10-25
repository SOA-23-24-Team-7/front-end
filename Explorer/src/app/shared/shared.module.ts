import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyPointMapComponent } from './map/key-point-map.component';

@NgModule({
  declarations: [KeyPointMapComponent],
  imports: [CommonModule],
  exports: [KeyPointMapComponent],
})
export class SharedModule {}
