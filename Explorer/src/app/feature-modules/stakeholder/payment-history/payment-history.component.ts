import { Component, OnInit } from "@angular/core";
import { Record } from "../model/record.model";
import { StakeholderService } from "../stakeholder.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { BundleRecord } from "../model/bundle-record.model";
import { DatePipe } from "@angular/common";

@Component({
    selector: "xp-payment-history",
    templateUrl: "./payment-history.component.html",
    styleUrls: ["./payment-history.component.css"],
    providers: [DatePipe],
})
export class PaymentHistoryComponent implements OnInit {
    records: Record[] = [];
    bundleRecords: BundleRecord[] = [];
    faCoins = faCoins;

    constructor(private service: StakeholderService,public datePipe: DatePipe) {}
    ngOnInit(): void {
        this.service.getTouristsPaymentHistory().subscribe({
            next: (result: PagedResults<Record>) => {
                this.records = result.results;
                this.sortPayments();
                console.log(this.records);
            },
        });

        this.service.getBundleRecords().subscribe({
            next: (result: BundleRecord[]) => {
                this.bundleRecords = result;
            },
        });
    }
    sortPayments(): void {
        this.records.sort(function(a, b): any {
            const dateA = a.purchasedDate instanceof Date ? a.purchasedDate : new Date(a.purchasedDate);
            const dateB = b.purchasedDate instanceof Date ? b.purchasedDate : new Date(b.purchasedDate);
            return dateB.getTime() - dateA.getTime();
          });
      }
}
