import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { FormsModule } from "@angular/forms";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProblemsOverviewComponent } from "./problems-overview/problems-overview.component";
import { ProblemAnswerComponent } from './problem-answer/problem-answer.component';

@NgModule({
    declarations: [
        UserProfileComponent,
        EditProfileComponent,
        ProblemsOverviewComponent,
        ProblemAnswerComponent,
    ],
    imports: [CommonModule, MaterialModule, FormsModule],
    exports: [
        UserProfileComponent,
        EditProfileComponent,
        ProblemsOverviewComponent,
    ],
})
export class StakeholderModule {}
