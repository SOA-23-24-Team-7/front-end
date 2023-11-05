import { Component, OnInit } from "@angular/core";
import { Blog } from "../model/blog.model";
import { BlogService } from "../blog.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Vote } from "../model/vote.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { Pipe, PipeTransform } from '@angular/core';

@Component({
    selector: "xp-blogs",
    templateUrl: "./blogs.component.html",
    styleUrls: ["./blogs.component.css"],
})
export class BlogsComponent implements OnInit {
    blogs: Blog[] = [];
    user: User | undefined;
    selectedStatus: number = 5;

    constructor(
        private service: BlogService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        this.getBlogs();
    }

    filterByStatus(status: number) {
        this.selectedStatus = status;
        console.log(this.selectedStatus)
    }

    getBlogs(): void {
        this.service.getBlogs().subscribe({
            next: (result: PagedResults<Blog>) => {
                this.blogs = result.results;
                console.log(this.blogs)
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
