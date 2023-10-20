import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, NavbarComponent],
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule],
  exports: [NavbarComponent, HomeComponent],
})
export class LayoutModule {}
