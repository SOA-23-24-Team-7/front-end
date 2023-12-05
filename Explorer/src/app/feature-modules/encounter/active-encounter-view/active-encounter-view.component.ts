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
        longitude: 19.84113513341626,
        latitude: 45.260218642510154,
    };

    constructor(private service: EncounterService) {}

    ngOnInit(): void {
        this.loadEncountersInRangeOfFromCurrentLocation(this.userPosition);
        this.mapComponent.setMarker(
            this.userPosition.latitude,
            this.userPosition.longitude,
        );
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
