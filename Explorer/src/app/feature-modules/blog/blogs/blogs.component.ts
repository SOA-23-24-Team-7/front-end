import { Component, OnInit } from '@angular/core';
import { Blog } from '../model/blog.model';
import { BlogService } from '../blog.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Router } from '@angular/router';


@Component({
  selector: 'xp-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private service: BlogService, private router:Router) { }

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


  

  saveBlogChanges(blogId: number,updatedBlog: Blog): void {
    this.service.updateBlog(blogId, updatedBlog).subscribe(
      (response) => {
        console.log('Uspesno dodat blog:', response);
      },
      (error) => {
        console.error('grescica:', error);
      }
    );
  }

  toCreateBlog():void{
this.router.navigate(['/create-blog'])
  }
  
  
}
