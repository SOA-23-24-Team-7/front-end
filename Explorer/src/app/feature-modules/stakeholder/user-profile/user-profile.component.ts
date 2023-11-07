import { Component, OnInit, ViewChild } from "@angular/core";
import { Person } from "../model/person.model";
import { StakeholderService } from "../stakeholder.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { Router } from "@angular/router";
import { Follower } from "../model/follower";
import { MessageDialogComponent } from "../message-dialog/message-dialog/message-dialog.component";

@Component({
    selector: "xp-user-profile",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
    editing = false;
    user: User;
    person: Person;
    followers: Follower[] = [];
    isDialogOpen: boolean = false;

    @ViewChild(MessageDialogComponent) messageDialog: MessageDialogComponent;

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
            this.user = user;
            if (!user.id) return;
            this.service.getByUserId(this.user.id).subscribe(result => {
                this.person = result;
            });
            this.service.getFollowers().subscribe(result => {
                this.followers = result.results;
            });
        });
    }

    openMessageDialog() {
        this.isDialogOpen = true;
    }

    closeMessageDialog() {
        this.isDialogOpen = false;
    }
}
