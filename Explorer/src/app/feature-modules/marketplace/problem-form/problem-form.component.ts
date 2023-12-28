import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Problem } from "../model/problem.model";
import { MarketplaceService } from "../marketplace.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NotifierService } from "angular-notifier";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ProblemUser } from "../model/problem-with-user.model";

@Component({
    selector: "xp-problem-form",
    templateUrl: "./problem-form.component.html",
    styleUrls: ["./problem-form.component.css"],
})
export class ProblemFormComponent implements OnInit {
    tourId: number;
    problem: Problem;
    shouldEdit: boolean = false;
    @Output() onEdit = new EventEmitter();

    constructor(
        private service: MarketplaceService,
        private dialogRef: MatDialogRef<ProblemFormComponent>,
        private notifier: NotifierService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {
        this.tourId = this.data.tourId;
        this.problem = this.data.problem;
        this.shouldEdit = this.data.shouldEdit;
        if (this.shouldEdit) {
            this.problemForm.patchValue(this.problem);
        }
    }

    problemForm = new FormGroup({
        category: new FormControl("", [Validators.required]),
        priority: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    });

    addProblem(): void {
        const problem: Problem = {
            category: this.problemForm.value.category || "",
            priority: this.problemForm.value.priority || "",
            description: this.problemForm.value.description || "",
            reportedTime: new Date(),
            tourId: this.tourId,
        };
        this.service.addProblem(problem).subscribe({
            next: () => {
                this.notifier.notify(
                    "success",
                    "Successfully added a problem report.",
                );
                this.closeForm(problem);
            },
        });
    }

    updateProblem(): void {
        const problem: Problem = {
            category: this.problemForm.value.category || "",
            priority: this.problemForm.value.priority || "",
            description: this.problemForm.value.description || "",
            reportedTime: new Date(),
            tourId: this.tourId,
        };
        problem.id = this.problem.id;
        problem.touristId = this.problem.touristId;
        problem.reportedTime = this.problem.reportedTime;
        this.service.updateProblem(problem).subscribe({
            next: () => {
                this.notifier.notify(
                    "success",
                    "Successfully changed the problem report.",
                );
                this.closeForm(problem);
            },
        });
    }

    closeForm(problem: Problem): void {
        this.dialogRef.close(problem);
    }

    faXmark = faXmark;
}
