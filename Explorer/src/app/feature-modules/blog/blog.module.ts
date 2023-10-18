import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from './blog.service';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CommentComponent,
    CommentFormComponent,
    BlogsComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class BlogModule implements OnInit {

  constructor(private service: BlogService) { }

  ngOnInit(): void {

  }
}
