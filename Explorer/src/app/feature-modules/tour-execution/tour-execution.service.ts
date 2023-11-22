import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../tour-authoring/model/tour.model';
import { HttpClient } from '@angular/common/http';
import { TouristPosition } from './model/tourist-position.model';
import { environment } from 'src/env/environment';
import { TourExecutionSession } from './model/tour-execution-session-model';
import { TourExecutionSessionInfo } from './model/tour-execution-session-info.model';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http: HttpClient) { }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(
      environment.apiHost + "tourexecution/tourexecution/purchasedtours"
    );
  }

  getTour(tourId: number): Observable<Tour> {
    return this.http.get<Tour>(
      environment.apiHost + "tourexecution/tourexecution/" + tourId
    );
  }
  getLiveTour(): Observable<TourExecutionSession>{
    return this.http.get<TourExecutionSession>(environment.apiHost + "tourexecution/tourexecution/live");
  }
  startTour(tourId: number): Observable<TourExecutionSession> {
    return this.http.post<TourExecutionSession>(environment.apiHost + "tourexecution/tourexecution/" + tourId, null);
  }
  abandonTour(tourId: number): Observable<TourExecutionSession> {
    return this.http.put<TourExecutionSession>(environment.apiHost + "tourexecution/tourexecution/abandoning?tourId="+tourId, null)
  }
  addTouristPosition(touristPosition: TouristPosition): Observable<TouristPosition> {
    return this.http.post<TouristPosition>(environment.apiHost + 'tour-execution/tourists/position', touristPosition);
  }

  updateTouristPosition(touristPosition: TouristPosition): Observable<TouristPosition> {
    return this.http.put<TouristPosition>(environment.apiHost + 'tour-execution/tourists/position', touristPosition);
  }

  getTouristPositionByTouristId(touristId: number): Observable<TouristPosition> {
    return this.http.get<TouristPosition>(environment.apiHost + 'tour-execution/tourists/' + touristId + '/position');
  }

  checkKeyPointCompletion(tourId: number, touristPosition: TouristPosition): Observable<TourExecutionSession> {
    return this.http.put<TourExecutionSession>(environment.apiHost + 'tourexecution/tourexecution/' + tourId + '/keypoint', touristPosition);
  }

  getTourExecutionSessionInfo(): Observable<TourExecutionSessionInfo[]> {
    return this.http.get<TourExecutionSessionInfo[]>(environment.apiHost + 'tourexecution/tourexecution/allInfo');
  }
}
