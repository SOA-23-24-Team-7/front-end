import { Component, Input } from "@angular/core";
import {
    PublicKeyPointRequest,
    PublicStatus,
} from "../../tour-authoring/model/public-key-point-request.model";

@Component({
    selector: "xp-request-key-point-card",
    templateUrl: "./request-key-point-card.component.html",
    styleUrls: ["./request-key-point-card.component.css"],
})
export class RequestKeyPointCardComponent {
    @Input() request: PublicKeyPointRequest;

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
