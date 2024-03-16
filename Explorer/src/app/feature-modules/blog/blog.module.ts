import { NgModule, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentComponent } from "./comment/comment.component";
import { HttpClientModule } from "@angular/common/http";
import { BlogService } from "./blog.service";
import { CommentFormComponent } from "./comment-form/comment-form.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { BlogComponent } from "./blog/blog.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BlogPreviewComponent } from "./blog-preview/blog-preview.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BlogFormComponent } from "./blog-form/blog-form.component";
import { MyBlogsComponent } from "./my-blogs/my-blogs.component";
import { TouristsTourBlogFormComponent } from "./tourists-tour-blog-form/tourists-tour-blog-form.component";
import { QuillModule } from "ngx-quill";
import { TooltipModule } from "primeng/tooltip";
import { RecommendedBlogsComponent } from './recommended-blogs/recommended-blogs.component';

@NgModule({
    declarations: [
        CommentComponent,
        CommentFormComponent,
        BlogsComponent,
        BlogComponent,
        BlogPreviewComponent,
        BlogFormComponent,
        MyBlogsComponent,
        TouristsTourBlogFormComponent,
        RecommendedBlogsComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        MatDialogModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        TooltipModule,
    ],
    exports: [BlogsComponent, BlogPreviewComponent],
})
export class BlogModule implements OnInit {
    constructor(private service: BlogService) {}

    ngOnInit(): void {}
}
