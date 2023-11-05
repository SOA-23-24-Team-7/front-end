import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Blog } from "../model/blog.model";
import {
    faCircleUp,
    faCircleDown,
    faComment,
    faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { Vote, VoteType } from "../model/vote.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { marked } from "marked";
import * as DOMPurify from "dompurify";

@Component({
    selector: "xp-blog-preview",
    templateUrl: "./blog-preview.component.html",
    styleUrls: ["./blog-preview.component.css"],
})
export class BlogPreviewComponent implements OnInit {
    @Input() blog: Blog;
    @Input() vote: Vote | undefined;
    @Input() user: User | undefined;
    @Output() upvote: EventEmitter<number> = new EventEmitter();
    @Output() downvote: EventEmitter<number> = new EventEmitter();

    VoteType = VoteType;
    blogMarkdown: string;

    faCircleUp = faCircleUp;
    faCircleDown = faCircleDown;
    faComment = faComment;
    faShareFromSquare = faShareFromSquare;

    ngOnInit(): void {
        const md = marked.setOptions({});
        this.blogMarkdown = DOMPurify.sanitize(md.parse(this.blog.description));
    }

    onUpVote(e: Event) {
        e.stopPropagation();
        if (!this.user) {
            return;
        }
        this.upvote.emit(this.blog.id);
        this.handleVoteChange(VoteType.UPVOTE);
    }

    onDownVote(e: Event) {
        e.stopPropagation();
        if (!this.user) {
            return;
        }
        this.downvote.emit(this.blog.id);
        this.handleVoteChange(VoteType.DOWNVOTE);
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
}
