import { Component, Input, OnInit } from "@angular/core";
import { StakeholderService } from "../stakeholder.service";
import { Person } from "../model/person.model";

@Component({
    selector: "xp-problem-comment",
    templateUrl: "./problem-comment.component.html",
    styleUrls: ["./problem-comment.component.css"],
})
export class ProblemCommentComponent implements OnInit {
    @Input() commenterId: number;
    @Input() problemAnswerId: number;
    @Input() text: string;
    person: Person;

    constructor(private service: StakeholderService) {}

    ngOnInit(): void {
        this.service
            .getByUserId(this.commenterId)
            .subscribe((result: Person) => {
                this.person = result;
            });
    }
}
