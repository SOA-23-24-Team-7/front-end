import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StakeholderService } from "../stakeholder.service";
import { ProblemUser } from "../../marketplace/model/problem-with-user.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { ProblemAnswer } from "../model/problem-answer";

@Component({
    selector: "xp-problem-answer",
    templateUrl: "./problem-answer.component.html",
    styleUrls: ["./problem-answer.component.css"],
})
export class ProblemAnswerComponent implements OnInit {
    problem: ProblemUser;
    user: User;
    headerText: string;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private service: StakeholderService,
    ) {}
    ngOnInit(): void {
        this.problem = this.data.dataProblem;
        this.user = this.data.dataUser;

        this.loadProblemAnswer(this.problem.id);
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

    resolveProblem() {
        this.service.resolveProblem(this.problem.id).subscribe({
            next: (result: ProblemUser) => {
                console.log(result);
            },
        });
    }

    addHeader(text: string) {
        console.log("pizdarija1");
        this.headerText = text;
    }

    faSquareCheck = faSquareCheck;
}
