import { Component, Input, OnInit } from "@angular/core";
import { Tour } from "../../tour-authoring/model/tour.model";
import { Router } from "@angular/router";
import { TourExecutionService } from "../tour-execution.service";
import { environment } from "src/env/environment";
import { Campaign } from "../model/campaign-info.model";

@Component({
    selector: "xp-campaign-card",
    templateUrl: "./campaign-card.component.html",
    styleUrls: ["./campaign-card.component.css"],
})
export class CampaignCardComponent implements OnInit {
    @Input() campaign: Campaign;
    tourImage: string;
    constructor(
        private router: Router,
        private service: TourExecutionService,
    ) {}
    ngOnInit(): void {
        this.tourImage =
            environment.imageHost + this.campaign.keyPoints![0].imagePath;
    }
}
