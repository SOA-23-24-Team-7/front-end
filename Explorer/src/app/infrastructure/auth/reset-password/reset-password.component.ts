import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AuthService } from "../auth.service";

@Component({
    selector: "xp-reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent {
    errors: any;

    resetPasswordForm = new FormGroup({
        email: new FormControl("", [Validators.required]),
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private notifier: NotifierService,
    ) {
        this.errors = {
            email: "",
        };
    }

    onClick() {
        this.resetErrors();
        let email = this.resetPasswordForm.value.email || "";
        if (this.validate(email)) {
            this.authService.generateResetPasswordToken(email).subscribe(
                result => {
                    console.log(result);
                    this.router.navigate(["/"]);
                    this.notifier.notify(
                        "success",
                        "You will receive a password recovery link at your email address shortly.",
                    );
                },
                error => {
                    // Handle the error here
                    console.error("Error occurred:", error);
                    // You can show an error notification or handle the error in other ways
                    this.notifier.notify(
                        "error",
                        "Your email doesn't exist in our database.",
                    );
                },
            );
        }
    }

    validate(email: string) {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            this.errors.email = "Not a valid email address.";
            return false;
        }

        return true;
    }

    resetErrors() {
        this.errors.email = "";
    }
}
