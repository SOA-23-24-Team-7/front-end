import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourPreference } from './model/tour-preference.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getTourPreference(): Observable<TourPreference> {
    return this.http.get<TourPreference>(environment.apiHost + 'tourist/tour-preferences');
  }

  addPreference(tourPreference: TourPreference): Observable<TourPreference> {
    return this.http.post<TourPreference>(environment.apiHost + 'tourist/tour-preferences/create', tourPreference);
  }

  deletePreference(id: number): Observable<TourPreference> {
    return this.http.delete<TourPreference>(environment.apiHost + 'tourist/tour-preferences/' + id);
  }

  updatePreference(preference: TourPreference): Observable<TourPreference> {
    return this.http.put<TourPreference>(environment.apiHost + 'tourist/tour-preferences', preference);
  }
}
