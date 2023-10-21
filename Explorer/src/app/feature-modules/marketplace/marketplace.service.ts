import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Club } from './model/club.model';

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
  deleteClub(id: number): any {
    return this.http.delete<any>(environment.apiHost + 'tourist/club/' + id);
  }
}
