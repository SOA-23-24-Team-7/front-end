import { Component, Input } from "@angular/core";

@Component({
    selector: "xp-tour-cards",
    templateUrl: "./tour-cards.component.html",
    styleUrls: ["./tour-cards.component.css"],
})
export class TourCardsComponent {
    toursList = [
        {
            hasDiscount: true,
            image: "/assets/images/istanbul.jpg",
            name: "Istanbul",
            tags: [
                "Aya Sophia",
                "Dolmabahce Palace",
                "Galata Tower",
                "Topkapi Palace",
            ],
            averageRating: 4.5,
            price: "From €500",
        },
        {
            hasDiscount: false,
            image: "/assets/images/vietnam.jpg",
            name: "Vietnam",
            tags: ["Ha Long Bay", "Sapa", "Cu Chi Tunnels", "Mekong Delta"],
            averageRating: 5.0,
            price: "From €1,020",
        },
        {
            hasDiscount: false,
            image: "/assets/images/barcelona.jpeg",
            name: "Barcelona",
            tags: ["Sagrada Familia", "Park Guell", "Monserrat", "Camp Nou"],
            averageRating: 4.5,
            price: "From €980",
        },
        {
            hasDiscount: false,
            image: "/assets/images/mostar.jpg",
            name: "Mostar",
            tags: [
                "Old Bridge",
                "Neretva River",
                "Dervish Monastery",
                "Museum",
            ],
            averageRating: 3.5,
            price: "From €500",
        },
    ];
}
