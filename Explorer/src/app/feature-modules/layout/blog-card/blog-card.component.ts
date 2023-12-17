import { Component, Input } from "@angular/core";
import { Blog } from "../../blog/model/blog.model";

@Component({
    selector: "xp-blog-card",
    templateUrl: "./blog-card.component.html",
    styleUrls: ["./blog-card.component.css"],
})
export class BlogCardComponent {
    @Input() blog: Blog;
}
