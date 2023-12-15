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
        document.getElementById("sidebar")!.classList.add("active");
        this.sideBar = true;
    }

    private checkIfUserExists(): void {
        this.authService.checkIfUserExists();
    }
}
