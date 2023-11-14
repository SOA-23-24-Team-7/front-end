import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TourExecutionService } from '../tour-execution.service';
import { TouristPositionSimulatorComponent } from '../tourist-position-simulator/tourist-position-simulator.component';
import { Observable, Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { TouristPosition } from '../model/tourist-position.model';
import { TourExecutionSessionStatus } from '../model/tour-execution-session-status.model';
import { TourExecutionSession } from '../model/tour-execution-session-model';
import { KeyPoint } from '../../tour-authoring/model/key-point.model';
import { latLng } from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { ClickedKeyPointComponent } from '../clicked-key-point/clicked-key-point.component';

@Component({
  selector: 'xp-tour-executing',
  templateUrl: './tour-executing.component.html',
  styleUrls: ['./tour-executing.component.css']
})
export class TourExecutingComponent implements OnInit {

  changePositionObservable: Observable<any>
  clickedKeyPoint: KeyPoint
  positionSubscription: Subscription
  touristId: number
  session: TourExecutionSession = { id: 0, tourId: 0, status: TourExecutionSessionStatus.Started, nextKeyPointId: -1, lastActivity: null! }
  tour: Tour = {
    name: '.',
    description: '.',
    tags: ['.'],
    difficulty: 1
  }
  touristPosition: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, 
    private service: TourExecutionService, public dialogRef: MatDialog) { }

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

  checkKeyPointCompletion() {
    if (this.session.status !== TourExecutionSessionStatus.Started) return;
    
    this.service.checkKeyPointCompletion(this.session.tourId, this.touristPosition).subscribe((session) => {
      if(this.session.nextKeyPointId != session.nextKeyPointId){
        this.showSecret()
      }
      this.session = session;
      if(this.session.status == TourExecutionSessionStatus.Completed){
        alert('Tour completed')
      }
    }, () => {
      alert("No started tour!");
    });
  }

  getTouristPosition() {
    this.service.getTouristPositionByTouristId(this.touristId).subscribe({
      next: (result: TouristPosition) => {
        if (result) {
          this.touristPosition = { longitude: result.longitude, latitude: result.latitude };
        } else {
          return;
        }
      }
    });
  }
  showSecret(){
    alert('secret unlocked')
  }
  getTour() {
    this.service.getTour(this.session.tourId).subscribe({
      next: (result: Tour) => {
        this.tour = result;
        console.log(this.tour)
      }
    });
  }
  abandonTour(){
    if(this.session.status != TourExecutionSessionStatus.Started){
      this.router.navigate(['/purchasedtours'])
    }
    let r = confirm('Are you sure you want to leave this tour?')
    if (r) {
      this.service.abandonTour(this.session.tourId).subscribe({
        next: (result: TourExecutionSession) => {
          this.router.navigate(['/purchasedtours'])
        }
      });
    }
  }

  getLiveTourExecution() {
    this.service.getLiveTour().subscribe({
      next: (result: TourExecutionSession) => {
        if (result != null) {
          this.session = result
        }
      }
    })
  }
  getKeyPoint(LatLng: any){
    this.tour.keyPoints?.forEach(keyPoint =>{
      if(keyPoint.latitude == LatLng.lat && keyPoint.longitude == LatLng.lng){
        this.clickedKeyPoint = keyPoint
      }
    })
    this.dialogRef.open(ClickedKeyPointComponent, {
      width: '380px',
      height: '420px',
      data: {
        dataKey: this.clickedKeyPoint
      }
    });
  }
}
