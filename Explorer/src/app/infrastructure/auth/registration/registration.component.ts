import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Registration } from '../model/registration.model';
import { AuthService } from '../auth.service';
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { LoginComponent } from "src/app/infrastructure/auth/login/login.component";

@Component({
  selector: 'xp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  isPasswordVisible: boolean;

  constructor(
    private authService: AuthService,
    public dialog: MatDialogRef<RegistrationComponent>,
    public dialogRef: MatDialog
  ) {
    this.isPasswordVisible = false;
  }

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  register(): void {
    const registration: Registration = {
      name: this.registrationForm.value.name || "",
      surname: this.registrationForm.value.surname || "",
      email: this.registrationForm.value.email || "",
      username: this.registrationForm.value.username || "",
      password: this.registrationForm.value.password || "",
    };

    if (this.registrationForm.valid) {
      this.authService.register(registration).subscribe({
        next: () => {
          this.onClose();
        },
      });
    }
  }

  onClose() : void {
    this.dialog.close();
  }

  onLogin(): void {
    this.onClose();
    this.dialogRef.open(LoginComponent);
}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  faXmark = faXmark;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
}
