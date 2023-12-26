import { Component, OnInit } from "@angular/core";
import { Blog } from "../model/blog.model";
import { BlogService } from "../blog.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Vote } from "../model/vote.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { Pipe, PipeTransform } from "@angular/core";
import { UpdateBlog } from "../model/blog-update.model";
import { Following } from "../../stakeholder/model/following.model";
import { StakeholderService } from "../../stakeholder/stakeholder.service";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
    selector: "xp-blogs",
    templateUrl: "./blogs.component.html",
    styleUrls: ["./blogs.component.css"],
    animations: [
        trigger("fadeIn", [
            transition(":enter", [
                style({ opacity: 0, transform: "translateX(-40px)" }),
                animate(
                    "0.5s ease",
                    style({ opacity: 1, transform: "translateX(0)" }),
                ),
            ]),
        ]),
    ],
})
export class BlogsComponent implements OnInit {
    blogs: Blog[] = [];
    user: User | undefined;
    followings: Following[] = [];
    selectedStatus: number = 5;

    constructor(
        private service: BlogService,
        private authService: AuthService,
        private serviceUsers: StakeholderService,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        this.loadFollowings();
        this.getBlogs();
    }

    loadFollowings(): void {
        this.serviceUsers
            .getFollowings(this.user?.id || 0)
            .subscribe(result => {
                this.followings = result.results;
            });
    }

    checkIfFollowing(authorId: number): any {
        var found = false;
        this.followings.forEach(function (value) {
            if (value.following.id == authorId) found = true;
        });
        return found;
    }

    removePrivates(): void {
        this.blogs = this.blogs.filter(
            b =>
                b.visibilityPolicy == 0 ||
                b.authorId == this.user?.id ||
                this.checkIfFollowing(b.authorId),
        );
    }

    filterByStatus(status: number) {
        this.getBlogs();
        this.selectedStatus = status;
    }

    getBlogs(): void {
        this.service.getBlogs().subscribe({
            next: (result: PagedResults<Blog>) => {
                this.blogs = result.results;
                this.removePrivates();
            },
            error: () => {},
        });
    }

    getVote(blog: Blog): Vote | undefined {
        return blog.votes.find(x => x.userId == this.user?.id);
    }

    upVoteBlog(blogId: number): void {
        this.service.upVoteBlog(blogId).subscribe({
            next: (result: any) => {
                //unblock voting
            },
            error: () => {
                //undo front end vote
            },
        });
    }

    downVoteBlog(blogId: number): void {
        this.service.downVoteBlog(blogId).subscribe({
            next: (result: any) => {
                //unblock voting
            },
            error: () => {
                //undo front end vote
            },
        });
    }
}
