import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Equipment } from '../administration/model/equipment.model';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TouristEquipment } from './model/touristequipment.model';
import { Tour } from '../tour-authoring/model/tour.model';
import { Blog } from '../blog/model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient) { }

  getEquipment(): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(environment.apiHost + 'tourist/only_equipment');
  }

  getTouristEquipment(): Observable<PagedResults<TouristEquipment>> {
    return this.http.get<PagedResults<TouristEquipment>>(environment.apiHost + 'tourist/equipment');
  }

  saveTouristEquipment(touristEquipment: TouristEquipment): Observable<TouristEquipment> {
    return this.http.put<TouristEquipment>(environment.apiHost + 'tourist/equipment', touristEquipment);
  }

  createTouristEquipment(touristEquipment: TouristEquipment): Observable<TouristEquipment> {
    return this.http.post<TouristEquipment>(environment.apiHost + 'tourist/equipment', touristEquipment);
  }

  deleteTouristEquipment(id: number): Observable<TouristEquipment> {
    return this.http.delete<TouristEquipment>(environment.apiHost + 'tourist/equipment/' + id);
  }
  getAdventureTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'market-place/tours/adventure');
  }
  getFamilyTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'market-place/tours/family');
  }
  getCruiseTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'market-place/tours/cruise');
  }
  getCulturalTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'market-place/tours/cultural');
  }
  getPopularBlogs(): Observable<PagedResults<Blog>> {
    return this.http.get<PagedResults<Blog>>(environment.apiHost + 'blog');
  }
  getRecommendedTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(environment.apiHost+'tourist/tourrecommenders/recommendedtours');
  }
}
