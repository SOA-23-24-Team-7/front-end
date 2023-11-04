import { Component, OnInit } from "@angular/core";
import { Follower } from "../model/follower";
import { StakeholderService } from "../stakeholder.service";
import { FaProps } from "@fortawesome/angular-fontawesome";
import { PagedResults } from "src/app/shared/model/paged-results.model";

@Component({
    selector: "xp-followers",
    templateUrl: "./followers.component.html",
    styleUrls: ["./followers.component.css"],
})
export class FollowersComponent implements OnInit {
    followers: Follower[] = [];

    constructor(private service: StakeholderService) {}

    ngOnInit(): void {
        this.getFollowers();
    }

    getFollowers(): void {
        this.service.getFollowers().subscribe({
            next: (result: PagedResults<Follower>) => {
                this.followers = result.results;
            },
            error: () => {},
        });
    }
}
