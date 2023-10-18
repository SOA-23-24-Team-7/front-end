import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../administration/model/rating.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  addRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(environment.apiHost + 'rating/rating', rating);
  }

  deleteRating(id: number): Observable<Rating> {
    return this.http.delete<Rating>(environment.apiHost + 'rating/rating/' + id);
  }

  getRating(id: number): Observable<Rating> {
    return this.http.get<Rating>(environment.apiHost + 'rating/rating/' + id);
  }

  updateRating(rating: Rating): Observable<Rating> {
    return this.http.put<Rating>(environment.apiHost + 'rating/rating/' + rating.id, rating);
  }
}
