import { Component, OnInit } from '@angular/core';
import { Comment } from '../model/comment.model';
import { Blog } from '../model/blog.model';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MatDialog } from '@angular/material/dialog';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  comments: Comment[] = [];
  blog: Blog;
  blogId: number;
  user: User | undefined;

  constructor(private authService: AuthService, private service: BlogService, private route: ActivatedRoute, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    const param = this.route.snapshot.paramMap.get("blogId")
    if (param) {
      this.blogId = Number(param);
      this.getBlog();
      this.getComments();
    }
  }

  getBlog(): void {
    this.service.getBlog(this.blogId).subscribe({
      next: (result: Blog) => {
        this.blog = result;
      }
    });
  }

  getComments(): void {
    this.service.getComments(this.blogId).subscribe({
      next: (result: PagedResults<Comment>) => {
        this.comments = result.results;
      }
    });

  }
  
 
  
  updateBlog(id: number): void {
    this.router.navigate([`update-blog/${id}`]);
  }
  

  deleteBlog(id: number): void {
    this.service.deleteBlog(id).subscribe({
      
    })
    this.router.navigate([''])
  }

  

  onAddClicked(): void {
    const dialogRef = this.dialog.open(CommentFormComponent, {
      data: {
        blogId: this.blogId,
        user: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.comments.push(result.comment);
    });
  }

}
