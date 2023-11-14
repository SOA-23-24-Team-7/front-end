import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TouristPosition } from './model/tourist-position.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http: HttpClient) { }

  addTouristPosition(touristPosition: TouristPosition): Observable<TouristPosition> {
    return this.http.post<TouristPosition>(environment.apiHost + 'tour-execution/tourists/position', touristPosition);
  }

  updateTouristPosition(touristPosition: TouristPosition): Observable<TouristPosition> {
    return this.http.put<TouristPosition>(environment.apiHost + 'tour-execution/tourists/position', touristPosition);
  }

  getTouristPositionByTouristId(touristId: number): Observable<TouristPosition> {
    return this.http.get<TouristPosition>(environment.apiHost + 'tour-execution/tourists/' + touristId + '/position');
  }
}
