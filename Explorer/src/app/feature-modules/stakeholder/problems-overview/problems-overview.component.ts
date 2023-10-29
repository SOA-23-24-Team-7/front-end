import { Component, OnInit } from "@angular/core";
import { Problem } from "../../marketplace/model/problem.model";
import { StakeholderService } from "../stakeholder.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { MatDialog } from "@angular/material/dialog";
import { ProblemAnswerComponent } from "../problem-answer/problem-answer.component";

@Component({
    selector: "xp-problems-overview",
    templateUrl: "./problems-overview.component.html",
    styleUrls: ["./problems-overview.component.css"],
})
export class ProblemsOverviewComponent implements OnInit {
    problems: Problem[] = [];
    user: User;
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
                next: (result: PagedResults<Problem>) => {
                    this.problems = result.results;
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
        } else if (this.user.role == "tourist") {
            this.service.getTouristsProblems().subscribe({
                next: (result: PagedResults<Problem>) => {
                    this.problems = result.results;
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
        } else if (this.user.role == "author") {
            this.service.getAuthorsProblems().subscribe({
                next: (result: PagedResults<Problem>) => {
                    this.problems = result.results;
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
        }
    }

    openProblemModal(problem: Problem) {
        this.dialogRef.open(ProblemAnswerComponent, { data: problem });
    }
}
