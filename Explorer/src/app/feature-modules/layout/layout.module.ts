import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { TourCardsComponent } from './tour-cards/tour-cards.component';
import { BlogCardsComponent } from './blog-cards/blog-cards.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    TourCardsComponent,
    BlogCardsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    HomeComponent
  ]
})
export class LayoutModule { }
