import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentFormComponent } from "./equipment-form/equipment-form.component";
import { EquipmentComponent } from "./equipment/equipment.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersOverviewComponent } from "./users-overview/users-overview.component";
import { RatingComponent } from "./rating/rating.component";
import { ProblemViewComponent } from "./problem-view/problem-view.component";
import { RequestViewComponent } from "./request-view/request-view.component";
import { CommentRequestFormComponent } from "./comment-request-form/comment-request-form.component";
import { CommentKeyPointRequestFormComponent } from "./comment-keypoint-request-form/comment-keypoint-request-form.component";

@NgModule({
    declarations: [
        EquipmentFormComponent,
        EquipmentComponent,
        RatingComponent,
        UsersOverviewComponent,
        ProblemViewComponent,
        RequestViewComponent,
        CommentRequestFormComponent,
        CommentKeyPointRequestFormComponent,
    ],
    imports: [CommonModule, MaterialModule, ReactiveFormsModule],
    exports: [
        EquipmentComponent,
        EquipmentFormComponent,
        UsersOverviewComponent,
        RatingComponent,
        ProblemViewComponent,
    ],
})
export class AdministrationModule {}
