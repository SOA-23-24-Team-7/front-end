import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { environment } from "src/env/environment";
import { Encounter } from "./model/encounter.model";
import { SocialEncounter } from "./model/social-encounter.model";

@Injectable({
    providedIn: "root",
})
export class EncounterService {
    constructor(private http: HttpClient) {}

    getActiveEncounters(): Observable<PagedResults<Encounter>> {
        return this.http.get<PagedResults<Encounter>>(
            environment.apiHost + "administrator/encounter/active",
        );
    }

    createSocialEncounter(
        socialEncounter: SocialEncounter,
    ): Observable<SocialEncounter> {
        return this.http.post<SocialEncounter>(
            environment.apiHost + "author/encounter/social",
            socialEncounter,
        );
    }
}
