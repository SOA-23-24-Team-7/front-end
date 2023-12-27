import {
    Component,
    OnChanges,
    SimpleChanges,
    Input,
    Inject,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MarketplaceService } from "../marketplace.service";
import { ClubInvitationUsername } from "../model/club-invitation-username.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "xp-club-members-invite-form",
    templateUrl: "./club-members-invite-form.component.html",
    styleUrls: ["./club-members-invite-form.component.css"],
})
export class ClubMembersInviteFormComponent implements OnChanges {
    @Input() clubId: number;

    showError: boolean = false;
    showSuccess: boolean = false;

    constructor(
        private service: MarketplaceService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.clubId = data.clubId;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.clubMemberForm.reset();
    }

    clubMemberForm = new FormGroup({
        username: new FormControl("", [Validators.required]),
    });

    inviteMember(): void {
        const invitation: ClubInvitationUsername = {
            username: this.clubMemberForm.value.username || "",
            clubId: this.clubId,
        };

        const result = this.service.inviteMember(invitation).subscribe({
            next: () => {
                this.showSuccess = true;
                if ((this.showError = true)) this.showError = false;
            },
            error: () => {
                this.showSuccess = false;
                this.showError = true;
            },
        });
    }
}
