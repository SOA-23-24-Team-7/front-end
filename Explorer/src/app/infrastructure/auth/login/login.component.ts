import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Login } from '../model/login.model';
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { RegistrationComponent } from "src/app/infrastructure/auth/registration/registration.component";

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isPasswordVisible: boolean;

  constructor(
    private authService: AuthService,
    public dialog: MatDialogRef<LoginComponent>,
    public dialogRef: MatDialog
  ) {
    this.isPasswordVisible = false;
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    const login: Login = {
      username: this.loginForm.value.username || "",
      password: this.loginForm.value.password || "",
    };

    if (this.loginForm.valid) {
      this.authService.login(login).subscribe({
        next: () => {
          this.onClose();
        },
      });
    }
  }

  onRegister(): void {
    this.onClose();
    this.dialogRef.open(RegistrationComponent);
  }

  onClose(): void {
    this.dialog.close();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  faXmark = faXmark;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
}
