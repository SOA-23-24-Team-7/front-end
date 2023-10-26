import { Component, OnInit } from '@angular/core';
import { Blog } from '../model/blog.model';

import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'xp-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private service: BlogService) { }

  ngOnInit(): void {
    
  }


}
