import {
    Component,
    OnInit,
    Optional,
    Inject,
    Output,
    EventEmitter,
} from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { StakeholderService } from "../stakeholder.service";
import { ProblemUser } from "../../marketplace/model/problem-with-user.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { faSquareCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ProblemAnswer } from "../model/problem-answer.model";
import { ProblemComment } from "../model/problem-comment.model";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { TourAuthoringService } from "../../tour-authoring/tour-authoring.service";

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
        private tourService: TourAuthoringService,
        private dialogRef: MatDialogRef<ProblemAnswerComponent>,
    ) {}

    ngOnInit(): void {
        this.problem = this.data.dataProblem;
        this.user = this.data.dataUser;

        this.loadProblemAnswer(this.problem.id);
        this.loadProblemComment();
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

    loadProblemComment(): void {
        this.service
            .getProblemComments(this.problem.id, this.user.role)
            .subscribe({
                next: (result: PagedResults<ProblemComment>) => {
                    this.comments = result.results;
                    console.log(this.comments);
                },
                error: () => {},
            });
    }

    hasDedlinePassed(): boolean {
        var today = new Date();
        const deadline = new Date(this.problem.deadline);
        today.setHours(0, 0, 0, 0);

        return deadline <= today;
    }

    deleteTour(tourId: number) {
        console.log(tourId);
        this.tourService.deleteTourAdmin(tourId).subscribe({
            next: () => {
                this.dialogRef.close(tourId);
            },
            error: () => {},
        });
    }

    faSquareCheck = faSquareCheck;
    faTrash = faTrash;
}
