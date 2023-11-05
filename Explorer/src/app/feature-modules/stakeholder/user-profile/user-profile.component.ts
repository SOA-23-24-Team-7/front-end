import { Component, OnInit } from "@angular/core";
import { StakeholderService } from "../stakeholder.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { Router } from "@angular/router";
import { Person } from "../model/person.model";

@Component({
    selector: "xp-user-profile",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
    editing = false;
    person: Person;

    constructor(
        private authService: AuthService,
        private service: StakeholderService,
        private router: Router,
    ) {}

    toggleEditing() {
        this.router.navigate(["/edit-profile"]);
    }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            if (user.id != 0)
                this.service.getByUserId(user.id).subscribe(result => {
                    this.person = result;
                });
        });
    }
}
