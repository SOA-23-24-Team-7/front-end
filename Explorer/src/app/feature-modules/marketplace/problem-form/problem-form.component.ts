import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Problem } from "../model/problem.model";
import { MarketplaceService } from "../marketplace.service";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "xp-problem-form",
    templateUrl: "./problem-form.component.html",
    styleUrls: ["./problem-form.component.css"],
})
export class ProblemFormComponent implements OnChanges {
    @Output() problemUpdated = new EventEmitter<null>();
    @Input() problem: Problem;
    @Input() shouldEdit: boolean = false;

    constructor(private service: MarketplaceService) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.problemForm.reset();
        if (this.shouldEdit) {
            this.problemForm.patchValue(this.problem);
        }
    }

    problemForm = new FormGroup({
        category: new FormControl("", [Validators.required]),
        priority: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        tourId: new FormControl(0, [Validators.required]),
    });
    addProblem(): void {
        const problem: Problem = {
            category: this.problemForm.value.category || "",
            priority: this.problemForm.value.priority || "",
            description: this.problemForm.value.description || "",
            reportedTime: new Date(),
            tourId: this.problemForm.value.tourId || 0,
        };
        this.service.addProblem(problem).subscribe({
            next: () => {
                this.problemUpdated.emit();
                this.problemForm.reset();
            },
        });
    }
    updateProblem(): void {
        const problem: Problem = {
            category: this.problemForm.value.category || "",
            priority: this.problemForm.value.priority || "",
            description: this.problemForm.value.description || "",
            reportedTime: new Date(),
            tourId: this.problemForm.value.tourId || 0,
        };
        problem.id = this.problem.id;
        problem.touristId = this.problem.touristId;
        problem.reportedTime = this.problem.reportedTime;
        this.service.updateProblem(problem).subscribe({
            next: () => {
                this.problemUpdated.emit();
                this.problemForm.reset();
            },
        });
    }
}
