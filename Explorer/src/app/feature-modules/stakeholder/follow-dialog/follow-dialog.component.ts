import { Component, Inject, OnInit } from "@angular/core";
import { Follower } from "../model/follower";
import { Following } from "../model/following";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { MessageDialogComponent } from "../message-dialog/message-dialog/message-dialog.component";
export interface ModalData {
    followers: Follower[];
    followings: Following[];
    showFollowers: boolean;
    showFollowings: boolean;
    user: User;
}
@Component({
    selector: "xp-follow-dialog",
    templateUrl: "./follow-dialog.component.html",
    styleUrls: ["./follow-dialog.component.css"],
})
export class FollowDialogComponent implements OnInit {
    user: User;
    followers: Follower[] = [];
    followings: Following[] = [];
    showFollowers: boolean = false;
    showFollowings: boolean = false;
    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: ModalData,
    ) {}

    ngOnInit(): void {
        this.followers = this.data.followers;
        this.followings = this.data.followings;
        this.showFollowers = this.data.showFollowers;
        this.showFollowings = this.data.showFollowings;
        this.user = this.data.user;
    }

    openMessageDialog(reciverID: number): void {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            data: {
                user: this.user,
                reciverId: reciverID,
            },
        });
    }
}
