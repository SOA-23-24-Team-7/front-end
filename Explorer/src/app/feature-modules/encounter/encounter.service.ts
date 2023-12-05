import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { environment } from "src/env/environment";
import { Encounter } from "./model/encounter.model";
import { SocialEncounter } from "./model/social-encounter.model";
import { HiddenEncounter } from "./model/hidden-encounter.model";
import { MiscEncounter } from "./model/misc-encounter.model";

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
            environment.apiHost + "author/social-encounter/create",
            socialEncounter,
        );
    }

    createHiddenEncounter(
        hiddenEncounter: HiddenEncounter,
    ): Observable<HiddenEncounter> {
        return this.http.post<HiddenEncounter>(
            environment.apiHost + "author/hidden-location-encounter/create",
            hiddenEncounter,
        );
    }

    createMiscEncounter(
        miscEncounter: MiscEncounter,
    ): Observable<MiscEncounter> {
        return this.http.post<MiscEncounter>(
            environment.apiHost + "author/misc-encounter/create",
            miscEncounter,
        );
    }
}
