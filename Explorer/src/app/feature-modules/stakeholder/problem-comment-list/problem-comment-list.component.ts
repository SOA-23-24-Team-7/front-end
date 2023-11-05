import { Component, Input, OnInit } from "@angular/core";
import { ProblemComment } from "../model/problem-comment.model";
import { StakeholderService } from "../stakeholder.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";

@Component({
    selector: "xp-problem-comment-list",
    templateUrl: "./problem-comment-list.component.html",
    styleUrls: ["./problem-comment-list.component.css"],
})
export class ProblemCommentListComponent implements OnInit {
    comments: ProblemComment[] = [];
    @Input() problemAnswerId: number;

    constructor(private service: StakeholderService) {}

    ngOnInit(): void {
        this.GetCommentsByProblemAnswerId();
    }

    GetCommentsByProblemAnswerId(): void {
        this.service.GetCommentsByProblemAnswerId(this.problemAnswerId).subscribe({
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
}
