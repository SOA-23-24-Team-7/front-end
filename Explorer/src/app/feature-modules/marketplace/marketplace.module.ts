import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerClubsComponent } from './owner-clubs/owner-clubs.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClubsComponent } from './clubs/clubs.component';
import { MyClubJoinRequestsComponent } from './my-club-join-requests/my-club-join-my-club-join-requests.component';


@NgModule({
  declarations: [
    OwnerClubsComponent,
    ClubFormComponent,
    ClubsComponent,
    MyClubJoinRequestsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MarketplaceModule { }
