import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerClubsComponent } from './owner-clubs/owner-clubs.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClubsComponent } from './clubs/clubs.component';


@NgModule({
  declarations: [
    OwnerClubsComponent,
    ClubFormComponent,
    ClubsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MarketplaceModule { }
