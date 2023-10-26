import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    
  ]
})
export class BlogModule { }
