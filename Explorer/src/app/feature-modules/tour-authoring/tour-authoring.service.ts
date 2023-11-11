import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Tour } from "./model/tour.model";
import { Equipment } from "./model/equipment.model";
import { Observable } from "rxjs";
import { environment } from "src/env/environment";
import { KeyPoint } from "./model/key-point.model";
import { Facilities } from "./model/facilities.model";
import { PublicKeyPointRequest } from "./model/public-key-point-request.model";
import { PublicFacilityRequest } from "./model/public-facility-request.model";
import { PublicKeyPoint } from "./model/public-key-point.model";
import { Person } from "../stakeholder/model/person.model";

@Injectable({
    providedIn: "root",
})
export class TourAuthoringService {
    constructor(private http: HttpClient) {}

    getTours(): Observable<PagedResults<Tour>> {
        return this.http.get<PagedResults<Tour>>(
            "https://localhost:44333/api/tour/authors",
        );
    }

    addTour(tour: Tour): Observable<Tour> {
        return this.http.post<Tour>(environment.apiHost + "tour", tour);
    }

    deleteTour(id: number): Observable<Tour> {
        return this.http.delete<Tour>(environment.apiHost + "tour/" + id);
    }

    updateTour(tour: Tour): Observable<Tour> {
        return this.http.put<Tour>(
            environment.apiHost + "tour/" + tour.id,
            tour,
        );
    }

    getKeyPoints(tourId: number): Observable<KeyPoint[]> {
        return this.http.get<KeyPoint[]>(
            environment.apiHost +
                "market-place/tours/" +
                tourId +
                "/key-points",
        );
    }

    deleteKeyPoint(tourId: number, id: number): Observable<KeyPoint> {
        return this.http.delete<KeyPoint>(
            environment.apiHost +
                "tour-authoring/tours/" +
                tourId +
                "/key-points/" +
                id,
        );
    }

    addKeyPoint(keyPoint: KeyPoint): Observable<KeyPoint> {
        return this.http.post<KeyPoint>(
            environment.apiHost +
                "tour-authoring/tours/" +
                keyPoint.tourId +
                "/key-points",
            keyPoint,
        );
    }

    updateKeyPoint(keyPoint: KeyPoint): Observable<KeyPoint> {
        return this.http.put<KeyPoint>(
            environment.apiHost +
                "tour-authoring/tours/" +
                keyPoint.tourId +
                "/key-points/" +
                keyPoint.id,
            keyPoint,
        );
    }

    uploadImage(image: File): Observable<string> {
        let formData = new FormData();
        formData.append("image", image);
        return this.http.post(environment.apiHost + "images", formData, {
            responseType: "text",
        });
    }

    getFacilities(): Observable<PagedResults<Facilities>> {
        return this.http.get<PagedResults<Facilities>>(
            environment.apiHost + "facility",
        );
    }

    getAuthorsFacilities(): Observable<PagedResults<Facilities>> {
        return this.http.get<PagedResults<Facilities>>(
            environment.apiHost + "facility/authorsFacilities",
        );
    }

    addFacility(facility: Facilities): Observable<Facilities> {
        return this.http.post<Facilities>(
            environment.apiHost + "facility",
            facility,
        );
    }

    updateFacility(facility: Facilities): Observable<Facilities> {
        return this.http.put<Facilities>(
            environment.apiHost + "facility/" + facility.id,
            facility,
        );
    }

    deleteFacility(facility: Facilities): Observable<Facilities> {
        return this.http.delete<Facilities>(
            environment.apiHost + "facility/" + facility.id,
        );
    }

    getEquipment(): Observable<PagedResults<Equipment>> {
        return this.http.get<PagedResults<Equipment>>(
            environment.apiHost + "author/equipment",
        );
    }

    getTourEquipment(id: number): Observable<PagedResults<Equipment>> {
        return this.http.get<PagedResults<Equipment>>(
            environment.apiHost + "tour/equipment/" + id,
        );
    }

    addTourEquipment(tourId: number, eqId: number): Observable<Tour> {
        return this.http.post<Tour>(
            environment.apiHost + "tour/equipment/" + tourId + "/" + eqId,
            {},
        );
    }

    deleteTourEquipment(tourId: number, eqId: number): Observable<Tour> {
        return this.http.delete<Tour>(
            environment.apiHost + "tour/equipment/" + tourId + "/" + eqId,
        );
    }

    addPublicKeyPointRequest(
        request: PublicKeyPointRequest,
    ): Observable<PublicKeyPointRequest> {
        return this.http.post<PublicKeyPointRequest>(
            environment.apiHost + "publicKeyPointRequest",
            request,
        );
    }

    addPublicFacilityRequest(
        request: PublicFacilityRequest,
    ): Observable<PublicFacilityRequest> {
        return this.http.post<PublicFacilityRequest>(
            environment.apiHost + "publicFacilityRequest",
            request,
        );
    }

    getTour(tourId: number): Observable<Tour> {
        return this.http.get<Tour>(environment.apiHost + "tour/" + tourId);
    }

    getPublicKeyPoints(): Observable<PagedResults<PublicKeyPoint>> {
        return this.http.get<PagedResults<PublicKeyPoint>>(
            environment.apiHost + "author/publicKeyPoint",
        );
    }

    publishTour(tour: Tour): Observable<Tour> {
        return this.http.put<Tour>(
            environment.apiHost + "tour/publish/" + tour.id,
            tour,
        );
    }
    archiveTour(tour: Tour): Observable<Tour> {
        return this.http.put<Tour>(
            environment.apiHost + "tour/archive/" + tour.id,
            tour,
        );
    }

    addPublicKeyPoint(
        tourId: number,
        publicKeyPointId: number,
    ): Observable<KeyPoint> {
        return this.http.post<KeyPoint>(
            environment.apiHost +
                "author/publicKeyPoint/addPrivate/" +
                tourId +
                "/" +
                publicKeyPointId,
            {},
        );
    }

    getPerson(userId: number): Observable<Person> {
        return this.http.get<Person>(
            environment.apiHost + "people/person/" + userId,
        );
    }
}
