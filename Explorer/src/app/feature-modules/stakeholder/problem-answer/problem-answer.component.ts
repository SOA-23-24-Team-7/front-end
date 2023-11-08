import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StakeholderService } from "../stakeholder.service";
import { ProblemUser } from "../../marketplace/model/problem-with-user.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { ProblemAnswer } from "../model/problem-answer";
import { ProblemComment } from "../model/problem-comment.model";
import { PagedResults } from "src/app/shared/model/paged-results.model";

@Component({
    selector: "xp-problem-answer",
    templateUrl: "./problem-answer.component.html",
    styleUrls: ["./problem-answer.component.css"],
})
export class ProblemAnswerComponent implements OnInit {
    problem: ProblemUser;
    user: User;
    headerText: string;
    comments: ProblemComment[];

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private service: StakeholderService,
    ) {}
    ngOnInit(): void {
        this.problem = this.data.dataProblem;
        this.user = this.data.dataUser;

        this.loadProblemAnswer(this.problem.id);
        this.getCommentsByProblemAnswerId();
    }

    loadProblemAnswer(problemId: number) {
        this.service.getProblemAnswer(problemId).subscribe({
            next: (result: ProblemAnswer) => {
                if (result !== undefined) {
                    this.headerText = result.answer;
                }
            },
        });
    }

    resolveProblem(header: any) {
        this.service.resolveProblem(this.problem.id).subscribe({
            next: (result: ProblemUser) => {
                header.classList.add("green");
                this.problem.isResolved = true;
            },
        });
    }

    addHeader(text: string) {
        this.headerText = text;
    }

    addComment(comment: ProblemComment) {
        this.comments.push(comment);
    }

    getCommentsByProblemAnswerId(): void {
        this.service
            .getCommentsByProblemAnswerId(this.problem.answerId)
            .subscribe({
                next: (result: PagedResults<ProblemComment>) => {
                    this.comments = result.results;
                    console.log(this.comments);
                    for (const comment of this.comments) {
                        console.log(comment.commenter);
                    }
                },
                error: () => {},
            });
    }

    faSquareCheck = faSquareCheck;
}
