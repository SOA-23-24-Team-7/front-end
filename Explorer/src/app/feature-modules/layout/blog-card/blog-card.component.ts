import { Component, Input } from "@angular/core";

@Component({
    selector: "xp-blog-card",
    templateUrl: "./blog-card.component.html",
    styleUrls: ["./blog-card.component.css"],
})
export class BlogCardComponent {
    @Input() blog: any;
}
