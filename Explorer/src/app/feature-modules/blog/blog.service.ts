import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { environment } from 'src/env/environment';
import { Blog } from './model/blog.model';
import { Comment, CreateComment } from './model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<PagedResults<Blog>> {
    return this.http.get<PagedResults<Blog>>(environment.apiHost + 'blog');
  }

  getBlog(id: number): Observable<Blog> {
    return this.http.get<Blog>(environment.apiHost + 'blog/' + id);
  }

  getComments(blogId: number): Observable<PagedResults<Comment>> {
    return this.http.get<PagedResults<Comment>>(environment.apiHost + 'tourist/comment/' + blogId);
  }

  addComment(comment: CreateComment): Observable<Comment> {
    return this.http.post<Comment>(environment.apiHost + 'tourist/comment', comment);
  }
}
