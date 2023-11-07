import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Person } from "../model/person.model";
import { StakeholderService } from "../stakeholder.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { Router } from "@angular/router";
import { Follower } from "../model/follower";
import { MessageDialogComponent } from "../message-dialog/message-dialog/message-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "xp-user-profile",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
    editing = false;
    user: User;
    person: Person;
    followers: Follower[] = [];
    isDialogOpen: boolean = false;
    reciverId: number;

    @ViewChild(MessageDialogComponent) messageDialog: MessageDialogComponent;
    text: any;

    constructor(
        private authService: AuthService,
        private service: StakeholderService,
        private router: Router,
        public dialog: MatDialog,
    ) {}

    toggleEditing() {
        this.router.navigate(["/edit-profile"]);
    }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
            if (!user.id) return;
            this.service.getByUserId(this.user.id).subscribe(result => {
                this.person = result;
                this.followers = result.user.followers;
            });
        });
    }

    openMessageDialog(reciverID: number): void {
        console.log(reciverID);
        console.log("kkkkkkkkk");
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            data: {
                user: this.user,
                reciverId: reciverID,
            },
        });
    }
}
