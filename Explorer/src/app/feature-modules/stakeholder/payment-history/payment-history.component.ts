import { Component, OnInit } from "@angular/core";
import { Record } from "../model/record.model";
import { StakeholderService } from "../stakeholder.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-payment-history",
    templateUrl: "./payment-history.component.html",
    styleUrls: ["./payment-history.component.css"],
})
export class PaymentHistoryComponent implements OnInit {
    records: Record[] = [];
    faCoins = faCoins;

    constructor(private service: StakeholderService) {}
    ngOnInit(): void {
        this.service.getTouristsPaymentHistory().subscribe({
            next: (result: PagedResults<Record>) => {
                this.records = result.results;
            },
        });
    }
}
