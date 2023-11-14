import { Component } from "@angular/core";
import { ProblemResolvingNotification } from "../model/problem-resolving-notification.model";
import { StakeholderService } from "../stakeholder.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";

@Component({
    selector: "xp-problem-resolving-notifications",
    templateUrl: "./problem-resolving-notifications.component.html",
    styleUrls: ["./problem-resolving-notifications.component.css"],
})
export class ProblemResolvingNotificationsComponent {
    problemResolvingNotifications: ProblemResolvingNotification[] = [];
    constructor(private service: StakeholderService) {}
    ngOnInit(): void {
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

    setSeenStatus(notificationId: number) {
        this.service.setSeenStatus(notificationId).subscribe();
    }
}
