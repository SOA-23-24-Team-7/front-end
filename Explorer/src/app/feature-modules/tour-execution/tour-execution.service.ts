import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../tour-authoring/model/tour.model';
import { HttpClient } from '@angular/common/http';
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
}
