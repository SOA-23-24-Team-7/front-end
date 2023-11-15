import { Component, Inject, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { StakeholderService } from "../../stakeholder.service";
export interface ModalData {
    user: User;
    reciverId: number;
}
@Component({
    selector: "xp-message-dialog",
    templateUrl: "./message-dialog.component.html",
    styleUrls: ["./message-dialog.component.css"],
})
export class MessageDialogComponent implements OnInit {
    @Input() IsOpen: boolean = false;
    message: string = "";
    senderId: number;

    isDialogOpen: boolean = true;

    constructor(
        private stakeholderService: StakeholderService,
        private authService: AuthService,
        public dialogRef: MatDialogRef<MessageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ModalData,
    ) {}

    ngOnInit() {
        //this.authService.checkIfUserExists();
    }

    sendMessage() {
        if (this.message.trim() === "") {
            console.log(this.message);
            return;
        }

        const userId = this.authService.getCurrentUserId();
        const reciverId: number = this.data.reciverId;
        this.stakeholderService
            .sendMessage(this.message, userId, reciverId)
            .subscribe({
                next: (result: any) => {
                    this.dialogRef.close();
                },
            });
    }
}
