import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { PagedResults } from '../model/paged-results.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  search(street: string): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }

  //primer rada funkcije za nadmorsku visinu, treba izmeniti tako da prihvata nase paramtere za lat i long, izmenio sam samo ove lat i lon, a ovo 10,10 i 20,20 nisam ulazio sta je, vredi pogledati
  //return this.http.get('https://api.open-elevation.com/api/v1/lookup?locations=10,10|20,20|41.161758,-8.583933') ovako je izgledala originalna lajna
  getElevation(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://api.open-elevation.com/api/v1/lookup?locations=10,10|20,20|${lat},${lon}`
    );
  }

  getTourKeyPoints(tourId: number): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + `market-place/tours/${tourId}/key-points`
    );
  }

  getCampaignKeyPoints(campaignId: number): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + `market-place/${campaignId}/key-points`
    );
  }

  getAuthorsFacilities(): Observable<PagedResults<any>>{
    return this.http.get<PagedResults<any>>(environment.apiHost + 'facility/authorsFacilities');
  }
}
