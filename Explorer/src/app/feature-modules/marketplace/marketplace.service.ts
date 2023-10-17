import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../administration/model/rating.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  addRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(environment.apiHost + 'rating/rating', rating);
  }

}
