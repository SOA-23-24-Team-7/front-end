import { Component, OnInit } from "@angular/core";
import { AdministrationService } from "../administration.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import {
    faUserXmark,
    faUserCheck,
    faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { Person } from "../../stakeholder/model/person.model";
import { MatDialog } from "@angular/material/dialog";
import { WalletUpdateDialogComponent } from "../wallet-update-dialog/wallet-update-dialog.component";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "xp-users-overview",
    templateUrl: "./users-overview.component.html",
    styleUrls: ["./users-overview.component.css"],
    animations: [
        trigger("fadeIn", [
            transition(":enter", [
                style({ opacity: 0, transform: "translateX(-40px)" }),
                animate(
                    "0.5s ease",
                    style({ opacity: 1, transform: "translateX(0)" }),
                ),
            ]),
        ]),
    ],
})
export class UsersOverviewComponent implements OnInit {
    people: Person[] = [];

    constructor(
        private service: AdministrationService,
        public dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.getUsersByAdmin();
    }

    getUsersByAdmin() {
        this.service.getUsersByAdmin().subscribe({
            next: (result: PagedResults<Person>) => {
                this.people = result.results;
            },
            error: () => {},
        });
    }

    disableAccount(person: Person, card: any) {
        this.service.disableAccount(person.userId).subscribe({
            next: (result: User) => {
                if (!result.isActive) {
                    card.classList.add("card-red");
                }
            },
        });
    }

    openWalletUpdateDialog(person: Person) {
        const dialogRef = this.dialog.open(WalletUpdateDialogComponent, {
            data: {
                person: person,
            },
        });
    }

    faUserXmark = faUserXmark;
    faUserCheck = faUserCheck;
    faMoneyBill = faMoneyBill;
}
