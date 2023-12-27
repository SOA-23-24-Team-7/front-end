import { Component } from "@angular/core";
import { Encounter, EncounterType } from "../model/encounter.model";
import { EncounterService } from "../encounter.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";

@Component({
    selector: "xp-encounter-list",
    templateUrl: "./encounter-list.component.html",
    styleUrls: ["./encounter-list.component.css"],
})
export class EncounterListComponent {
    encounters: Encounter[] = [];
    type: EncounterType;

    constructor(
        private authService: AuthService,
        private encounterService: EncounterService,
    ) {}
    encounterWithMaxXpReward: Encounter | undefined;
    currentTab: string = "tab1";

    showTab(tabName: string): void {
        this.currentTab = tabName;
    }

    isTabSelected(tab: string): boolean {
        return this.currentTab === tab;
    }
    ngOnInit(): void {
        this.loadEncounters();
        // this.encounterWithMaxXpReward = this.findEncounterWithMaxXpReward();
        // console.log(this.findEncounterWithMaxXpReward());
    }

    loadEncounters(): void {
        const userId = this.authService.getCurrentUserId();
        console.log(userId);
        this.encounterService
            .getAllEncounters(userId, 1, 10) //obozavam spagete
            .subscribe((pagedResults: PagedResults<Encounter>) => {
                if (pagedResults.results) {
                    this.encounters = pagedResults.results;
                    console.log(this.encounters);
                } else {
                    console.error("No results found.");
                }
            });
    }
    getEncounterStatusClass(type: EncounterType): string {
        switch (type) {
            case EncounterType.Hidden:
                return "hidden";
            case EncounterType.Social:
                return "social";
            case EncounterType.Misc:
                return "misc";

            default:
                return "all";
        }
    }
    // findEncounterWithMaxXpReward(): Encounter | undefined {
    //     let maxEnc: Encounter | undefined;
    //     let maxXpReward = -1;
    //     this.loadEncounters();
    //     for (const enc of this.encounters) {
    //         if (enc.xpReward > maxXpReward) {
    //             maxXpReward = enc.xpReward;
    //             maxEnc = enc;
    //         }
    //     }
    //     console.log(maxEnc);
    //     return maxEnc;
    // }
}
