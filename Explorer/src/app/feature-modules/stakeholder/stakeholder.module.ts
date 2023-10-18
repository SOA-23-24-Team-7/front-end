import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [UserProfileComponent],
})
export class StakeholderModule {}
