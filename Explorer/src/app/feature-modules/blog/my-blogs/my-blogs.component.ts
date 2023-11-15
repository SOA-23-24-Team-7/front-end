import { Component, OnInit } from '@angular/core';
import { Blog } from '../model/blog.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { BlogService } from '../blog.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UpdateBlog } from '../model/blog-update.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Vote } from '../model/vote.model';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {
    blogs: Blog[] = [];
    user: User | undefined;
    selectedStatus: number = 5;

    constructor(
        private service: BlogService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        this.getBlogs();
    }

    filterByStatus(status: number) {
        this.selectedStatus = status;
    }

    getBlogs(): void {
        if (!this.user) {
            return;
        }
        
        this.service.getBlogs().subscribe({
            next: (result: PagedResults<Blog>) => {
                if (this.user && result.results) {
                    this.blogs = result.results.filter(blog => blog.authorId === this.user?.id);
                }
            },
            error: () => {},
        });
    }

    publishBlogAndRefresh(blog: Blog) {
        const updateBlog: UpdateBlog = {
            id: blog.id,
            title: blog.title,
            description: blog.description,
            date: new Date().toISOString(),
            status: 1,
            authorId: 0
        };
        this.service.publishBlog(updateBlog).subscribe({
            next: (_) => {
                this.getBlogs();
              }
        })
    }

    deleteBlogAndRefresh(id: number) {
        this.service.deleteBlog(id).subscribe({
            next: (_) => {
                this.getBlogs();
            }
        });
    }

    getVote(blog: Blog): Vote | undefined {
        return blog.votes.find(x => x.userId == this.user?.id);
    }

    upVoteBlog(blogId: number): void {
        this.service.upVoteBlog(blogId).subscribe({
            next: (result: any) => {
                //unblock voting
            },
            error: () => {
                //undo front end vote
            },
        });
    }

    downVoteBlog(blogId: number): void {
        this.service.downVoteBlog(blogId).subscribe({
            next: (result: any) => {
                //unblock voting
            },
            error: () => {
                //undo front end vote
            },
        });
    }
}
