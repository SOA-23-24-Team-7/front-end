import { Component, OnInit } from '@angular/core';
import { Blog, BlogStatus } from '../model/blog.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';


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
      title: [''],
      description: [''],
      date: [new Date()],
      pictures: [[]], 
      status: ['Draft']
    });
  }

  
 
  submitBlog(): void {
    if (this.blogForm.valid) {
      const blog: Blog = this.blogForm.value;
    if(blog.status==BlogStatus.Draft)
    {
      blog.status=BlogStatus.Draft 
    }
    else 
      if(blog.status==BlogStatus.Published)
    {
      blog.status=BlogStatus.Published 
    }
    else (blog.status==BlogStatus.Closed)
    {
      blog.status=BlogStatus.Closed 
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