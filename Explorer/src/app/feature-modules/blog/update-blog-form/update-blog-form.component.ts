import { Component, OnInit } from '@angular/core';
import { Blog, BlogStatus } from '../model/blog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'xp-update-blog-form',
  templateUrl: './update-blog-form.component.html',
  styleUrls: ['./update-blog-form.component.css']
})
export class UpdateBlogFormComponent implements OnInit {
  blogId: number;
  blog:Blog;
  blogStatus: BlogStatus;
  updatedBlog:Blog = {
  title:'',
  description:'',
  date: new Date(),
  pictures: [],
  status: BlogStatus.Draft
  }

  nekiId = +this.route.snapshot.url[this.route.snapshot.url.length-1].path;
  
  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService ){}
  
  
  ngOnInit(): void {
    this.blogId= +this.route.snapshot.url[this.route.snapshot.url.length-1].path;
    this.getBlogDetails(this.blogId);
   
  }

  getBlogDetails(blogId: number): void {
    this.blogService.getBlog(blogId).subscribe(blog => {
      this.blog = blog;
      this.updatedBlog.id = blog.id;
      this.updatedBlog.title = blog.title;
      this.updatedBlog.description = blog.description;
      this.updatedBlog.date = blog.date;
      this.updatedBlog.pictures = blog.pictures; 
      this.updatedBlog.status = blog.status;
  
      if(this.updatedBlog.status===BlogStatus.Draft)
    {
      this.updatedBlog.status=BlogStatus.Draft 
      console.log(this.updatedBlog.status)
    }
    else 
      if(this.updatedBlog.status===BlogStatus.Published)
    {
      this.updatedBlog.status=BlogStatus.Published 
      console.log(this.updatedBlog.status-10)
    }
    else if(this.updatedBlog.status===BlogStatus.Closed)
    {
      this.updatedBlog.status=BlogStatus.Closed 
      console.log(this.updatedBlog.status)
      
    }
    else
    console.log("")
  
    });
  }
  
  updateBlog(): void {
   
    this.updatedBlog.status = +this.updatedBlog.status;
    console.log(this.nekiId);
    this.blogService.updateBlog(this.nekiId, this.updatedBlog).subscribe( result => {
      this.router.navigate(['']);
    }
      
    );
    
  }



}
