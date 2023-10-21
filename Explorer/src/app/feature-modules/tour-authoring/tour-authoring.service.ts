import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from './model/tour.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { KeyPoint } from './model/key-point.model';

@Injectable({
  providedIn: 'root',
})
export class TourAuthoringService {
  constructor(private http: HttpClient) {}
  getTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(
      'https://localhost:44333/api/tour/authors'
    );
  }

  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(environment.apiHost + 'tour', tour);
  }
  deleteTour(id: number): Observable<Tour> {
    return this.http.delete<Tour>(environment.apiHost + 'tour/' + id);
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(environment.apiHost + 'tour/' + tour.id, tour);
  }

  getKeyPoints(tourId: number): Observable<KeyPoint[]> {
    return this.http.get<KeyPoint[]>(
      environment.apiHost + 'tour-authoring/tours/' + tourId + '/key-points'
    );
  }

  deleteKeyPoint(id: number): Observable<KeyPoint> {
    return this.http.delete<KeyPoint>(
      environment.apiHost + 'administration/equipment/' + id
    );
  }

  addKeyPoint(keyPoint: KeyPoint): Observable<KeyPoint> {
    return this.http.post<KeyPoint>(
      environment.apiHost +
        'tour-authoring/tours/' +
        keyPoint.tourId +
        '/key-points',
      keyPoint
    );
  }

  updateKeyPoint(equipment: KeyPoint): Observable<KeyPoint> {
    return this.http.put<KeyPoint>(
      environment.apiHost + 'administration/equipment/' + equipment.id,
      equipment
    );
  }

  uploadImage(image: File): Observable<string> {
    let formData = new FormData();
    formData.append('image', image);
    return this.http.post(environment.apiHost + 'images', formData, {
      responseType: 'text',
    });
  }
}
