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
  tourId: any
  nextKeyPointId: number
  tour: Tour = {
    name: '.',
    description: '.',
    tags: ['.'],
    difficulty: 1
  }
  touristPosition: any

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private service: TourExecutionService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tourId = params.get('tourId')
      this.getTour(this.tourId)
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

        this.service.checkKeyPointCompletion(this.tourId, this.touristPosition).subscribe((session) => {
          if (session.status == TourExecutionSessionStatus.Completed) {
            this.nextKeyPointId = null!;
          } else {
            this.nextKeyPointId = session.nextKeyPointId;
          }
        });
      }
    });
  }

  getTour(tourId: any) {
    this.service.getTour(tourId).subscribe({
      next: (result: Tour) => {
        this.tour = result;
      }
    });
  }
  abandonTour(){
    let r = confirm('Are you sure you want to leave this tour?')
    if(r){
      this.service.abandonTour(this.tourId).subscribe({
        next: (result: TourExecutionSession) => {
          this.router.navigate(['/purchasedtours'])
        }
      });
    }
  }
}
