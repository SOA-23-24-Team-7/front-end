import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { FormsModule } from "@angular/forms";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProblemCommentComponent } from "./problem-comment/problem-comment.component";
import { ProblemCommentCreateComponent } from "./problem-comment-create/problem-comment-create.component";
import { ProblemsOverviewComponent } from "./problems-overview/problems-overview.component";
import { ProblemAnswerComponent } from "./problem-answer/problem-answer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ProblemDeadlineComponent } from "./problem-deadline/problem-deadline.component";
import { NotificationTabsComponent } from "./notification-tabs/notification-tabs.component";
import { MarketplaceModule } from "../marketplace/marketplace.module";

@NgModule({
    declarations: [
        UserProfileComponent,
        EditProfileComponent,
        ProblemCommentComponent,
        ProblemCommentCreateComponent,
        ProblemsOverviewComponent,
        ProblemAnswerComponent,
        ProblemDeadlineComponent,
        NotificationTabsComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FontAwesomeModule,
        MarketplaceModule,
    ],
    exports: [
        UserProfileComponent,
        EditProfileComponent,
        ProblemsOverviewComponent,
        NotificationTabsComponent,
    ],
})
export class StakeholderModule {}
