import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Person } from "../model/person.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { Router } from "@angular/router";
import { Follower } from "../model/follower";
import { MatDialog } from "@angular/material/dialog";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { Following } from "../model/following";
import { FollowDialogComponent } from "../follow-dialog/follow-dialog.component";
import { StakeholderService } from "../stakeholder.service";

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
    followersCount: number;
    followings: Following[] = [];
    followingsCount: number;
    showFollowers: boolean = false;
    showFollowings: boolean = false;

    constructor(
        private authService: AuthService,
        private service: StakeholderService,
        private router: Router,
        public dialog: MatDialog,
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
                this.followersCount = this.followers.length;
            });
            this.service.getFollowings().subscribe(result => {
                this.followings = result.results;
                this.followingsCount = this.followings.length;
            });
        });
    }
    openFollowersDialog(): void {
        const dialogRef = this.dialog.open(FollowDialogComponent, {
            data: {
                followers: this.followers,
                followings: this.followings,
                showFollowers: true,
                showFollowings: false,
                user: this.user,
            },
        });
    }
    openFollowingsDialog(): void {
        const dialogRef = this.dialog.open(FollowDialogComponent, {
            data: {
                followers: this.followers,
                followings: this.followings,
                showFollowers: false,
                showFollowings: true,
                user: this.user,
            },
        });
    }
    goToAllNotifications(): void {
        this.router.navigate(["/user-notifications"]);
    }
}
