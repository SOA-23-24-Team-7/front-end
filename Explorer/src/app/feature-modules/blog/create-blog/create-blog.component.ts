import { Component, OnInit } from '@angular/core';
import { Blog, BlogStatus } from '../model/blog.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog service/blog.service';

@Component({
  selector: 'xp-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})


export class CreateBlogComponent implements OnInit {
  blogStatus: BlogStatus
  blogForm: FormGroup;
  constructor(private fb: FormBuilder, private  blogService: BlogService) { }

  ngOnInit(): void {
   
    this.blogForm = this.fb.group({
      Title: [''],
      Description: [''],
      Date: [new Date()],
      Pictures: [[]], 
      Status: ['Draft']
    });
  }

  
 
  submitBlog(): void {
    if (this.blogForm.valid) {
      const blog: Blog = this.blogForm.value;
    if(blog.Status==BlogStatus.Draft)
    {
      blog.Status=BlogStatus.Draft 
    }
    else 
      if(blog.Status==BlogStatus.Published)
    {
      blog.Status=BlogStatus.Draft 
    }
    else (blog.Status==BlogStatus.Closed)
    {
      blog.Status=BlogStatus.Draft 
    }

      
      this.blogService.createBlog(blog).subscribe({next:(result:Blog)=>{
        console.log("Sve ok")
      }}
      );
    } else {
      console.log('Nije validn');
    }

}

}