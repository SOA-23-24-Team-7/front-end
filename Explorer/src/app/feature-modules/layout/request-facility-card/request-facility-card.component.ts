import { Component, Input } from "@angular/core";
import {
    PublicFacilityRequest,
    PublicStatus,
} from "../../tour-authoring/model/public-facility-request.model";

@Component({
    selector: "xp-request-facility-card",
    templateUrl: "./request-facility-card.component.html",
    styleUrls: ["./request-facility-card.component.css"],
})
export class RequestFacilityCardComponent {
    @Input() request: PublicFacilityRequest;

    getPublicStatusText(status: PublicStatus | undefined): string {
        if (status === undefined) {
            return "N/A";
        }
        switch (status) {
            case PublicStatus.Accepted:
                return "Accepted";
            case PublicStatus.Rejected:
                return "Rejected";
            default:
                return "Pending";
        }
    }
}
