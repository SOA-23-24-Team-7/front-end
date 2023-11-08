import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { FormsModule } from "@angular/forms";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProblemCommentComponent } from "./problem-comment/problem-comment.component";
import { ProblemCommentCreateComponent } from "./problem-comment-create/problem-comment-create.component";
import { ProblemResolveComponent } from "./problem-resolve/problem-resolve.component";
import { ProblemsOverviewComponent } from "./problems-overview/problems-overview.component";
import { ProblemAnswerComponent } from "./problem-answer/problem-answer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        UserProfileComponent,
        EditProfileComponent,
        ProblemCommentComponent,
        ProblemCommentCreateComponent,
        ProblemResolveComponent,
        ProblemsOverviewComponent,
        ProblemAnswerComponent,
    ],
    imports: [CommonModule, MaterialModule, FormsModule, FontAwesomeModule],
    exports: [
        UserProfileComponent,
        EditProfileComponent,
        ProblemsOverviewComponent,
    ],
})
export class StakeholderModule {}
