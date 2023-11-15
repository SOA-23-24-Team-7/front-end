import { Component, Input } from '@angular/core';
import { TourExecutionSessionInfo } from '../model/tour-execution-session-info.model';
import { TourStatus } from '../../tour-authoring/model/tour.model';
import { TourExecutionSessionStatus } from '../model/tour-execution-session-status.model';

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
}
