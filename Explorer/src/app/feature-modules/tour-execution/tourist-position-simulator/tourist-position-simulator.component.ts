import { Component, Input, OnInit } from '@angular/core';
import { TourExecutionService } from '../tour-execution.service';
import { TouristPosition } from '../model/tourist-position.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-tourist-position-simulator',
  templateUrl: './tourist-position-simulator.component.html',
  styleUrls: ['./tourist-position-simulator.component.css']
})
export class TouristPositionSimulatorComponent implements OnInit {

  touristPosition: TouristPosition;
  @Input() isTourExecutionMap = false;
  @Input() tourId: any;
  constructor(private authService: AuthService, private service: TourExecutionService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (userResult: User) => {
        this.service.getTouristPositionByTouristId(userResult.id).subscribe({
          next: (result: TouristPosition) => {
            this.touristPosition = { touristId: userResult.id, longitude: result.longitude, latitude: result.latitude };
          },
          error: () => {
          }
        });
      }
    });
  }

  changeTouristPosition(longLat: [number, number]): void {
    if (this.touristPosition) {
      [this.touristPosition.longitude, this.touristPosition.latitude] = longLat;
      this.service.updateTouristPosition(this.touristPosition).subscribe({
        next: (result: TouristPosition) => {
        }
      });
    } else {
      this.authService.user$.subscribe({
        next: (result: User) => {
          this.touristPosition = { touristId: result.id, longitude: longLat[0], latitude: longLat[1] }

          this.service.addTouristPosition(this.touristPosition).subscribe({
            next: (result: TouristPosition) => {
            }
          });
        }
      });
    }
  }
}
