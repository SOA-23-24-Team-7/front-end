import { Component, Input, OnInit } from "@angular/core";
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
import { Vote, VoteType } from "../model/vote.model";
import { faCircleUp, faCircleDown } from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: "xp-blog",
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.css"],
})
export class BlogComponent implements OnInit {
    @Input() vote: Vote | undefined;

    comments: Comment[] = [];
    blog: Blog;
    blogId: number;
    user: User | undefined;
    blogMarkdown: string;

    VoteType = VoteType;
    faCircleUp = faCircleUp;
    faCircleDown = faCircleDown;

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
                this.vote = this.getVote();
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

    onCommentCreated(newComment: Comment): void {
        this.comments.push(newComment);
        this.getComments();
    }

    onAddClicked(): void {
        const dialogRef = this.dialog.open(CommentFormComponent, {
            data: {
                blogId: this.blogId,
                user: this.user,
            },
        });

        dialogRef.componentInstance.commentCreated.subscribe(
            (newComment: Comment) => {
                this.onCommentCreated(newComment);
            },
        );
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

    getVote(): Vote | undefined {
        return this.blog.votes.find(x => x.userId == this.user?.id);
    }

    onUpVote(e: Event) {
        if (!this.user) {
            return;
        }
        this.handleVoteChange(VoteType.UPVOTE);
        this.service.upVoteBlog(this.blog.id).subscribe({
            next: (result: any) => {
                //unblock voting
            },
            error: () => {
                //undo front end vote
            },
        });
    }

    onDownVote(e: Event) {
        if (!this.user) {
            return;
        }
        this.handleVoteChange(VoteType.DOWNVOTE);
        this.service.downVoteBlog(this.blog.id).subscribe({
            next: (result: any) => {
                //unblock voting
            },
            error: () => {
                //undo front end vote
            },
        });
    }

    handleVoteChange(voteType: VoteType) {
        if (!this.vote) {
            this.vote = {
                userId: this.user!.id,
                blogId: this.blog.id,
                voteType: voteType,
            };

            if (this.vote.voteType == VoteType.UPVOTE) this.blog.voteCount++;
            else this.blog.voteCount--;
            return;
        }

        if (this.vote.voteType == voteType) {
            if (voteType == VoteType.UPVOTE) this.blog.voteCount--;
            else this.blog.voteCount++;
            this.vote.voteType = undefined;
        } else {
            if (voteType == VoteType.UPVOTE) this.blog.voteCount++;
            else this.blog.voteCount--;

            if (this.vote.voteType == VoteType.UPVOTE) this.blog.voteCount--;
            else if (this.vote.voteType == VoteType.DOWNVOTE)
                this.blog.voteCount++;
            this.vote.voteType = voteType;
        }
    }
}
