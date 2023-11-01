import { Component, OnInit } from "@angular/core";
import { Blog } from "../model/blog.model";
import { BlogService } from "../blog.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Vote } from "../model/vote.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";

@Component({
    selector: "xp-blogs",
    templateUrl: "./blogs.component.html",
    styleUrls: ["./blogs.component.css"],
})
export class BlogsComponent implements OnInit {
    blogs: Blog[] = [];
    votes: Vote[] = [];
    user: User | undefined;

    constructor(
        private service: BlogService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        this.getBlogs();
        this.getVotedBlogs();
    }

    getBlogs(): void {
        this.service.getBlogs().subscribe({
            next: (result: PagedResults<Blog>) => {
                this.blogs = result.results;
            },
            error: () => {},
        });
    }

    getVotedBlogs(): void {
        if (!this.user) {
            return;
        }
        this.service.getVotedBlogs(this.user?.id).subscribe({
            next: (result: PagedResults<Vote>) => {
                this.votes = result.results;
            },
            error: () => {},
        });
    }

    getVote(blog: Blog): Vote | undefined {
        return this.votes.find(x => x.blogId == blog.id);
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
