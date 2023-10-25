import { Component, Input } from "@angular/core";

@Component({
    selector: "xp-club-card",
    templateUrl: "./club-card.component.html",
    styleUrls: ["./club-card.component.css"],
})
export class ClubCardComponent {
    @Input() club: any;
}
