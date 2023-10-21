import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Facilities } from './model/facilities.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  constructor(private http: HttpClient) { }

  getFacilities(): Observable<PagedResults<Facilities>>{
    return this.http.get<PagedResults<Facilities>>(environment.apiHost + 'facility');
  }

  getAuthorsFacilities(): Observable<PagedResults<Facilities>>{
    return this.http.get<PagedResults<Facilities>>(environment.apiHost + 'facility/authorsFacilities');
  }

  addFacility(facility: Facilities): Observable<Facilities> {
    return this.http.post<Facilities>(environment.apiHost + 'facility', facility);
  }

  updateFacility(facility: Facilities): Observable<Facilities>{
    return this.http.put<Facilities>(environment.apiHost + 'facility/' + facility.id, facility);
  } 

  deleteFacility(facility: Facilities): Observable<Facilities>{
    return this.http.delete<Facilities>(environment.apiHost + 'facility/' + facility.id);
  }
}