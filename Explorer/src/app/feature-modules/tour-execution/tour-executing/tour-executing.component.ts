import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TourExecutionService } from '../tour-execution.service';
import { TouristPositionSimulatorComponent } from '../tourist-position-simulator/tourist-position-simulator.component';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { TouristPosition } from '../model/tourist-position.model';
import { TourExecutionSessionStatus } from '../model/tour-execution-session-status.model';
import { TourExecutionSession } from '../model/tour-execution-session-model';

@Component({
  selector: 'xp-tour-executing',
  templateUrl: './tour-executing.component.html',
  styleUrls: ['./tour-executing.component.css']
})
export class TourExecutingComponent implements OnInit {

  positionSubscription: Subscription
  touristId: number
  session: TourExecutionSession = { id: 0, tourId: 0, status: TourExecutionSessionStatus.Started, nextKeyPointId: -1, lastActivity: null! }
  tour: Tour = {
    name: '.',
    description: '.',
    tags: ['.'],
    difficulty: 1
  }
  touristPosition: any

  constructor(private route: ActivatedRoute, private authService: AuthService, private service: TourExecutionService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.session.tourId = +params.get('tourId')!
      this.getTour()
    })

    this.authService.user$.subscribe({
      next: (result: User) => {
        this.touristId = result.id;

        this.getTouristPosition();
        this.positionSubscription = interval(10000).subscribe(() => {
          this.getTouristPosition();
        });
      }
    });
  }

  getTouristPosition() {
    this.service.getTouristPositionByTouristId(this.touristId).subscribe({
      next: (result: TouristPosition) => {
        this.touristPosition = { longitude: result.longitude, latitude: result.latitude };

        if (this.session.status !== TourExecutionSessionStatus.Started) return;

        setTimeout(() => {
          this.service.checkKeyPointCompletion(this.session.tourId, this.touristPosition).subscribe((session) => {
            this.session = session;
          });
        }, 1000);
      }
    });
  }

  getTour() {
    this.service.getTour(this.session.tourId).subscribe({
      next: (result: Tour) => {
        this.tour = result;
      }
    });
  }
}
