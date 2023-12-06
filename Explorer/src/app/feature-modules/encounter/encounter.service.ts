import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { environment } from "src/env/environment";
import { Encounter } from "./model/encounter.model";
import { UserPositionWithRange } from "./model/user-position-with-range.model";

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

    getEncountersInRangeOf(
        userPositionWithRange: UserPositionWithRange,
    ): Observable<PagedResults<Encounter>> {
        return this.http.post<PagedResults<Encounter>>(
            environment.apiHost + "tourist/encounter/in-range-of",
            userPositionWithRange,
        );
    }

    activateEncounter(
        userPositionWithRange: UserPositionWithRange,
        encounterId: number,
    ): Observable<PagedResults<Encounter>> {
        return this.http.post<PagedResults<Encounter>>(
            environment.apiHost + `tourist/encounter/${encounterId}/activate`,
            userPositionWithRange,
        );
    }

    getHiddenLocationEncounterById(encounterId: number): Observable<Encounter> {
        return this.http.get<Encounter>(
            environment.apiHost +
                "tourist/hidden-location-encounter/" +
                encounterId,
        );
    }

    completeHiddenLocationEncounter(
        userPositionWithRange: UserPositionWithRange,
        encounterId: number,
    ): Observable<PagedResults<Encounter>> {
        return this.http.post<PagedResults<Encounter>>(
            environment.apiHost +
                `tourist/hidden-location-encounter/${encounterId}/complete`,
            userPositionWithRange,
        );
    }

    createSocialEncounter(socialEncounter: Encounter): Observable<Encounter> {
        return this.http.post<Encounter>(
            environment.apiHost + "author/social-encounter/create",
            socialEncounter,
        );
    }

    createHiddenEncounter(hiddenEncounter: Encounter): Observable<Encounter> {
        return this.http.post<Encounter>(
            environment.apiHost + "author/hidden-location-encounter/create",
            hiddenEncounter,
        );
    }

    createMiscEncounter(miscEncounter: Encounter): Observable<Encounter> {
        return this.http.post<Encounter>(
            environment.apiHost + "author/misc-encounter/createMisc",
            miscEncounter,
        );
    }
}
