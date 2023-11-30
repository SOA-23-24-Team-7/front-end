import { Component, Input, OnInit } from '@angular/core';
import { TourExecutionSessionInfo } from '../model/tour-execution-session-info.model';
import { TourStatus } from '../../tour-authoring/model/tour.model';
import { TourExecutionSessionStatus } from '../model/tour-execution-session-status.model';
import {formatDate} from '@angular/common';

@Component({
  selector: 'xp-tour-execution-info',
  templateUrl: './tour-execution-info.component.html',
  styleUrls: ['./tour-execution-info.component.css']
})
export class TourExecutionInfoComponent {
  @Input() name: string;
  @Input() difficulty: number;
  @Input() tags: string[];
  @Input() tourStatus?: TourStatus;
  @Input() description: string;
  @Input() lastActivity: Date;
  @Input() tourExecutionStatus: TourExecutionSessionStatus;
  formatedDate : string;
  tourExecutionStatusString : string;

  ngOnInit(){
    this.formatedDate = formatDate(this.lastActivity, 'dd/MM/yyyy', 'en');
    this.tourExecutionStatusString = TourExecutionSessionStatus[this.tourExecutionStatus];
  }

  changeColor(){
    if(this.tourExecutionStatus == TourExecutionSessionStatus.Abandoned){
      return { 'color': 'red' };
    }
    if(this.tourExecutionStatus == TourExecutionSessionStatus.Completed){
      return { 'color': 'green' };
    }
    return { 'color': 'blue'};
  }
}
