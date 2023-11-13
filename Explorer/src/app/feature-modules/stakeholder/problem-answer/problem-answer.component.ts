import {
    Component,
    OnInit,
    Optional,
    Inject,
    Output,
    EventEmitter,
} from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StakeholderService } from "../stakeholder.service";
import { ProblemUser } from "../../marketplace/model/problem-with-user.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { ProblemAnswer } from "../model/problem-answer.model";
import { ProblemComment } from "../model/problem-comment.model";

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
    @Output() onAddAnswer = new EventEmitter();

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
        this.service.getProblemAnswer(problemId, this.user.role).subscribe({
            next: (result: ProblemAnswer) => {
                if (result !== undefined) {
                    this.headerText = result.answer;
                }
            },
        });
    }

    resolveProblem(header: any) {
        this.service.resolveProblem(this.problem.id, this.user.role).subscribe({
            next: () => {
                header.classList.add("green");
                this.problem.isResolved = true;
            },
            error: () => {
                console.log("error");
            },
        });
    }

    addAnswer(text: string) {
        this.headerText = text;
        this.onAddAnswer.emit(true);
    }

    addComment(comment: ProblemComment) {
        this.comments.push(comment);
    }

    hasDedlinePassed(): boolean {
        var today = new Date();
        const deadline = new Date(this.problem.deadline);
        today.setHours(0, 0, 0, 0);

        return deadline <= today;
    }

    faSquareCheck = faSquareCheck;
}
