import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from './blog.service';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';



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
    MaterialModule,
    RouterModule,
    FormsModule,
    MatDialogModule
  ]
})
export class BlogModule implements OnInit {

  constructor(private service: BlogService) { }

  ngOnInit(): void {

  }
}
