import { Component } from '@angular/core';
import { TransactionRecord } from '../model/transaction-record.model';
import { StakeholderService } from '../stakeholder.service';
import { MatDialog } from '@angular/material/dialog';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'xp-transaction-records-notifications',
  templateUrl: './transaction-records-notifications.component.html',
  styleUrls: ['./transaction-records-notifications.component.css'],
  providers: [DatePipe],
})
export class TransactionRecordsNotificationsComponent {
  transactionRecords: TransactionRecord[] = [];
  constructor(
        private service: StakeholderService,
        public datePipe: DatePipe,
        public dialogRef: MatDialog,
  ) {}
  ngOnInit(): void {
    this.getTransactionRecords();
  }
  getTransactionRecords(): void {
    this.service.getTouristTransactionRecords().subscribe({
        next: (result: PagedResults<TransactionRecord>) => {
            this.transactionRecords = result.results;
            this.sortTransactions();
            console.log(this.transactionRecords);
        },
        error: (err: any) => {
            console.log(err);
        },
    });
    }
    sortTransactions(): void {
      this.transactionRecords.sort(function(a,b): any{return Date.parse(b.date) - Date.parse(a.date)})
    }

    faCoins = faCoins;
}
