import { Component, OnChanges, SimpleChanges } from "@angular/core";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faMountainCity, faUsers } from "@fortawesome/free-solid-svg-icons";

enum Tab {
    TOURS,
    BLOGS,
    CLUBS,
}

@Component({
    selector: "xp-home-tabs",
    templateUrl: "./home-tabs.component.html",
    styleUrls: ["./home-tabs.component.css"],
})
export class HomeTabsComponent {
    //icons
    faMountainCity = faMountainCity;
    faNewspaper = faNewspaper;
    faUsers = faUsers;

    Tab = Tab;
    selectedTab: Tab = Tab.TOURS;

    constructor() {
        this.setActiveTab(Tab.TOURS);
    }

    setActiveTab(tab: Tab): void {
        this.selectedTab = tab;
    }
}
