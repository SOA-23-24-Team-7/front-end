import { Component, OnInit } from '@angular/core';
import { TourPreference } from '../model/tour-preference.model'
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-tour-preferences',
  templateUrl: './tour-preferences.component.html',
  styleUrls: ['./tour-preferences.component.css']
})
export class TourPreferencesComponent implements OnInit {

  tourPreference: TourPreference[] = []

  constructor(private service: MarketplaceService) { }

  ngOnInit(): void {
    this.service.getTourPreference().subscribe({
      next: (result: PagedResults<TourPreference>) => {
        this.tourPreference = result.results;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  // tourPreference: TourPreference[] = [
  //   {
  //     userId: 0,
  //     difficultyLevel: 3,
  //     walkingRating: 3,
  //     cyclingRating: 3,
  //     carRating: 2,
  //     boatRating: 2,
  //     selectedTags: ["prvi", "drugi"]
  //   }
  // ];
}
