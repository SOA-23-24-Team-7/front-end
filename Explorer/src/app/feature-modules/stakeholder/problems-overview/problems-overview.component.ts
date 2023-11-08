import { Component, OnInit } from "@angular/core";
import { StakeholderService } from "../stakeholder.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { MatDialog } from "@angular/material/dialog";
import { ProblemAnswerComponent } from "../problem-answer/problem-answer.component";
import { ProblemUser } from "../../marketplace/model/problem-with-user.model";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { ProblemUpdateDeadline } from "../model/problem-update-deadline.model";
import { ProblemDeadlineComponent } from "../problem-deadline/problem-deadline.component";

@Component({
    selector: "xp-problems-overview",
    templateUrl: "./problems-overview.component.html",
    styleUrls: ["./problems-overview.component.css"],
})
export class ProblemsOverviewComponent implements OnInit {
    problems: ProblemUser[] = [];
    user: User;
    deadline: Date = new Date("2023-11-09");
    constructor(
        private service: StakeholderService,
        private authService: AuthService,
        public dialogRef: MatDialog,
    ) {}

    ngOnInit(): void {
        this.getProblems();
    }

    getProblems(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });

        if (this.user.role == "administrator") {
            this.service.getAdminsProblems().subscribe({
                next: (result: PagedResults<ProblemUser>) => {
                    this.problems = result.results;
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
        } else if (this.user.role == "tourist") {
            this.service.getTouristsProblems().subscribe({
                next: (result: PagedResults<ProblemUser>) => {
                    this.problems = result.results;
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
        } else if (this.user.role == "author") {
            this.service.getAuthorsProblems().subscribe({
                next: (result: PagedResults<ProblemUser>) => {
                    this.problems = result.results;
                    console.log(this.problems);
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
        }
    }

    shouldShowDeadline(deadline: Date): boolean {
        var date = new Date(deadline);
        return date.getFullYear() < 9999;
    }

    hasPassed5DaysSinceReported(reportedTime: Date): boolean {
        var date = new Date(reportedTime);
        const now = new Date();
        const timeDifference = now.getTime() - date.getTime();
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        return daysDifference >= 5;
    }

    openDeadlineModal(problem: ProblemUser, e: Event) {
        e.stopPropagation();
        if (this.user.role != "administrator") {
            return;
        }
        this.dialogRef.open(ProblemDeadlineComponent, {
            data: { dataProblem: problem, dataUser: this.user },
        });
    }

    //dodati proveru sa resolved
    openProblemModal(problem: ProblemUser) {
        if (this.user.role != "author" && !problem.isAnswered) {
            return;
        }
        this.dialogRef.open(ProblemAnswerComponent, {
            data: { dataProblem: problem, dataUser: this.user },
        });
    }

    onProblemCardMouseover(problem: ProblemUser, problemCard: any) {
        if (this.user.role != "author" && !problem.isAnswered) {
            problemCard.classList.remove("card-hover");
        }
    }

    onDeadlineMouseover(deadline: any) {
        if (this.user.role != "administrator") {
            deadline.classList.remove("deadline-hover");
        }
    }

    faCircleExclamation = faCircleExclamation;
}
