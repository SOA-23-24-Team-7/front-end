import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";

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

    constructor(private router: Router, private notifier: NotifierService) {
        this.errors = {
            email: "",
        };
    }

    onClick() {
        let email = this.resetPasswordForm.value.email || "";
        if (this.validate(email)) {
            this.router.navigate(["/"]);
            this.notifier.notify(
                "success",
                "If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.",
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
}
