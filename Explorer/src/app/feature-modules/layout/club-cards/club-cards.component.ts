import { Component } from "@angular/core";

@Component({
    selector: "xp-club-cards",
    templateUrl: "./club-cards.component.html",
    styleUrls: ["./club-cards.component.css"],
})
export class ClubCardsComponent {
    clubsList = [
        {
            name: "Airlines Associations",
            image: "/assets/images/airlines.png",
        },
        {
            name: "Tour Guide Associations",
            image: "/assets/images/tour-guide.jpg",
        },
        {
            name: "Travel Clubs",
            image: "/assets/images/travel-club.jpg",
        },
        {
            name: "Hotel Associations",
            image: "/assets/images/hotel-association.jpg",
        },
    ];
}
