import { Component, OnInit } from "@angular/core";
import { TourPreference } from "../model/tour-preference.model";
import { Subscription } from "../model/subscription.model";
import { MarketplaceService } from "../marketplace.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Subscriber } from "rxjs";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { Person } from "../../stakeholder/model/person.model";
import { NotifierService } from "angular-notifier";

@Component({
    selector: "xp-tour-preferences",
    templateUrl: "./tour-preferences.component.html",
    styleUrls: ["./tour-preferences.component.css"],
})
export class TourPreferencesComponent implements OnInit {
    isEditing: Boolean = false;
    selectedFrequency: number = 1;
    user: User;

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
        private notifier: NotifierService,
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
            this.user = user;
            this.getMailingListSubscribeStatus(user.id);
            this.service
                .getByUserId(this.authService.user$.getValue().id)
                .subscribe(result => {
                    this.person = result;
                    this.subscriber.emailAddress = result.email;
                    this.subscriber.touristId = result.userId;
                });
        });
    }

    getMailingListSubscribeStatus(userId: number) {
        this.service.getMailingListSubscribeStatus(userId).subscribe(result => {
            if (result == null) {
                this.selectedFrequency = 0;
            } else {
                this.selectedFrequency = result.frequency;
            }
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
                // console.log(result);
                if (result.frequency != 0) {
                    let freq_message: string = "every ";
                    if (result.frequency == 1) {
                        freq_message += "day";
                    } else {
                        freq_message += `${result.frequency} days`;
                    }
                    this.notifier.notify(
                        "success",
                        `You have subscribed to the mailing list (${freq_message}) successfully!`,
                    );
                } else {
                    this.notifier.notify(
                        "info",
                        "You have unsubscribed from the mailing list.",
                    );
                }
            },
            error: () => {
                this.notifier.notify("error", "Error: subscription failure.");
            },
        });
    }
}
