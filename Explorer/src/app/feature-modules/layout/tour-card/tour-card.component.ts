import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "xp-tour-card",
    templateUrl: "./tour-card.component.html",
    styleUrls: ["./tour-card.component.css"],
})
export class TourCardComponent {
    @Input() tour: any;
}
