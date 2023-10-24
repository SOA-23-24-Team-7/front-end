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
        this.selectedTab = Tab.TOURS;
    }

    setActiveTab(tab: Tab, el: HTMLElement): void {
        this.selectedTab = tab;
        setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1);
    }
}
