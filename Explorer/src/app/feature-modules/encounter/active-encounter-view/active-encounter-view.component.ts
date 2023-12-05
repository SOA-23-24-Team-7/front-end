import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { EncounterService } from "../encounter.service";
import { Encounter } from "../model/encounter.model";
import { MapService } from "src/app/shared/map/map.service";
import { MapComponent } from "src/app/shared/map/map.component";
import { UserPositionWithRange } from "../model/user-position-with-range.model";

@Component({
    selector: "xp-active-encounter-view",
    templateUrl: "./active-encounter-view.component.html",
    styleUrls: ["./active-encounter-view.component.css"],
})
export class ActiveEncounterViewComponent {
    points: any;
    encounters: Encounter[];
    filteredEncounters: Encounter[];
    @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;

    userPosition: UserPositionWithRange = {
        range: 6000,
        longitude: 19.87309526440953,
        latitude: 45.25820732167992,
    };

    encounter = {
        id: 1,
        title: "Dunavac",
        description: "Dunavac",
        longitude: 19.851230184015492,
        latitude: 45.25525290879014,
        radius: 50,
        xpReward: 30,
        status: 0,
        type: 1,
    };

    constructor(private service: EncounterService) {}

    ngOnInit(): void {
        this.loadEncountersInRangeOfFromCurrentLocation(this.userPosition);
        if (this.checkIfUserInEncounterRange(this.encounter)) {
            console.log("Mozes da aktiviras encounter: ", this.encounter.title);
            // this.service
            //     .activateEncounter(this.userPosition, this.encounter.id)
            //     .subscribe();
            // this.service
            //     .completeHiddenLocationEncounter(this.userPosition, this.encounter.id)
            //     .subscribe();
        }
    }

    checkIfUserInEncounterRange(encounter: Encounter): boolean {
        const userLat = this.userPosition.latitude;
        const userLng = this.userPosition.longitude;
        const encounterLat = encounter.latitude;
        const encounterLng = encounter.longitude;
        const earthRadius = 6371;
        const toRadians = (value: number) => (value * Math.PI) / 180;
        const haversine = (a: number, b: number) =>
            Math.pow(Math.sin((b - a) / 2), 2);

        const distance =
            2 *
            earthRadius *
            Math.asin(
                Math.sqrt(
                    haversine(toRadians(userLat), toRadians(encounterLat)) +
                        Math.cos(toRadians(userLat)) *
                            Math.cos(toRadians(encounterLat)) *
                            haversine(
                                toRadians(userLng),
                                toRadians(encounterLng),
                            ),
                ),
            );
        console.log("Distanca je: ", distance);
        return distance <= encounter.radius;
    }

    loadEncountersInRangeOfFromCurrentLocation(
        userPosition: UserPositionWithRange,
    ) {
        this.service.getEncountersInRangeOf(userPosition).subscribe(result => {
            this.filteredEncounters = result.results;
            this.filteredEncounters.forEach(enc => {
                this.mapComponent.setEncounterMarker(
                    enc.latitude,
                    enc.longitude,
                );
            });
        });
    }
}
