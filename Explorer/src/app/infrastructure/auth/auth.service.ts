import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TokenStorage } from "./jwt/token.service";
import { environment } from "src/env/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Login } from "./model/login.model";
import { AuthenticationResponse } from "./model/authentication-response.model";
import { User } from "./model/user.model";
import { Registration } from "./model/registration.model";
import { LocationCoords } from "src/app/shared/model/location-coords.model";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    user$ = new BehaviorSubject<User>({
        username: "",
        id: 0,
        role: "",
        profilePicture: "",
    });
    userLocation$ = new BehaviorSubject<LocationCoords>({
        longitude: 45.2,
        latitude: 19.8,
    });

    constructor(
        private http: HttpClient,
        private tokenStorage: TokenStorage,
        private router: Router,
    ) {}

    login(login: Login): Observable<AuthenticationResponse> {
        return this.http
            .post<AuthenticationResponse>(
                environment.apiHost + "users/login",
                login,
            )
            .pipe(
                tap(authenticationResponse => {
                    this.tokenStorage.saveAccessToken(
                        authenticationResponse.accessToken,
                    );
                    this.setUser();
                }),
            );
    }

    register(registration: Registration): Observable<AuthenticationResponse> {
        return this.http
            .post<AuthenticationResponse>(
                environment.apiHost + "users",
                registration,
            )
            .pipe(
                tap(authenticationResponse => {
                    this.tokenStorage.saveAccessToken(
                        authenticationResponse.accessToken,
                    );
                    this.setUser();
                }),
            );
    }

    logout(): void {
        this.tokenStorage.clear();
        this.router.navigate([""]);
        this.user$.next({ username: "", id: 0, role: "", profilePicture: "" });
        this.userLocation$.next({ longitude: 45.2, latitude: 19.8 });
    }

    checkIfUserExists(): void {
        const accessToken = this.tokenStorage.getAccessToken();
        if (accessToken == null) {
            return;
        }
        this.setUser();
    }

    private setUser(): void {
        const jwtHelperService = new JwtHelperService();
        const accessToken = this.tokenStorage.getAccessToken() || "";
        const user: User = {
            id: +jwtHelperService.decodeToken(accessToken).id,
            username: jwtHelperService.decodeToken(accessToken).username,
            role: jwtHelperService.decodeToken(accessToken)[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
            profilePicture:
                jwtHelperService.decodeToken(accessToken).profilePicture,
        };
        this.user$.next(user);
    }

    getCurrentUserId(): number {
        const jwtHelperService = new JwtHelperService();
        const accessToken = this.tokenStorage.getAccessToken() || "";
        const decodedToken = jwtHelperService.decodeToken(accessToken);

        return decodedToken.id;
    }

    setUserLocation(pos: LocationCoords) {
        this.userLocation$.next(pos);
    }
}
