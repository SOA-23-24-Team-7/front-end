import { Component } from "@angular/core";
import { ProblemResolvingNotification } from "../model/problem-resolving-notification.model";
import { StakeholderService } from "../stakeholder.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { ProblemAnswerComponent } from "../problem-answer/problem-answer.component";
import { MatDialog } from "@angular/material/dialog";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { ProblemUser } from "../../marketplace/model/problem-with-user.model";

@Component({
    selector: "xp-problem-resolving-notifications",
    templateUrl: "./problem-resolving-notifications.component.html",
    styleUrls: ["./problem-resolving-notifications.component.css"],
})
export class ProblemResolvingNotificationsComponent {
    problemResolvingNotifications: ProblemResolvingNotification[] = [];
    user: User;
    constructor(
        private service: StakeholderService,
        public dialogRef: MatDialog,
        private authService: AuthService,
    ) {}
    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        this.getNotificationsByLoggedInUser();
    }
    getNotificationsByLoggedInUser() {
        this.service.getNotificationsByLoggedInUser().subscribe({
            next: (result: PagedResults<ProblemResolvingNotification>) => {
                this.problemResolvingNotifications = result.results;
                console.log(this.problemResolvingNotifications);
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }

    setSeenStatus(notificationId: number, problemId: number) {
        this.service.setSeenStatus(notificationId).subscribe();
        this.service.getProblem(problemId, this.user.role).subscribe({
            next: (result: ProblemUser) => {
                const dialogRef = this.dialogRef.open(ProblemAnswerComponent, {
                    data: { dataProblem: result, dataUser: this.user },
                });
            },
        });
    }
}
