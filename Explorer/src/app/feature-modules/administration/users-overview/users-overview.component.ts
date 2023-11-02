import { Component, OnInit } from "@angular/core";
import { AdministrationService } from "../administration.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { PersonUsername } from "../model/personWithUsername";
import { faUserXmark, faUserCheck } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-users-overview",
    templateUrl: "./users-overview.component.html",
    styleUrls: ["./users-overview.component.css"],
})
export class UsersOverviewComponent implements OnInit {
    users: PersonUsername[] = [];
    // selectedUser: User;

    constructor(private service: AdministrationService) {}

    ngOnInit(): void {
        this.getUsersByAdmin();
    }

    getUsersByAdmin() {
        this.service.getUsersByAdmin().subscribe({
            next: (result: PagedResults<PersonUsername>) => {
                this.users = result.results;
            },
            error: () => {},
        });
    }

    disableAccount(user: PersonUsername, container: any) {
        this.service.disableAccount(user.userId).subscribe({
            next: (result: PersonUsername) => {
                user = result;
                if (!user.isActive) {
                    container.classList.add("container-red");
                }
            },
        });
    }

    faUserXmark = faUserXmark;
    faUserCheck = faUserCheck;
}
