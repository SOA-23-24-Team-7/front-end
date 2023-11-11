import { Component } from "@angular/core";
import { FacilityNotification } from "../model/facility-notification";
import { MarketplaceService } from "../marketplace.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";

@Component({
    selector: "xp-facilities-notifications",
    templateUrl: "./facilities-notifications.component.html",
    styleUrls: ["./facilities-notifications.component.css"],
})
export class FacilitiesNotificationsComponent {
    facilityNotifications: FacilityNotification[] = [];
    constructor(private service: MarketplaceService) {}
    ngOnInit(): void {
        this.getByAuthorId();
    }
    getByAuthorId(): void {
        this.service.getFacilityNotificationsByAuthorId().subscribe({
            next: (result: PagedResults<FacilityNotification>) => {
                this.facilityNotifications = result.results;
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }
}
