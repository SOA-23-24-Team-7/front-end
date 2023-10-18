import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Club } from './model/club.model';
import { MyClubJoinRequest } from './model/my-club-join-request.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getClubs(): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'tourist/club')
  }
  getOwnerClubs(): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'tourist/club/ownerclubs')
  }
  addClub(club: Club): Observable<Club> {
    return this.http.post<Club>(environment.apiHost + 'tourist/club', club);
  }
  updateEquipment(club: Club): Observable<Club> {
    return this.http.put<Club>(environment.apiHost + 'tourist/club/', club);
  }
  getMyClubJoinRequests(): Observable<PagedResults<MyClubJoinRequest>> {
    let route = `${environment.apiHost}tourist/club-join-request?page=1&pageSize=1000`
    return this.http.get<PagedResults<MyClubJoinRequest>>(route)
  }
  cancelClubJoinRequest(id: number): Observable<HttpResponse<any>> {
    let route = `${environment.apiHost}tourist/club-join-request/${id}`
    return this.http.delete(route, { observe: 'response' })
  }
}
