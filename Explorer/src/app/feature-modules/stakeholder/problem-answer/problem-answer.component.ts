import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StakeholderService } from "../stakeholder.service";
import { ProblemUser } from "../../marketplace/model/problem-with-user.model";

@Component({
    selector: "xp-problem-answer",
    templateUrl: "./problem-answer.component.html",
    styleUrls: ["./problem-answer.component.css"],
})
export class ProblemAnswerComponent implements OnInit {
    problem: ProblemUser;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private service: StakeholderService,
    ) {
        this.problem = data;
    }
    ngOnInit(): void {
        console.log(this.problem.id);
    }

    resolveProblem() {
        this.service.resolveProblem(this.problem.id).subscribe({
            next: (result: ProblemUser) => {
                console.log(result);
            },
        });
    }
}
