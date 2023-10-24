import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RatingFormComponent } from "./rating-form/rating-form.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ReviewComponent } from "./review/review.component";
import { ReviewFormComponent } from "./review-form/review-form.component";
import { FormsModule } from "@angular/forms";
import { ProblemComponent } from "./problem/problem.component";
import { ProblemFormComponent } from "./problem-form/problem-form.component";

@NgModule({
    declarations: [
        ReviewComponent,
        ReviewFormComponent,
        ProblemComponent,
        ProblemFormComponent,
        RatingFormComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        ReviewComponent,
        ReactiveFormsModule,
        RatingFormComponent,
        ProblemComponent,
    ],
})
export class MarketplaceModule {}
