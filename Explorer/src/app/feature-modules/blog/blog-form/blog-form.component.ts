import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BlogService } from "../blog.service";
import { Blog } from "../model/blog.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateBlog } from "../model/blog-create.model";
import { UpdateBlog } from "../model/blog-update.model";
import * as DOMPurify from "dompurify";
import { marked } from "marked";
import { NotifierService } from "angular-notifier";
import { xpError } from "src/app/shared/model/error.model";

@Component({
    selector: "xp-blog-form",
    templateUrl: "./blog-form.component.html",
    styleUrls: ["./blog-form.component.css"],
})
export class BlogFormComponent implements OnInit {
    blog: Blog;
    blogId: number;
    clubId: number = -1;
    @ViewChild("editor") editorElement: ElementRef;

    constructor(
        private service: BlogService,
        private router: Router,
        private route: ActivatedRoute,
        private notifier: NotifierService,
    ) {}
    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get("blogId");
        const clubParam = this.route.snapshot.paramMap.get("clubId");
        if (Number(param)) {
            this.blogId = Number(param);
            this.getBlog();
        }
        if (Number(clubParam)) {
            this.clubId = Number(clubParam);
        }
    }

    modules = {
        toolbar: {
            container: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ header: 1 }, { header: 2 }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                [{ align: [] }],
                ["clean"],
                ["link", "image"],
            ],
            handlers: {
                image: this.imageHandler,
            },
        },
    };

    imageHandler(this: any) {
        const tooltip = this.quill.theme.tooltip;
        const originalSave = tooltip.save;
        const originalHide = tooltip.hide;
        tooltip.save = function (this: any) {
            const range = this.quill.getSelection(true);
            const value = this.textbox.value;
            if (value) {
                this.quill.insertEmbed(range.index, "image", value, "user");
            }
        };
        tooltip.hide = function (this: any) {
            tooltip.save = originalSave;
            tooltip.hide = originalHide;
            tooltip.hide();
        };
        tooltip.edit("image");
        tooltip.textbox.placeholder = "Embed URL";
    }

    blogForm = new FormGroup({
        title: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    });

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
        if (
            this.blogForm.value.description == "" ||
            this.blogForm.value.description == null
        ) {
            this.notifier.notify("error", "Description must not be empty.");
            return;
        }
        if(this.clubId == -1){
            this.service.saveBlog(blog).subscribe({
                next: _ => {
                    this.notifier.notify("success", "Successfully created blog!");
                    this.router.navigate(["/my-blogs"]);
                },
                error: err => {
                    this.notifier.notify("error", xpError.getErrorMessage(err));
                },
            });
        }
        else{
            blog.clubId = this.clubId
            blog.status = 1
            this.service.saveClubBlog(blog).subscribe({
                next: _ => {
                    this.notifier.notify("success", "Successfully created blog!");
                    this.router.navigate(["/club", this.clubId]);
                },
                error: err => {
                    this.notifier.notify("error", xpError.getErrorMessage(err));
                },
            });
        }
    }

    updateBlog(): void {
        if (this.blogForm.value.title == "") {
            this.notifier.notify("error", "Title must not be empty.");
            return;
        }

        if (
            this.blogForm.value.description == "" ||
            this.blogForm.value.description == null
        ) {
            this.notifier.notify("error", "Description must not be empty.");
            return;
        }

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
                    this.notifier.notify(
                        "success",
                        "Successfully updated blog!",
                    );
                    this.router.navigate(["/my-blogs"]);
                },
                error: err => {
                    this.notifier.notify("error", xpError.getErrorMessage(err));
                },
            });
    }
}
