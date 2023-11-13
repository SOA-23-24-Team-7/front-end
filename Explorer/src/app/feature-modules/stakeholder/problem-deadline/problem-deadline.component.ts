import { Component, Inject, OnInit, Optional, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StakeholderService } from "../stakeholder.service";
import { ProblemUser } from "../../marketplace/model/problem-with-user.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { ProblemUpdateDeadline } from "../model/problem-update-deadline.model";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
    selector: "xp-problem-deadline",
    templateUrl: "./problem-deadline.component.html",
    styleUrls: ["./problem-deadline.component.css"],
})
export class ProblemDeadlineComponent implements OnInit {
    problem: ProblemUser;
    user: User;
    deadline: Date = new Date();
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private service: StakeholderService,
    ) {}
    ngOnInit(): void {
        this.problem = this.data.dataProblem;
        this.user = this.data.dataUser;
    }

    setDeadline(problem: ProblemUser) {
        if (this.user.role == "administrator") {
            const updatedProblem: ProblemUpdateDeadline = {
                id: problem.id,
                deadline: this.deadline,
            };
            this.service.setDeadline(updatedProblem).subscribe();
        }
    }
}
