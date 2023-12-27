import { Component, Input, OnInit } from "@angular/core";
import { Tour } from "../../tour-authoring/model/tour.model";
import { Router } from "@angular/router";
import { TourExecutionService } from "../tour-execution.service";
import { environment } from "src/env/environment";
import { Campaign } from "../model/campaign-info.model";
import { TourExecutionStart } from "../model/tour-execution-start-model";
import { MatDialog } from "@angular/material/dialog";
import { CampaignEquipmentComponent } from "../campaign-equipment/campaign-equipment.component";

@Component({
    selector: "xp-campaign-card",
    templateUrl: "./campaign-card.component.html",
    styleUrls: ["./campaign-card.component.css"],
})
export class CampaignCardComponent implements OnInit {
    execution: TourExecutionStart = {tourId: 0, isCampaign: false}
    @Input() campaign: Campaign;
    isCampaignActive: boolean = false
    @Input() hasActiveTour: boolean;
    @Input() activeTourId: number;
    @Input() isCampaign: boolean;
    images: string[];
    isClicked: boolean = false;
    constructor(
        private router: Router,
        private service: TourExecutionService,
        public dialogRef: MatDialog
    ) {}
    ngOnInit(): void {
        this.images = this.campaign.keyPoints!.map(kp =>
            kp.imagePath.startsWith("http")
                ? kp.imagePath
                : environment.imageHost + kp.imagePath,
        );
        this.CheckIfCampaignIsActive()
    }
    StartCampaign(){
        this.execution.tourId = this.campaign.id
        this.execution.isCampaign = true
        this.service.startTour(this.execution).subscribe(() => {
            this.router.navigate(["/tour-executing/" + this.campaign.id, {isCampaign: true}]);
        });
    }
    CheckIfCampaignIsActive() {
        if (this.hasActiveTour) {
            if (this.campaign.id == this.activeTourId && this.isCampaign) {
                this.isCampaignActive = true;
            }
        }
    }
    ContinueCampaign(){
            this.router.navigate(["/tour-executing/" + this.campaign.id, {isCampaign: true}]);
    }
    ShowEquipment(){
        this.dialogRef.open(CampaignEquipmentComponent, {
            width: 'auto',
            height: 'auto',
            data: {
              dataKey: this.campaign.equipments
            }
          });
    }
}
