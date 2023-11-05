import { Component, OnInit } from "@angular/core";
import { Comment } from "../model/comment.model";
import { Blog } from "../model/blog.model";
import { BlogService } from "../blog.service";
import { ActivatedRoute } from "@angular/router";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { MatDialog } from "@angular/material/dialog";
import { CommentFormComponent } from "../comment-form/comment-form.component";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { marked } from "marked";
import * as DOMPurify from "dompurify";

@Component({
    selector: "xp-blog",
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.css"],
})
export class BlogComponent implements OnInit {
    comments: Comment[] = [];
    blog: Blog;
    blogId: number;
    user: User | undefined;
    blogMarkdown: string;

    constructor(
        private authService: AuthService,
        private service: BlogService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });

        const param = this.route.snapshot.paramMap.get("blogId");
        if (param) {
            this.blogId = Number(param);
            this.getBlog();
            this.getComments();
        }
    }

    getBlog(): void {
        const md = marked.setOptions({});
        this.service.getBlog(this.blogId).subscribe({
            next: (result: Blog) => {
                this.blog = result;
                this.blogMarkdown = DOMPurify.sanitize(
                    md.parse(this.blog.description),
                );
            },
        });
    }

    getComments(): void {
        this.service.getComments(this.blogId).subscribe({
            next: (result: PagedResults<Comment>) => {
                this.comments = result.results;
            },
        });
    }

    onAddClicked(): void {
        const dialogRef = this.dialog.open(CommentFormComponent, {
            data: {
                blogId: this.blogId,
                user: this.user,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === undefined) return;
            this.comments.push(result.comment);
        });
    }

    onEditComment(editedComment: Comment): void {
        this.service.updateComment(editedComment).subscribe({
            next: (result: Comment) => {
                const updatedCommentIndex = this.comments.findIndex(
                    comment => comment.id === result.id,
                );
                if (updatedCommentIndex !== -1) {
                    this.comments[updatedCommentIndex] = result;
                }
            },
        });
    }

    onDeleteComment(deletedComment: Comment): void {
        if (deletedComment.id) {
            this.service.deleteComment(deletedComment.id).subscribe({
                next: () => {
                    this.comments = this.comments.filter(
                        comment => comment.id !== deletedComment.id,
                    );
                },
                error: error => {
                    console.error("Error deleting comment:", error);
                    // Handle error, e.g., display an error message
                },
            });
        } else {
            console.warn("Comment does not have an ID. Cannot delete.");
        }
    }
}
