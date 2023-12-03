import { Component, Input, OnInit } from "@angular/core";
import { Tour } from "../../tour-authoring/model/tour.model";
import { Router } from "@angular/router";
import { TourExecutionService } from "../tour-execution.service";
import { environment } from "src/env/environment";
import { Campaign } from "../model/campaign-info.model";
import { TourExecutionStart } from "../model/tour-execution-start-model";

@Component({
    selector: "xp-campaign-card",
    templateUrl: "./campaign-card.component.html",
    styleUrls: ["./campaign-card.component.css"],
})
export class CampaignCardComponent implements OnInit {
    execution: TourExecutionStart = {tourId: 0, isCampaign: false}
    @Input() campaign: Campaign;
    hasActiveCampaign: boolean = false
    tourImage: string;
    constructor(
        private router: Router,
        private service: TourExecutionService,
    ) {}
    ngOnInit(): void {
        this.tourImage =
            environment.imageHost + this.campaign.keyPoints![0].imagePath;
    }
    StartCampaign(){
        this.execution.tourId = this.campaign.id
        this.execution.isCampaign = true
        this.service.startTour(this.execution).subscribe(() => {
            this.router.navigate(["/tour-executing/" + this.campaign.id, {isCampaign: true}]);
        });
    }
}
