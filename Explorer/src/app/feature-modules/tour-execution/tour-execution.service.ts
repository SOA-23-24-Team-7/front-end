import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../tour-authoring/model/tour.model';
import { HttpClient } from '@angular/common/http';
import { TouristPosition } from './model/tourist-position.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http: HttpClient) { }
  getTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(
      environment.apiHost + "tourexecuting/tourexecution/purchasedtours"
    );
}

  getTour(tourId : number): Observable<Tour> {
  return this.http.get<Tour>(
      environment.apiHost + "tourexecuting/tourexecution/" + tourId
  );
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
}
