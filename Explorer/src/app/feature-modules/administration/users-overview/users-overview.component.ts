import { Component, OnInit } from "@angular/core";
import { AdministrationService } from "../administration.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { PersonUser } from "../model/personWithUser";
import { faUserXmark, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { User } from "src/app/infrastructure/auth/model/user.model";

@Component({
    selector: "xp-users-overview",
    templateUrl: "./users-overview.component.html",
    styleUrls: ["./users-overview.component.css"],
})
export class UsersOverviewComponent implements OnInit {
    people: PersonUser[] = [];
    // selectedUser: User;

    constructor(private service: AdministrationService) {}

    ngOnInit(): void {
        this.getUsersByAdmin();
    }

    getUsersByAdmin() {
        this.service.getUsersByAdmin().subscribe({
            next: (result: PagedResults<PersonUser>) => {
                this.people = result.results;
            },
            error: () => {},
        });
    }

    disableAccount(person: PersonUser, container: any) {
        this.service.disableAccount(person.userId).subscribe({
            next: (result: User) => {
                if (!result.isActive) {
                    container.classList.add("container-red");
                }
            },
        });
    }

    faUserXmark = faUserXmark;
    faUserCheck = faUserCheck;
}
