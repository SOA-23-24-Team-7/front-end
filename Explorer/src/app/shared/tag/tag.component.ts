import { Component, Input } from "@angular/core";

@Component({
    selector: "xp-tag",
    templateUrl: "./tag.component.html",
    styleUrls: ["./tag.component.css"],
})
export class TagComponent {
    @Input() tagColor: string = "rgb(var(--clr-primary-500))";
    @Input() textColor: string = "rgb(var(--clr-neutral-100))";
    @Input() tagText: string = "";
}
