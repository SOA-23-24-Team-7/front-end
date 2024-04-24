import { Component, Inject, OnInit } from "@angular/core";
import { Follower } from "../model/follower.model";
import { Following } from "../model/following.model";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { MessageDialogComponent } from "../message-dialog/message-dialog/message-dialog.component";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { StakeholderService } from "../stakeholder.service";
import { FollowerCreate } from "../model/follower-create.model";
export interface ModalData {
    followers: Follower[];
    followings: Following[];
    showFollowers: boolean;
    showFollowings: boolean;
    user: User;
    followingsCount: number;
}
@Component({
    selector: "xp-follow-dialog",
    templateUrl: "./follow-dialog.component.html",
    styleUrls: ["./follow-dialog.component.css"],
})
export class FollowDialogComponent implements OnInit {
    userId: number;
    followers: Follower[] = [];
    followings: Following[] = [];
    showFollowers: boolean = false;
    showFollowings: boolean = false;
    f: FollowerCreate;
    constructor(
        private service: StakeholderService,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: ModalData,
    ) {}

    ngOnInit(): void {
        this.followers = this.data.followers;
        this.followings = this.data.followings;
        this.showFollowers = this.data.showFollowers;
        this.showFollowings = this.data.showFollowings;
        this.userId = this.data.user.id;
    }

    unfollowOrFollow(id: number): void {
        console.log(id);
        var clicked = this.followings.find(f => f.id == id);
        const followCreate: FollowerCreate = {
            followedById: id,
            userId: this.userId,
        };
        if (clicked != undefined) {
            if (clicked.followingStatus) {
                console.log("UNFOLLOWING USWER")
                this.service.deleteFollowing(followCreate).subscribe({
                    next: () => {
                        if (clicked != undefined) {
                            clicked.followingStatus = false;
                        }
                    },
                });
            } else {
                this.addFollowing(clicked);
            }
        }
    }
    addFollowing(following: Following): void {
        const followCreate: FollowerCreate = {
            followedById: this.userId,
            userId: following.following.id,
        };
        this.service.addFollowing(followCreate).subscribe({
            next: (result: FollowerCreate) => {
                console.log(result.id);
                if (result.id != undefined) {
                    following.id = result.id;
                }
                following.followingStatus = true;
            },
        });
    }
    removeOrFollow(id: number): void {
        var clicked = this.followers.find(f => f.id == id);
        const followCreate: FollowerCreate = {
            followedById: this.userId,
            userId: id,
        };
        if (clicked != undefined) {
            if (clicked.followingStatus) {
                this.service.deleteFollowing(followCreate).subscribe({
                    next: () => {
                        if (clicked != undefined) {
                            clicked.followingStatus = false;
                        }
                    },
                });
            } else {
                this.addFollower(id, clicked);
            }
        }
    }
    addFollower(id: number, follwer: Follower): void {
        const followCreate: FollowerCreate = {
            userId: this.userId,
            followedById: follwer.followedBy.id,
        };
        this.service.addFollowing(followCreate).subscribe({
            next: (result: FollowerCreate) => {
                console.log(result.id);
                if (result.id != undefined) {
                    follwer.id = result.id;
                }
                follwer.followingStatus = true;
            },
        });
    }
}
