import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AuthService } from "../auth.service";

@Component({
    selector: "xp-reset-password-edit",
    templateUrl: "./reset-password-edit.component.html",
    styleUrls: ["./reset-password-edit.component.css"],
})
export class ResetPasswordEditComponent implements OnInit {
    errors: any;
    token: string = "";

    newPasswordForm = new FormGroup({
        newPassword: new FormControl("", [Validators.required]),
        repeatedPassword: new FormControl("", [Validators.required]),
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private notifier: NotifierService,
        private route: ActivatedRoute,
    ) {
        this.errors = {
            newPassword: "",
            repeatedPassword: "",
        };
    }

    ngOnInit(): void {
        if (!this.isTokenValid()) {
            this.router.navigate(["/"]);
            this.notifier.notify("error", "Token not valid/expired.");
        }
        this.extractToken();
    }

    isTokenValid(): boolean {
        // TODO: check if token is valid
        return true;
    }

    extractToken() {
        this.token = this.route.snapshot.queryParams["reset_password_token"];
    }

    resetPassword(newPassword: string): void {
        this.authService
            .resetPassword(this.token, newPassword)
            .subscribe(() => {
                this.notifier.notify("success", "Password reset successful!");
                this.router.navigate(["/"]);
            });
    }

    onClick() {
        this.resetErrors();
        let newPassword = this.newPasswordForm.value.newPassword || "";
        let repeatedPassword =
            this.newPasswordForm.value.repeatedPassword || "";
        if (this.validate(newPassword, repeatedPassword)) {
            this.resetPassword(newPassword);
        }
    }

    validate(newPassword: string, repeatedPassword: string) {
        if (newPassword === "" || repeatedPassword === "") {
            this.errors.newPassword = "Passwords cannot be empty.";
            return false;
        }
        if (newPassword != repeatedPassword) {
            this.errors.newPassword = "Passwords are not the same.";
            return false;
        }

        return true;
    }

    resetErrors() {
        this.errors.newPassword = "";
        this.errors.repeatedPassword = "";
    }
}
