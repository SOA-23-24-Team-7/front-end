import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { TouristEquipmentSelectionComponent } from './tourist-equipment-selection/tourist-equipment-selection.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    TouristEquipmentSelectionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    TouristEquipmentSelectionComponent
  ]
})
export class LayoutModule { }
