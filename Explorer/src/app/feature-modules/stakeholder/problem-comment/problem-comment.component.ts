import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/infrastructure/auth/model/user.model";

@Component({
    selector: "xp-problem-comment",
    templateUrl: "./problem-comment.component.html",
    styleUrls: ["./problem-comment.component.css"],
})
export class ProblemCommentComponent {
    @Input() commenterId: number;
    @Input() problemAnswerId: number;
    @Input() text: string;
    @Input() commenter: User;
}
