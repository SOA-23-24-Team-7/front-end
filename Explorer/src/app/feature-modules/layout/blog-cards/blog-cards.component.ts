import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../layout.services";
import { Blog } from "../../blog/model/blog.model";
import { PagedResults } from "src/app/shared/model/paged-results.model";

@Component({
    selector: "xp-blog-cards",
    templateUrl: "./blog-cards.component.html",
    styleUrls: ["./blog-cards.component.css"],
})
export class BlogCardsComponent implements OnInit{
    popularBlogs:Blog[]
    constructor(private service:LayoutService){}
    ngOnInit(): void {
        this.service.getPopularBlogs().subscribe({
            next:(result: PagedResults<Blog>)=>{
                this.popularBlogs=result.results
                //console.log(this.adventureTours)
            }
        })
    }
    
    blogsList = [
        {
            date: "02/02/2020",
            name: "The Perfect Adventurer's Guide",
            author: "Anja Ducic",
        },
        {
            date: "02/03/2022",
            name: "Travels, Tastes and Adventures",
            author: "Ivana Kovacevic",
        },
        {
            date: "11/03/2022",
            name: "Journey through Time and Cultures",
            author: "Filip Simic",
        },
        {
            date: "11/04/2021",
            name: "Perfect Roads Of World In My Story",
            author: "Marko Nikolic",
        },
    ];
}
