import { Component, OnInit } from "@angular/core";
import { TourPreference } from "../model/tour-preference.model";
import { Subscription } from "../model/subscription.model";
import { MarketplaceService } from "../marketplace.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Subscriber } from "rxjs";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { Person } from "../../stakeholder/model/person.model";

@Component({
    selector: "xp-tour-preferences",
    templateUrl: "./tour-preferences.component.html",
    styleUrls: ["./tour-preferences.component.css"],
})
export class TourPreferencesComponent implements OnInit {
    isEditing: Boolean = false;
    selectedFrequency: number = 1;

    preference: TourPreference = {
        id: -1,
        userId: -1,
        difficultyLevel: -1,
        walkingRating: 0,
        cyclingRating: 0,
        carRating: 0,
        boatRating: 0,
        selectedTags: [],
    };

    subscriber: Subscription = {
        touristId: -1,
        emailAddress: "",
        frequency: 0,
        lastTimeSent: "",
    };
    person: Person;
    constructor(
        private service: MarketplaceService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.service.getTourPreference().subscribe({
            next: (result: TourPreference) => {
                this.preference = result;
            },
            error: (err: any) => {},
        });
        this.authService.user$.subscribe(user => {
            if (!user.id) return;
            this.service
                .getByUserId(this.authService.user$.getValue().id)
                .subscribe(result => {
                    this.person = result;
                    this.subscriber.emailAddress = result.email;
                    this.subscriber.touristId = result.userId;
                });
        });
    }

    deleteEquipment(id: number): void {
        this.service.deletePreference(id).subscribe({
            next: () => {
                this.getPreference();
            },
        });
    }

    getPreference(): void {
        this.service.getTourPreference().subscribe({
            next: (result: TourPreference) => {
                this.preference = result;
            },
            error: error => {
                this.preference.id = -1;
            },
        });
    }

    onEditClicked(preference: TourPreference): void {
        this.preference = preference;
    }

    onEditChange(shouldEdit: boolean): void {
        this.isEditing = shouldEdit;
    }

    addSub(): void {
        console.log(this.selectedFrequency);
        this.subscriber.frequency = this.selectedFrequency;
        let yourDate = new Date();
        const offset = yourDate.getTimezoneOffset();
        yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
        this.subscriber.lastTimeSent = yourDate.toISOString().split("T")[0];
        //this.subscriber.lastTimeSent = "2002-12-12";
        console.log(this.subscriber);
        this.service.addSub(this.subscriber).subscribe({
            next: (result: Subscription) => {
                console.log(result);
            },
        });
    }
}
