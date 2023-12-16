import { Component, OnInit } from "@angular/core";
import { AuthService } from "./infrastructure/auth/auth.service";
import "leaflet-routing-machine";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    title = "Explorer";
    sideBar: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.checkIfUserExists();
    }

    showCart() {
        if (
            !document
                .querySelector(".navbar")!
                .classList.contains("navbar-not-home")
        ) {
            const navHeight =
                document.querySelector(".navbar")!.clientHeight + 1;
            document.getElementById(
                "sidebar",
            )!.style.marginTop = `${navHeight}px`;
        } else {
            document.getElementById("sidebar")!.style.marginTop = `0`;
        }

        document.getElementById("sidebar")!.classList.add("active");
        this.sideBar = true;
    }

    private checkIfUserExists(): void {
        this.authService.checkIfUserExists();
    }
}
