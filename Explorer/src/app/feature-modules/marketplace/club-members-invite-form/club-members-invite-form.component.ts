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
import { User } from "src/app/infrastructure/auth/model/user.model";
import { StakeholderService } from "../../stakeholder/stakeholder.service";
import { Person } from "../../stakeholder/model/person.model";
import { NotifierService } from "angular-notifier";

@Component({
    selector: "xp-club-members-invite-form",
    templateUrl: "./club-members-invite-form.component.html",
    styleUrls: ["./club-members-invite-form.component.css"],
})
export class ClubMembersInviteFormComponent implements OnChanges {
    @Input() clubId: number;
    users: Person[];
    showError: boolean = false;
    showSuccess: boolean = false;

    constructor(
        private service: MarketplaceService,
        private userService: StakeholderService,
        private notifier: NotifierService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.clubId = data.clubId;
    }

    ngOnInit() {
        this.userService.getPeople().subscribe(result => {
            this.users = result.results;
        });
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
                this.notifier.notify("success", "Successfully invited!");
            },
            error: () => {
                this.showSuccess = false;
                this.showError = true;
                this.notifier.notify("error", "Already invited!");
            },
        });
    }
}
