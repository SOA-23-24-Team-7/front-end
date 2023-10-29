import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Equipment } from "./model/equipment.model";
import { environment } from "src/env/environment";
import { Observable } from "rxjs";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { RatingUsername } from "./model/ratingWithUsername";

@Injectable({
    providedIn: "root",
})
export class AdministrationService {
    constructor(private http: HttpClient) {}

    getUsersByAdmin(): Observable<PagedResults<User>> {
        return this.http.get<PagedResults<User>>(
            environment.apiHost + "administration/users",
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
}
