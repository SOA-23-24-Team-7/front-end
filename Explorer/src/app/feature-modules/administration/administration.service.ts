import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Equipment } from "./model/equipment.model";
import { environment } from "src/env/environment";
import { Observable } from "rxjs";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Person } from "../stakeholder/model/person.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { Rating } from "./model/rating.model";
import { RatingUsername } from "./model/ratingWithUsername";
import { Problem } from "../marketplace/model/problem.model";
import { PublicKeyPointRequest } from "../tour-authoring/model/public-key-point-request.model";
import { PublicFacilityRequest } from "../tour-authoring/model/public-facility-request.model";

@Injectable({
    providedIn: "root",
})
export class AdministrationService {
    constructor(private http: HttpClient) {}

    getUsersByAdmin(): Observable<PagedResults<Person>> {
        return this.http.get<PagedResults<Person>>(
            environment.apiHost + "administration/people",
        );
    }

    disableAccount(id: number): Observable<User> {
        return this.http.get<User>(
            environment.apiHost + "administration/users/disable/" + id,
        );
    }

    getEquipment(): Observable<PagedResults<Equipment>> {
        return this.http.get<PagedResults<Equipment>>(
            environment.apiHost + "administration/equipment",
        );
    }

    getRatings(): Observable<PagedResults<RatingUsername>> {
        return this.http.get<PagedResults<RatingUsername>>(
            environment.apiHost + "rating/ratings",
        );
    }

    deleteEquipment(id: number): Observable<Equipment> {
        return this.http.delete<Equipment>(
            environment.apiHost + "administration/equipment/" + id,
        );
    }

    addEquipment(equipment: Equipment): Observable<Equipment> {
        return this.http.post<Equipment>(
            environment.apiHost + "administration/equipment",
            equipment,
        );
    }

    updateEquipment(equipment: Equipment): Observable<Equipment> {
        return this.http.put<Equipment>(
            environment.apiHost + "administration/equipment/" + equipment.id,
            equipment,
        );
    }

    getProblem(): Observable<PagedResults<Problem>> {
        return this.http.get<PagedResults<Problem>>(
            environment.apiHost + "administration/problem",
        );
    }
    getRequests(): Observable<PagedResults<PublicKeyPointRequest>> {
        return this.http.get<PagedResults<PublicKeyPointRequest>>(
            environment.apiHost + "administration/requests",
        );
    }
    acceptPublicKeyPointRequest(
        requestId: number,
    ): Observable<PublicKeyPointRequest> {
        const route =
            environment.apiHost + "administration/requests/accept/" + requestId;
        return this.http.patch<any>(route, { observe: "response" });
    }
    rejectPublicKeyPointRequest(
        requestId: number,
        comment: string,
    ): Observable<PublicKeyPointRequest> {
        const route =
            environment.apiHost +
            "administration/requests/reject/" +
            requestId +
            "/" +
            comment;
        return this.http.patch<any>(route, { observe: "response" });
    }
    getFacilityRequests(): Observable<PagedResults<PublicFacilityRequest>> {
        return this.http.get<PagedResults<PublicFacilityRequest>>(
            environment.apiHost + "administration/requests/facility",
        );
    }
    acceptPublicFacilityRequest(
        requestId: number,
    ): Observable<PublicFacilityRequest> {
        const route =
            environment.apiHost +
            "administration/requests/facility/accept/" +
            requestId;
        return this.http.patch<any>(route, { observe: "response" });
    }
    rejectPublicFacilityRequest(
        requestId: number,
        comment: string,
    ): Observable<PublicFacilityRequest> {
        const route =
            environment.apiHost +
            "administration/requests/facility/reject/" +
            requestId +
            "/" +
            comment;
        return this.http.patch<any>(route, { observe: "response" });
    }
}
