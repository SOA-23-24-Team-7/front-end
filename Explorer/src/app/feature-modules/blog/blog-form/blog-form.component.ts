import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BlogService } from "../blog.service";
import { Blog } from "../model/blog.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateBlog } from "../model/blog-create.model";
import { UpdateBlog } from "../model/blog-update.model";
import * as DOMPurify from "dompurify";
import { marked } from "marked";

@Component({
    selector: "xp-blog-form",
    templateUrl: "./blog-form.component.html",
    styleUrls: ["./blog-form.component.css"],
})
export class BlogFormComponent implements OnInit {
    blog: Blog;
    blogId: number;

    constructor(
        private service: BlogService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get("blogId");
        if (Number(param)) {
            this.blogId = Number(param);
            this.getBlog();
        }
    }

    modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],

            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],

            ["clean"],

            ["link", "video"],
        ],
    };

    blogForm = new FormGroup({
        title: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    });

    getMarkupPreview() {
        const md = marked.setOptions({});
        var description = DOMPurify.sanitize(
            md.parse(this.blogForm.get("description")?.value || ""),
        );
        return description;
    }

    getBlog(): void {
        this.service.getBlog(this.blogId).subscribe({
            next: (result: Blog) => {
                this.blog = result;
                this.blogForm.patchValue({
                    title: result.title,
                    description: result.description,
                });
            },
        });
    }

    createBlog(): void {
        const blog: CreateBlog = {
            title: this.blogForm.value.title || "",
            description: this.blogForm.value.description || "",
            date: new Date().toISOString(),
            status: 0,
            authorId: 0,
            visibilityPolicy: 0,
        };

        if (blog.title != "" && blog.title != null)
            this.service.saveBlog(blog).subscribe({
                next: _ => {
                    this.router.navigate(["/my-blogs"]);
                },
            });
        else alert("Must enter title!");
    }

    updateBlog(): void {
        const blog: UpdateBlog = {
            title: this.blogForm.value.title || "",
            description: this.blogForm.value.description || "",
            date: new Date().toISOString(),
            status: 0,
            id: this.blog.id,
            authorId: 0,
            visibilityPolicy: this.blog.visibilityPolicy,
        };

        if (blog.title != "" && blog.title != null)
            this.service.updateBlog(blog).subscribe({
                next: _ => {
                    this.router.navigate(["/my-blogs"]);
                },
            });
    }
}
