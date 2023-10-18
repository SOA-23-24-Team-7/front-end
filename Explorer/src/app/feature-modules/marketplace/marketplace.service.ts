import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourPreference } from './model/tour-preference.model';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getTourPreference(): Observable<PagedResults<TourPreference>> {
    return this.http.get<PagedResults<TourPreference>>('https://localhost:44333/api/tourist/tour-preferences?id=5');
  }
}
