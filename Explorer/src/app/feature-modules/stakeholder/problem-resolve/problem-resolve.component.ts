// problem-resolve.component.ts
import { Component, Input } from "@angular/core";
import { StakeholderService } from "../stakeholder.service";
import { Problem } from "../../marketplace/model/problem.model";

@Component({
    selector: "xp-problem-resolve",
    templateUrl: "./problem-resolve.component.html",
    styleUrls: ["./problem-resolve.component.css"],
})
export class ProblemResolveComponent {
    @Input() problemId: number;

    constructor(private service: StakeholderService) {}

    resolveProblem(problemId: number) {
        this.service.resolveProblem(problemId).subscribe({
            next: (result: Problem) => {
                console.log(result);
            },
        });
    }
}
