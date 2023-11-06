import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Blog } from '../model/blog.model';
import { Router } from '@angular/router';
import { CreateBlog } from '../model/blog-create.model';

@Component({
  selector: 'xp-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent {
  
  constructor(private service: BlogService, private router: Router) { }
  
  blogForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required])
  });

  getMarkupPreview() {
    return this.blogForm.get('description')?.value;
  }

  saveBlog(): void{
    const blog: CreateBlog = {
      title: this.blogForm.value.title || '',
      description: this.blogForm.value.description || '',
      date: new Date().toISOString(),
      pictures: [""],
      status: 0,
    }

    if(blog.title != '' && blog.title != null)
      this.service.saveBlog(blog).subscribe({
        next: (_) => {
          this.router.navigate(['/blogs']);
        }
        });
  }
}
