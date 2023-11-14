import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Tour } from '../../tour-authoring/model/tour.model';

@Component({
  selector: 'xp-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit  {

  tourId: number;
  tour: Tour | undefined;
  canBeRated: boolean;

  constructor(private route: ActivatedRoute, private service: MarketplaceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tourId = params['tourId'];
      this.getTour(this.tourId);
      this.canTourBeRated(this.tourId);
    })
  }

  getTour(tourId: number): void {
    this.service.getTourById(tourId).subscribe({
      next: (result: Tour) => {
        this.tour = result;
      },
      error: (errData) => {
        console.log(errData);
      }
    })
  }

  canTourBeRated(tourId: number): void {
    this.service.canTourBeRated(tourId).subscribe({
      next: (result: boolean) => {
        this.canBeRated = result;
        console.log(this.canBeRated);
      },
      error: (errData) => {
        console.log(errData);
      }
    })
  }

}
