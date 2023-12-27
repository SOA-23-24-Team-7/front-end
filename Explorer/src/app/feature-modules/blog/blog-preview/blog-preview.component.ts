import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Blog } from "../model/blog.model";
import {
    faCircleUp,
    faCircleDown,
    faComment,
    faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faShareNodes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Vote, VoteType } from "../model/vote.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { marked } from "marked";
import * as DOMPurify from "dompurify";
import { Router } from "@angular/router";
import { BlogService } from "../blog.service";

@Component({
    selector: "xp-blog-preview",
    templateUrl: "./blog-preview.component.html",
    styleUrls: ["./blog-preview.component.css"],
})
export class BlogPreviewComponent implements OnInit {
    constructor(private router: Router, private service: BlogService) {}

    @Input() blog: Blog;
    @Input() vote: Vote | undefined;
    @Input() user: User | undefined;
    @Output() upvote: EventEmitter<number> = new EventEmitter();
    @Output() downvote: EventEmitter<number> = new EventEmitter();
    @Output() publish: EventEmitter<Blog> = new EventEmitter();
    @Output() delete: EventEmitter<number> = new EventEmitter();

    VoteType = VoteType;
    blogMarkdown: string;
    visibleDelete: boolean;
    statusTag: string;

    faCircleUp = faCircleUp;
    faCircleDown = faCircleDown;
    faComment = faComment;
    faShareFromSquare = faShareFromSquare;
    faShareNodes = faShareNodes;
    faTrash = faTrash;
    faPen = faPen;

    ngOnInit(): void {
        const md = marked.setOptions({});
        this.setTag();
        this.blogMarkdown = DOMPurify.sanitize(md.parse(this.blog.description));
        if (this.router.url === "/my-blogs") this.visibleDelete = true;
        else this.visibleDelete = false;
    }

    onUpVote(e: Event) {
        e.stopPropagation();
        if (!this.user || this.blog.status == 2) {
            return;
        }
        this.upvote.emit(this.blog.id);
        this.handleVoteChange(VoteType.UPVOTE);
        this.setBlogStatus();
    }

    onDownVote(e: Event) {
        e.stopPropagation();
        if (!this.user || this.blog.status == 2) {
            return;
        }
        this.downvote.emit(this.blog.id);
        this.handleVoteChange(VoteType.DOWNVOTE);
        this.setBlogStatus();
    }

    shareBlog(e: Event) {
        e.stopPropagation();
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

    setBlogStatus() {
        if (this.blog.voteCount < -2) {
            this.blog.status = 2;
        } else if (this.blog.voteCount >= 3 && this.blog.comments.length >= 3) {
            this.blog.status = 4;
        } else if (this.blog.voteCount >= 2 && this.blog.comments.length >= 2) {
            this.blog.status = 3;
        } else {
            this.blog.status = 1;
        }
        this.setTag();
    }

    publishBlog(e: Event) {
        e.stopPropagation();
        this.publish.emit(this.blog);
    }

    deleteBlog(e: Event) {
        e.stopPropagation();
        this.delete.emit(this.blog.id);
    }

    setTag() {
        switch (this.blog.status) {
            case 0:
                this.statusTag = "✏️ Draft";
                break;
            case 1:
                this.statusTag = "";
                break;
            case 2:
                this.statusTag = "🚫 Closed";
                break;
            case 3:
                this.statusTag = "🔥 Active";
                break;
            case 4:
                this.statusTag = "✨ Famous";
                break;
        }
    }
}
