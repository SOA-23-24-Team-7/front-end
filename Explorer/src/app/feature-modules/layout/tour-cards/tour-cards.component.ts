import { Component, Input, OnInit } from "@angular/core";
import { LayoutService } from "../layout.services";
import { Tour } from "../../tour-authoring/model/tour.model";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Blog } from "../../blog/model/blog.model";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
@Component({
    selector: "xp-tour-cards",
    templateUrl: "./tour-cards.component.html",
    styleUrls: ["./tour-cards.component.css"],
})
export class TourCardsComponent implements OnInit {
    adventureTours:Tour[]
    culturalTours:Tour[]
    familyTours:Tour[]
    cruiseTours:Tour[]
    recommendedTours:Tour[]
    faCoins=faCoins;
    adventureContainer:any
    cruiseContainer:any
    familyContainer:any
    culturalContainer:any
    recommendedContainer:any
    user: User
    constructor(private service: LayoutService, private authService: AuthService){}
    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
            if(this.user.username != '' && this.user.role == 'tourist'){
            this.service.getRecommendedTours().subscribe({
                next:(result: PagedResults<Tour>)=>{
                    this.recommendedTours=result.results
                    
                }
            })
            }
        });
        this.adventureContainer = document.querySelector(
            ".adventure-card-container",
        );
        this.familyContainer = document.querySelector(
            ".family-card-container",
        );
        this.cruiseContainer = document.querySelector(
            ".cruise-card-container",
        );
        this.culturalContainer = document.querySelector(
            ".cultural-card-container",
        );
        this.recommendedContainer = document.querySelector(
            ".recommended-card-container"
        )
        this.service.getAdventureTours().subscribe({
            next:(result: PagedResults<Tour>)=>{
                this.adventureTours=result.results
                //console.log(this.adventureTours)
                this.adventureTours=this.adventureTours.filter(a=>a.averageRating as number>4)
                this.service.getCruiseTours().subscribe({
                    next:(result: PagedResults<Tour>)=>{
                        this.cruiseTours=result.results
                        this.cruiseTours=this.cruiseTours.filter(a=>a.averageRating as number>4)
                        this.service.getCulturalTours().subscribe({
                            next:(result: PagedResults<Tour>)=>{
                                this.culturalTours=result.results
                                this.culturalTours=this.culturalTours.filter(a=>a.averageRating as number>4)
                                this.service.getFamilyTours().subscribe({
                                    next:(result: PagedResults<Tour>)=>{
                                        this.familyTours=result.results
                                        this.familyTours=this.familyTours.filter(a=>a.averageRating as number>4)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    currentIndex1: number = 0;
    currentIndex2: number = 0;
    currentIndex3: number = 0;
    currentIndex4: number = 0;
    currentIndex5: number = 0;
    scrollToNextCulturalCard(): void {
        this.currentIndex1++;
        if (this.currentIndex1 >= this.culturalContainer.children.length) {
            this.currentIndex1 = 0;
        }
        this.culturalContainer.scrollLeft +=
            this.culturalContainer.children[this.currentIndex1].clientWidth;
    }

    scrollToPrevCulturalCard(): void {
        this.currentIndex1--;
        if (this.currentIndex1 < 0) {
            this.currentIndex1 = this.culturalContainer!.children.length - 1;
        }
        this.culturalContainer!.scrollLeft -=
            this.culturalContainer.children[this.currentIndex1].clientWidth;
    }
    scrollToNextCruiseCard() {
        this.currentIndex2++;
        if (this.currentIndex2 >= this.cruiseContainer.children.length) {
            this.currentIndex2 = 0;
        }
        this.cruiseContainer.scrollLeft +=
            this.cruiseContainer.children[this.currentIndex2].clientWidth;
    }
    scrollToPrevCruiseCard() {
        this.currentIndex2--;
        if (this.currentIndex2 < 0) {
            this.currentIndex2 = this.cruiseContainer!.children.length - 1;
        }
        this.cruiseContainer!.scrollLeft -=
            this.cruiseContainer.children[this.currentIndex2].clientWidth;
    }
    scrollToNextFamilyCard() {
        this.currentIndex3++;
        if (this.currentIndex3 >= this.familyContainer.children.length) {
            this.currentIndex3 = 0;
        }
        this.familyContainer.scrollLeft +=
            this.familyContainer.children[this.currentIndex3].clientWidth;
    }
    scrollToPrevFamilyCard() {
        this.currentIndex3--;
        if (this.currentIndex3 < 0) {
            this.currentIndex3 = this.familyContainer!.children.length - 1;
        }
        this.familyContainer!.scrollLeft -=
            this.familyContainer.children[this.currentIndex3].clientWidth;
    }
    scrollToPrevAdventureCard() {
        this.currentIndex4--;
        if (this.currentIndex4 < 0) {
            this.currentIndex4 = this.adventureContainer!.children.length - 1;
        }
        this.adventureContainer!.scrollLeft -=
            this.adventureContainer.children[this.currentIndex4].clientWidth;
    }
    scrollToNextAdventureCard() {
        this.currentIndex4++;
        if (this.currentIndex4 >= this.adventureContainer.children.length) {
            this.currentIndex4 = 0;
        }
        this.adventureContainer.scrollLeft +=
            this.adventureContainer.children[this.currentIndex4].clientWidth;
    }
    scrollToPrevRecommendedTours() {
        this.currentIndex5--;
        if (this.currentIndex5 < 0) {
            this.currentIndex5 = this.adventureContainer!.children.length - 1;
        }
        this.adventureContainer!.scrollLeft -=
            this.adventureContainer.children[this.currentIndex5].clientWidth;
    }
    scrollToNextRecommendedTours() {
        this.currentIndex5++;
        if (this.currentIndex5 >= this.adventureContainer.children.length) {
            this.currentIndex5 = 0;
        }
        this.adventureContainer.scrollLeft +=
            this.adventureContainer.children[this.currentIndex5].clientWidth;
    }
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
                "jhsjhajh",
                "jsahja"
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
