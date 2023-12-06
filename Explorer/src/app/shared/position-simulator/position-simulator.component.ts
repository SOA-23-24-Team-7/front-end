import { Component, OnInit } from "@angular/core";
import { LocationCoords } from "../model/location-coords.model";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "xp-position-simulator",
    templateUrl: "./position-simulator.component.html",
    styleUrls: ["./position-simulator.component.css"],
})
export class PositionSimulatorComponent implements OnInit {
    position: LocationCoords;
    constructor(private authService: AuthService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.authService.userLocation$.subscribe({
            next: (location: LocationCoords) => {
                this.position = location;
                // console.log(this.position);
            },
        });
    }

    changeTouristPosition(longLat: [number, number]): void {
        this.authService.setUserLocation({
            longitude: longLat[0],
            latitude: longLat[1],
        });
    }
}
