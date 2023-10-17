import { Component, OnInit } from '@angular/core';
import { Review } from '../model/review.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  user: User;

  reviews: Review[] = [];
  selectedReview: Review;
  shouldEdit: boolean;
  shouldRenderReviewForm: boolean = false;

  constructor(private service: MarketplaceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.service.getReviews().subscribe({
      next: (result: PagedResults<Review>) => {
        this.reviews = result.results;
      },
      error: (err: any) => {
        console.log(err)
      }
    })

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  getReviews(): void{
    this.service.getReviews().subscribe({
      next: (result: PagedResults<Review>) => {
        this.reviews=result.results
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  onEditClicked(review: Review): void {
    this.selectedReview = review;
    this.shouldEdit = true;
  }

  onAddClicked(): void {
    this.shouldRenderReviewForm = true;
    this.shouldEdit = false;
  }

  deleteReview(review: Review): void {
    this.service.deleteReview(review).subscribe({
      next: () => { 
        this.getReviews();
      }
    });
  }

}
