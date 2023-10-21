import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import {Tour} from './model/tour.model';
import { Equipment } from './model/equipment.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  constructor(private http: HttpClient) { }
  getTours(): Observable<PagedResults<Tour>>{
    return this.http.get<PagedResults<Tour>>('https://localhost:44333/api/tour/authors');
  }

  addTour(tour: Tour): Observable<Tour>{
    return this.http.post<Tour>(environment.apiHost + 'tour',tour);
  }
  deleteTour(id: number): Observable<Tour> {
    return this.http.delete<Tour>(environment.apiHost + 'tour/' + id);
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(environment.apiHost + 'tour/' + tour.id, tour);
  }

  getEquipment(): Observable<PagedResults<Equipment>>{
    return this.http.get<PagedResults<Equipment>>(environment.apiHost + 'author/equipment');
  }

  getTourEquipment(id: number): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(environment.apiHost + 'tour/tourEquipment/' + id);
  }

  addTourEquipment(tourId:number, eqId:number): Observable<Tour> { 
    return this.http.post<Tour>(environment.apiHost + 'tour/tourEquipment/' + tourId + '/' + eqId,{});
  }

  deleteTourEquipment(tourId:number, eqId:number):Observable<Tour> {
    return this.http.delete<Tour>(environment.apiHost + 'tour/tourEquipment/' + tourId + '/' + eqId);
  }
}
