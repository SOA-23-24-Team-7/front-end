import { Component, Input } from "@angular/core";
import { Blog } from "../../blog/model/blog.model";

@Component({
    selector: "xp-blog-card",
    templateUrl: "./blog-card.component.html",
    styleUrls: ["./blog-card.component.css"],
})
export class BlogCardComponent {
    @Input() blog: Blog;
    ngOnInit(): void {
    }
    toggleShowMore(blog: Blog) {
        blog.showMore = !blog.showMore;
    }

    getDate(): string {
        const milliseconds = this.blog.date.seconds * 1000;
        const date = new Date(milliseconds);

        const dateString = date.toDateString();
        console.log(dateString)
        return dateString;
    }
}
