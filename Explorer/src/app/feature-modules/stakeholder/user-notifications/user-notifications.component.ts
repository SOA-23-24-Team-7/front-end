import { Component, OnInit } from "@angular/core";
import { Message, MessageUsernames } from "../model/message.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { StakeholderService } from "../stakeholder.service";
import { Router } from "@angular/router";

@Component({
    selector: "xp-user-notifications",
    templateUrl: "./user-notifications.component.html",
    styleUrls: ["./user-notifications.component.css"],
})
export class UserNotificationsComponent implements OnInit {
    messages: MessageUsernames[] = [];
    page = 1;
    pageSize = 10;
    message: Message;
    messageNew: Message;

    constructor(
        private service: StakeholderService,
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.loadMessages();
    }

    loadMessages() {
        const userId = this.authService.getCurrentUserId();
        this.service
            .getMessages(this.page, this.pageSize, userId)
            .subscribe((data: PagedResults<MessageUsernames>) => {
                this.messages = data.results;
            });
    }

    markAsSeen(message: MessageUsernames): void {
        const messageNew: Message = {
            id: message.id,
            senderId: message.userSenderId,
            reciverId: message.userReciverId,
            text: message.text,
            statusOfMessage: 1,
        };

        this.service.updateMessageStatusOnSeen(messageNew).subscribe(() => {
            this.router.navigate(["/profile"]);
        });
    }
}
