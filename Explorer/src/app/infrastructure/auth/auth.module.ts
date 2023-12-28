import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatDialogModule } from '@angular/material/dialog';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AppRoutingModule } from '../routing/app-routing.module';
import { ResetPasswordEditComponent } from './reset-password-edit/reset-password-edit.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    ResetPasswordEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatDialogModule,
    AppRoutingModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
