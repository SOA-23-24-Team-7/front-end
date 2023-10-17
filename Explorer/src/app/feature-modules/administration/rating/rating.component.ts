import { Component, OnInit } from '@angular/core';
import { Rating } from '../model/rating.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AdministrationService } from '../administration.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  ratings: Rating[] = [];

  constructor(private service: AdministrationService) { }

  ngOnInit(): void {
    this.getRatings();
  }

  getRatings(): void {
    this.service.getRatings().subscribe({
      next: (result: PagedResults<Rating>) => {
        this.ratings = result.results;
        for(var r of this.ratings){
          //r.userId = 4
        }
      },
      error: () => {
      }
    })
  }
}
