import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Review } from './model/review.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getReviews(): Observable<PagedResults<Review>> {
    return this.http.get<PagedResults<Review>>(environment.apiHost + 'review');
  }
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(environment.apiHost + 'review', review);
  }
  updateReview(review: Review): Observable<Review> {
    return this.http.put<Review>(environment.apiHost + 'review/'+ review.id,review);
  }
  deleteReview(review: Review): Observable<Review> {
    return this.http.delete<Review>(environment.apiHost + 'review/'+ review.id);
  }
}
