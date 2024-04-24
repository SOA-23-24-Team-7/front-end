import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UserFollow } from "../model/user-follow.model";
import { StakeholderService } from "../stakeholder.service";
import { Following } from "../model/following.model";
import { FollowerCreate } from "../model/follower-create.model";
export interface ModalData {
    userId: number;
}
@Component({
    selector: "xp-follower-search-dialog",
    templateUrl: "./follower-search-dialog.component.html",
    styleUrls: ["./follower-search-dialog.component.css"],
})
export class FollowerSearchDialogComponent implements OnInit {
    userId: number;
    faSearch = faSearch;
    users: UserFollow[] = [];
    followings: Following[] = [];
    searchUsername: string;
    constructor(
        private service: StakeholderService,
        @Inject(MAT_DIALOG_DATA) public data: ModalData,
    ) {}

    ngOnInit(): void {
        this.userId = this.data.userId;
        this.loadFollowings();
    }
    loadFollowings() {
        this.service.getFollowings(this.userId).subscribe(result => {
            this.followings = result;
        });
    }
    follow(id: number) {
        var clicked = this.users.find(u => u.id == id);
        if (clicked != undefined) {
            const followCreate: FollowerCreate = {
                userId: clicked.id,
                followedById: this.userId,
            };
            this.service.addFollowing(followCreate).subscribe({
                next: (result: FollowerCreate) => {
                    if (clicked != undefined) {
                        clicked.followingStatus = true;
                        this.loadFollowings();
                    }
                },
            });
        }
    }
    search() {
        this.service.getSearched(this.searchUsername).subscribe(result => {
            this.users = result.results;
            this.users.forEach(user => {
                if (this.followings.some(f => user.id === f.following.id)) {
                    user.followingStatus = true;
                } else {
                    user.followingStatus = false;
                }
            });
        });
    }
}
