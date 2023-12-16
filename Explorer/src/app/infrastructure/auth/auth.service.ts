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
import { TouristProgress } from "./model/tourist-progress.model";
import { MarketplaceService } from "src/app/feature-modules/marketplace/marketplace.service";

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
        latitude: 45.2,
        longitude: 19.8,
    });

    constructor(
        private http: HttpClient,
        private tokenStorage: TokenStorage,
        private router: Router,
        private marketPlaceService: MarketplaceService,
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
        this.userLocation$.next({ latitude: 45.2, longitude: 19.8 });
        localStorage.setItem("userLat", "45.2");
        localStorage.setItem("userLong", "19.8");
    }

    checkIfUserExists(): void {
        const accessToken = this.tokenStorage.getAccessToken();
        if (accessToken == null) {
            return;
        }
        this.setUser();
        this.loadUserPos();
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
        if (user.role === "tourist") {
            this.http
                .get<TouristProgress>(
                    environment.apiHost + "tourist/encounter/progress",
                )
                .subscribe({
                    next: progress => {
                        user.touristProgress = progress;
                        this.user$.next(user);
                    },
                    error: () => {},
                });
            this.marketPlaceService.getShoppingCart(user.id).subscribe();
        }
    }

    getCurrentUserId(): number {
        const jwtHelperService = new JwtHelperService();
        const accessToken = this.tokenStorage.getAccessToken() || "";
        const decodedToken = jwtHelperService.decodeToken(accessToken);

        return decodedToken.id;
    }

    setUserLocation(pos: LocationCoords) {
        this.userLocation$.next(pos);
        localStorage.setItem("userLong", pos.longitude.toString());
        localStorage.setItem("userLat", pos.latitude.toString());
    }

    loadUserPos() {
        const long = localStorage.getItem("userLong");
        const lat = localStorage.getItem("userLat");
        if (long && lat) {
            this.setUserLocation({
                longitude: parseFloat(long),
                latitude: parseFloat(lat),
            });
        }
    }

    updateXp() {
        if (this.user$.value.role === "tourist") {
            this.http
                .get<TouristProgress>(
                    environment.apiHost + "tourist/encounter/progress",
                )
                .subscribe({
                    next: progress => {
                        this.user$.value.touristProgress = progress;
                    },
                    error: () => {},
                });
        }
    }
}
