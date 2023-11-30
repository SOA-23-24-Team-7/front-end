import { Component, OnInit } from '@angular/core';
import { KeyPointCardComponent } from '../../tour-authoring/key-point-card/key-point-card.component';
import {
  faStar,
  faCoins,
  faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import { Tour } from '../../tour-authoring/model/tour.model';
import { ActivatedRoute } from '@angular/router';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { environment } from 'src/env/environment';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.css']
})
export class TourPageComponent {
  faStar = faStar;
  faCoins = faCoins;
  faCartShopping = faCartShopping;
  tour: Tour;
  tourId: number;
  imageHost: string = environment.imageHost;
  user: User;
  currentIndex: number = 0;
  keyPointContainer: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private service: TourAuthoringService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tourId = params['tourId'];
    })

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.service.getTour(this.tourId).subscribe({
      next: (result: Tour) => {
          this.tour = result;
          if(this.tour.keyPoints) this.imageHost += this.tour.keyPoints[0].imagePath;
      },
    });

    this.keyPointContainer = document.querySelector(
      ".key-point-cards-container",
    );
  }

  formatDate(date: Date | undefined): string | null {
    if (!this.tour) return '01. 01. 0001.'
    if(!date) return '01. 01. 0001.';
    const dateString = date?.toString();
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(5, 7), 10) - 1; 
    const day = parseInt(dateString.slice(8, 10), 10);
    return `${day}. ${month}. ${year}.`;
  }

  scrollToNextCard(): void {
    this.currentIndex++;
    if (this.currentIndex >= this.keyPointContainer.children.length) {
        this.currentIndex = 0;
    }
    this.keyPointContainer.scrollLeft +=
        this.keyPointContainer.children[this.currentIndex].clientWidth;
  }

scrollToPrevCard(): void {
    this.currentIndex--;
    if (this.currentIndex < 0) {
        this.currentIndex = this.keyPointContainer!.children.length - 1;
    }
    this.keyPointContainer!.scrollLeft -=
        this.keyPointContainer.children[this.currentIndex].clientWidth;
  }
}
