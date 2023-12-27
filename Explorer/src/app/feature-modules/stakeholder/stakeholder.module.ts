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
import { ProblemDeadlineComponent } from "./problem-deadline/problem-deadline.component";
import { MessageDialogComponent } from "./message-dialog/message-dialog/message-dialog.component";
import { FollowDialogComponent } from "./follow-dialog/follow-dialog.component";
import { UserNotificationsComponent } from "./user-notifications/user-notifications.component";
import { FollowerSearchDialogComponent } from "./follower-search-dialog/follower-search-dialog.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NotificationTabsComponent } from "./notification-tabs/notification-tabs.component";
import { MarketplaceModule } from "../marketplace/marketplace.module";
import { ProblemResolvingNotificationsComponent } from "./problem-resolving-notifications/problem-resolving-notifications.component";
import { SharedModule } from "src/app/shared/shared.module";
import { UserRowComponent } from "./user-row/user-row.component";
import { PaymentHistoryComponent } from "./payment-history/payment-history.component";
import { ShoppingNotificationsComponent } from "./shopping-notifications/shopping-notifications.component";
import { TransactionRecordsNotificationsComponent } from './transaction-records-notifications/transaction-records-notifications.component';
import { UserClubsDialogComponent } from './user-clubs-dialog/user-clubs-dialog.component';

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
        ProblemResolvingNotificationsComponent,
        MessageDialogComponent,
        FollowDialogComponent,
        UserNotificationsComponent,
        FollowerSearchDialogComponent,
        UserRowComponent,
        PaymentHistoryComponent,
        ShoppingNotificationsComponent,
        TransactionRecordsNotificationsComponent,
        UserClubsDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FontAwesomeModule,
        MarketplaceModule,
        SharedModule,
    ],
    exports: [
        UserProfileComponent,
        EditProfileComponent,
        ProblemsOverviewComponent,
        NotificationTabsComponent,
        MessageDialogComponent,
        EditProfileComponent,
    ],
})
export class StakeholderModule {}
