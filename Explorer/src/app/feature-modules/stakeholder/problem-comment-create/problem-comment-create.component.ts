import { Component, Input, OnInit } from "@angular/core";
import { StakeholderService } from "../stakeholder.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { ProblemUser } from "../../marketplace/model/problem-with-user.model";
import { ProblemAnswer } from "../model/problem-answer.model";
import { Output, EventEmitter } from "@angular/core";
import { ProblemComment } from "../model/problem-comment.model";
import { ProblemCommentCreate } from "../model/problem-comment-create.model";

@Component({
    selector: "xp-problem-comment-create",
    templateUrl: "./problem-comment-create.component.html",
    styleUrls: ["./problem-comment-create.component.css"],
})
export class ProblemCommentCreateComponent implements OnInit {
    @Input() problem: ProblemUser;
    @Output() onAddAnswer = new EventEmitter<string>();
    @Output() onAddComment = new EventEmitter<ProblemComment>();
    text: string;
    user: User;
    label: string;
    constructor(
        private service: StakeholderService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });

        if (this.user.role === "author" && !this.problem.isAnswered) {
            this.label = "Answer";
        } else {
            this.label = "Comment";
        }
    }

    leaveComment() {
        const problemComment: ProblemCommentCreate = {
            text: this.text,
            commenterId: this.user.id,
        };
        console.log(this.user.role);
        this.service
            .createComment(problemComment, this.problem.id, this.user.role)
            .subscribe({
                next: (result: ProblemComment) => {
                    console.log(result);
                    this.onAddComment.emit(result);
                },
            });
    }

    createAnswer() {
        const problemAnswer: ProblemAnswer = {
            authorId: this.problem.tourAuthorId,
            answer: this.text,
        };
        this.service.createAnswer(problemAnswer, this.problem.id).subscribe({
            next: () => {
                this.problem.isAnswered = true;
                this.onAddAnswer.emit(this.text);
                this.label = "Comment";
            },
            error: () => {
                console.log("error");
            },
        });
    }

    faChevronRight = faChevronRight;
}
