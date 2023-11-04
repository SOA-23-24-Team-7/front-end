import { Component, OnInit } from "@angular/core";
import { StakeholderService } from "../stakeholder.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { ProblemCommentCreate } from "../model/problem-comment-create.model";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-problem-comment-create",
    templateUrl: "./problem-comment-create.component.html",
    styleUrls: ["./problem-comment-create.component.css"],
})
export class ProblemCommentCreateComponent implements OnInit {
    text: string;
    problemAnswerId: number = 1;
    commenterId: number;
    constructor(
        private service: StakeholderService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.commenterId = user.id;
        });
    }

    leaveComment() {
        const problemComment: ProblemCommentCreate = {
            text: this.text,
            problemAnswerId: this.problemAnswerId,
            commenterId: this.commenterId,
        };
        this.service.createProblemComment(problemComment).subscribe(() => {});
    }

    faChevronRight = faChevronRight;
}
