import { Component, OnInit } from '@angular/core';
import { Comment } from '../model/comment.model';
import { Blog } from '../model/blog.model';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  comments: Comment[] = [];
  blog: Blog;
  blogId: number;

  constructor(private service: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
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

}
