import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './model/blog.model'; 
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  

  constructor(private http: HttpClient) { }

  

  createBlog(blogData: Blog): Observable<Blog> {
    return this.http.post<Blog>(environment.apiHost + 'blog/create', blogData);
  }


}
