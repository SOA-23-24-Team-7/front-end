import { Component, OnInit } from "@angular/core";
import { Person } from "../model/person.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { Router } from "@angular/router";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { StakeholderService } from "../stakeholder.service";
@Component({
    selector: "xp-edit-profile",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.css"],
})
export class EditProfileComponent implements OnInit {
    person: Person;
    user: User;

    constructor(
        private service: StakeholderService,
        private router: Router,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
            this.service
                .getByUserId(this.user.id)
                .subscribe((result: Person) => {
                    this.person = result;
                });
        });
    }

    editProfile() {
        this.service.updatePerson(this.person).subscribe(result => {
            console.log("Profile updated:", result);
            this.router.navigate(["/profile"]);
        });
    }
}
