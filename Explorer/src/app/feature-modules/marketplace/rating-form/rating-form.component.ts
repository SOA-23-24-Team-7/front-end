import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rating } from '../../administration/model/rating.model';
import { AdministrationService } from '../../administration/administration.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MarketplaceService } from '../marketplace.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnChanges {

  @Input() rating: Rating;

  constructor(private marketplaceService: MarketplaceService, private authService: AuthService, private router: Router) {
  }

  ratingForm = new FormGroup({
    grade: new FormControl(5, [Validators.required]),
    comment: new FormControl('', []),
  });

  ngOnChanges(): void {
    this.ratingForm.reset();
    
  }

  addRating(): void {
    const rating: Rating = {
      grade: this.ratingForm.value.grade || 5,
      comment: this.ratingForm.value.comment || "",
      dateTime: new Date(),
      userId: this.authService.user$.getValue().id
    };
    this.marketplaceService.addRating(rating).subscribe({
      next: () => { this.router.navigate(['../home'])}
    });
  }
}

