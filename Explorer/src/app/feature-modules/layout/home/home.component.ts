import { Component } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "xp-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent {
    faSearch = faSearch;
}
