import { Component, OnInit } from '@angular/core';
import { Blog } from '../model/blog.model';
import { BlogService } from '../blog.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private service: BlogService) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.service.getBlogs().subscribe({
      next: (result: PagedResults<Blog>) => {
        this.blogs = result.results;
      },
      error: () => { }
    })
  }

}
