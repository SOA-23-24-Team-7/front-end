import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Problem } from "../../marketplace/model/problem.model";

@Component({
    selector: "xp-problem-answer",
    templateUrl: "./problem-answer.component.html",
    styleUrls: ["./problem-answer.component.css"],
})
export class ProblemAnswerComponent implements OnInit {
    problem: Problem;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
        this.problem = data;
    }
    ngOnInit(): void {
        console.log(this.problem.id);
    }
}
