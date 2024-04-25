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
    ) { }

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
            followedById: this.userId,
            userId: clicked!.following.id,
        };
        if (clicked!.followingStatus) {
            console.log("UNFOLLOWING USWER")
            this.service.deleteFollowing(followCreate).subscribe({
                next: () => {
                    clicked!.followingStatus = false;
                },
            });
        } else {
            const followCreate: FollowerCreate = {
                followedById: this.userId,
                userId: clicked!.following.id,
            };
            this.service.addFollowing(followCreate).subscribe({
                next: (result: FollowerCreate) => {
                    clicked!.followingStatus = true;
                },
            });
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
