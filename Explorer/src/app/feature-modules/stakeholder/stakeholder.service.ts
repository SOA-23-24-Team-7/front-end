import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Person } from './model/person.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PersonUpdate } from './model/person-update.model';

@Injectable({
  providedIn: 'root',
})
export class StakeholderService {
  constructor(private http: HttpClient) {}

  getPeople(): Observable<PagedResults<Person>> {
    return this.http.get<PagedResults<Person>>(environment.apiHost + 'people');
  }
  getByUserId(userId: number): Observable<PersonUpdate> {
    return this.http.get<PersonUpdate>(
      environment.apiHost + 'people/person/' + userId
    );
  }

  updatePerson(person: PersonUpdate): Observable<PersonUpdate> {
    return this.http.put<PersonUpdate>(
      environment.apiHost + 'people/update/' + person.id,
      person
    );
  }
}
