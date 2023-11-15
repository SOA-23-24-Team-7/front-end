import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TourExecutionSessionInfo } from '../model/tour-execution-session-info.model';
import { TourExecutionService } from '../tour-execution.service';

export interface ModalData {
  userId: number;
}

@Component({
  selector: 'xp-tour-execution-history',
  templateUrl: './tour-execution-history.component.html',
  styleUrls: ['./tour-execution-history.component.css']
})
export class TourExecutionHistoryComponent {
  userId: number;
  tourExecutionSessionInfos: TourExecutionSessionInfo[] = []

  constructor(
    private service : TourExecutionService,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
  ){}

  ngOnInit(){
    this.userId = this.data.userId;
    this.getTourExecutionSessionInformation()
  }

  getTourExecutionSessionInformation(){
    this.service.getTourExecutionSessionInfo().subscribe(result => {
      this.tourExecutionSessionInfos = result;
    });
  }
}
