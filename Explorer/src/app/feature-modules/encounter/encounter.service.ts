import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { environment } from "src/env/environment";
import { Encounter } from "./model/encounter.model";
import { KeyPointEncounter } from "./model/key-point-encounter.model";
import { TouristPosition } from "../tour-execution/model/tourist-position.model";

@Injectable({
    providedIn: "root",
})
export class EncounterService {
    getEncounterForKeyPoint(
        keyPointId: number,
        touristPosition: TouristPosition,
    ): Observable<KeyPointEncounter> {
        return this.http.post<KeyPointEncounter>(
            environment.apiHost + "tourist/encounter/key-point/" + keyPointId,
            touristPosition,
        );
    }
    createKeyPointEncounter(
        keyPointEncounter: KeyPointEncounter,
    ): Observable<KeyPointEncounter> {
        return this.http.post<KeyPointEncounter>(
            environment.apiHost + "author/encounter",
            keyPointEncounter,
        );
    }

    constructor(private http: HttpClient) {}

    getActiveEncounters(): Observable<PagedResults<Encounter>> {
        return this.http.get<PagedResults<Encounter>>(
            environment.apiHost + "administrator/encounter/active",
        );
    }
}
