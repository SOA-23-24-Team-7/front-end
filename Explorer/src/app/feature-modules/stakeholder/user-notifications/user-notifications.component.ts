import { Component, OnInit } from "@angular/core";
import { Message } from "../model/message";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { StakeholderService } from "../stakeholder.service";

@Component({
    selector: "xp-user-notifications",
    templateUrl: "./user-notifications.component.html",
    styleUrls: ["./user-notifications.component.css"],
})
export class UserNotificationsComponent implements OnInit {
    messages: Message[] = [];
    page = 1;
    pageSize = 10;

    constructor(
        private service: StakeholderService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.loadMessages();
    }

    loadMessages() {
        const userId = this.authService.getCurrentUserId().id;
        this.service
            .getMessages(this.page, this.pageSize, userId)
            .subscribe((data: PagedResults<Message>) => {
                this.messages = data.results;
                console.log(data.results[1]);
            });
    }
}
