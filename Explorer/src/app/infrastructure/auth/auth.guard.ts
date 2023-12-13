import { Injectable } from "@angular/core";
import { CanActivate, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "./model/user.model";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const user: User = this.authService.user$.getValue();
        if (user.username === "") {
            this.router.navigate([""]);
            return false;
        }
        return true;
    }
}

@Injectable({
    providedIn: "root",
})
export class TouristGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const user: User = this.authService.user$.getValue();
        if (user.username === "" || user.role !== "tourist") {
            this.router.navigate([""]);
            return false;
        }
        return true;
    }
}

@Injectable({
    providedIn: "root",
})
export class AuthorGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const user: User = this.authService.user$.getValue();
        if (user.username === "" || user.role !== "author") {
            this.router.navigate([""]);
            return false;
        }
        return true;
    }
}

@Injectable({
    providedIn: "root",
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const user: User = this.authService.user$.getValue();
        if (user.username === "" || user.role !== "administrator") {
            this.router.navigate([""]);
            return false;
        }
        return true;
    }
}
