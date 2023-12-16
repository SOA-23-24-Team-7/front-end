import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { environment } from "src/env/environment";
import { Encounter } from "./model/encounter.model";
import { KeyPointEncounter } from "./model/key-point-encounter.model";
import { TouristPosition } from "../tour-execution/model/tourist-position.model";
import { UserPositionWithRange } from "./model/user-position-with-range.model";
import { EncounterInstance } from "./model/encounter-instance.model";

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

    getEncounterInstance(encounterId: number): Observable<EncounterInstance> {
        return this.http.get<EncounterInstance>(
            environment.apiHost + `tourist/encounter/${encounterId}/instance`,
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

    checkIfUserInCompletionRange(
        userPositionWithRange: UserPositionWithRange,
        encounterId: number,
    ): Observable<boolean> {
        return this.http.post<boolean>(
            environment.apiHost +
                `tourist/hidden-location-encounter/${encounterId}/check-range`,
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
    ): Observable<Encounter> {
        return this.http.post<Encounter>(
            environment.apiHost +
                `tourist/hidden-location-encounter/${encounterId}/complete`,
            userPositionWithRange,
        );
    }

    completeEncounter(
        userPositionWithRange: UserPositionWithRange,
        encounterId: number,
    ): Observable<Encounter> {
        return this.http.post<Encounter>(
            environment.apiHost + `tourist/encounter/${encounterId}/complete`,
            userPositionWithRange,
        );
    }

    createSocialEncounter(
        socialEncounter: Encounter,
        isTourist: Boolean,
    ): Observable<Encounter> {
        const role = isTourist ? "tourist" : "author";
        return this.http.post<Encounter>(
            environment.apiHost + role + "/social-encounter/create",
            socialEncounter,
        );
    }

    createHiddenEncounter(
        hiddenEncounter: Encounter,
        isTourist: Boolean,
    ): Observable<Encounter> {
        const role = isTourist ? "tourist" : "author";
        return this.http.post<Encounter>(
            environment.apiHost + role + "/hidden-location-encounter/create",
            hiddenEncounter,
        );
    }

    createMiscEncounter(
        miscEncounter: Encounter,
        isTourist: Boolean,
    ): Observable<Encounter> {
        const role = isTourist ? "tourist" : "author";
        return this.http.post<Encounter>(
            environment.apiHost + role + "/misc-encounter/createMisc",
            miscEncounter,
        );
    }

    uploadImage(image: File): Observable<string> {
        let formData = new FormData();
        formData.append("image", image);
        return this.http.post(environment.apiHost + "images", formData, {
            responseType: "text",
        });
    }
}
