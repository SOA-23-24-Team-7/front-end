import { Component, Input } from "@angular/core";
import { KeyPointNotification } from "../../marketplace/model/keypoint-notification";
import { FacilityNotification } from "../../marketplace/model/facility-notification";

@Component({
    selector: "xp-public-keypoint-notification-card",
    templateUrl: "./public-keypoint-notification-card.component.html",
    styleUrls: ["./public-keypoint-notification-card.component.css"],
})
export class PublicKeypointNotificationCardComponent {
    @Input() notification: KeyPointNotification | FacilityNotification;
}
