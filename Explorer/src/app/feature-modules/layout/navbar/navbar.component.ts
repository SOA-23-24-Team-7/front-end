import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { ThemeService } from "../../../infrastructure/theme/theme.service";
import { NavigationStart, NavigationEnd, Router } from "@angular/router";
import { LoginComponent } from "src/app/infrastructure/auth/login/login.component";
import { RegistrationComponent } from "src/app/infrastructure/auth/registration/registration.component";
import { 
    faChevronDown, 
    faPhone, 
    faGear, 
    faQuestionCircle, 
    faSun, 
    faMoon,
    faGlobe,
    faEuroSign,
    faUser,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
//import { } from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: "xp-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
    user: User | undefined;
    isHome: boolean = false;

    constructor(
        private authService: AuthService,
        private themeService: ThemeService,
        private router: Router,
        public dialogRef: MatDialog
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if ((event.url !== "" && event.url !== "/")) {
                    this.isHome = false;
                } else  {
                    this.isHome = true;
                }
            }
        });
    }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
    }

    onLogin(): void {
        this.dialogRef.open(LoginComponent);
    }

    onRegister(): void {
        this.dialogRef.open(RegistrationComponent);
    }

    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['']);
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    getTheme(): string {
        return this.themeService.getTheme();
    }

    faChevronDown= faChevronDown;
    faQuestionCircle = faQuestionCircle;
    faPhone = faPhone;
    faGear= faGear;
    faSun = faSun;
    faMoon = faMoon;
    faGlobe = faGlobe;
    faEuroSign = faEuroSign;
    faUser = faUser;
    faRightFromBracket = faRightFromBracket;
}
