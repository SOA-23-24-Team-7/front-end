import { Injectable } from '@angular/core';
import { KeyPoint } from './model/key-point.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  constructor(private http: HttpClient) { }

  getKeyPoints(tourId: number): Observable<KeyPoint[]> {
    return this.http.get<KeyPoint[]>(environment.apiHost + 'tour-authoring/tours/' + tourId + '/key-points')
  }

  deleteKeyPoint(id: number): Observable<KeyPoint> {
    return this.http.delete<KeyPoint>(environment.apiHost + 'administration/equipment/' + id);
  }

  addKeyPoint(keyPoint: KeyPoint): Observable<KeyPoint> {
    return this.http.post<KeyPoint>(environment.apiHost + 'tour-authoring/tours/' + keyPoint.tourId + '/key-points', keyPoint);
  }

  updateKeyPoint(equipment: KeyPoint): Observable<KeyPoint> {
    return this.http.put<KeyPoint>(environment.apiHost + 'administration/equipment/' + equipment.id, equipment);
  }

  uploadImage(image: File): Observable<string> {
    let formData = new FormData();
    formData.append('image', image);
    return this.http.post(environment.apiHost + 'images', formData, { responseType: 'text' });
  }

}
