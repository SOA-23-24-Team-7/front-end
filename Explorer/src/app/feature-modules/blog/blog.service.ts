import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { environment } from "src/env/environment";
import { Blog } from "./model/blog.model";
import { Comment, CreateComment } from "./model/comment.model";
import { Vote } from "./model/vote.model";
import { CreateBlog } from "./model/blog-create.model";
import { UpdateBlog } from "./model/blog-update.model";

@Injectable({
    providedIn: "root",
})
export class BlogService {
    constructor(private http: HttpClient) {}

    getVotedBlogs(userId: number): Observable<PagedResults<Vote>> {
        return this.http.get<PagedResults<Vote>>(
            environment.apiHost + "blog/votedBlogs/user/" + userId,
        );
    }

    getBlogs(): Observable<Blog[]> {
        return this.http.get<Blog[]>(environment.apiHost + "blog");
    }

    getRecommendedBlogs(topic: string): Observable<Blog[]> {
       return this.http.get<Blog[]>(environment.apiHost + "blog/type/"+topic);
    }

    getClubBlogs(clubId: number): Observable<PagedResults<Blog>> {
        return this.http.get<PagedResults<Blog>>(environment.apiHost + "blog/getClubBlogs?page=0&pageSize=0&clubId="+clubId);
    }
    getBlog(id: number): Observable<Blog> {
        return this.http.get<Blog>(environment.apiHost + "blog/" + id);
    }

    deleteBlog(id: number) {
        return this.http.delete<Blog>(
            environment.apiHost + "blog/delete/" + id,
        );
    }

    getComments(blogId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(
            environment.apiHost + "tourist/comment/comments/blogComments/" + blogId,
        );
    }

    addComment(comment: CreateComment): Observable<Comment> {
        return this.http.post<Comment>(
            environment.apiHost + "tourist/comment/comments/new",
            comment,
        );
    }

    updateComment(comment: Comment): Observable<Comment> {
        return this.http.put<Comment>(
            environment.apiHost + "tourist/comment/comments/update/" + comment.id,
            comment,
        );
    }

    deleteComment(id: Number): Observable<Comment> {
        return this.http.delete<Comment>(
            environment.apiHost + "tourist/comment/comments/delete/" + id,
        );
    }

    saveBlog(blog: CreateBlog): Observable<CreateBlog> {
        return this.http.post<CreateBlog>(
            environment.apiHost + "blog/create",
            blog,
        );
    }

    saveClubBlog(blog: CreateBlog): Observable<CreateBlog> {
        return this.http.post<CreateBlog>(
            environment.apiHost + "blog/createClubBlog",
            blog,
        );
    }

    updateBlog(blog: UpdateBlog): Observable<UpdateBlog> {
        return this.http.put<UpdateBlog>(
            environment.apiHost + "blog/update",
            blog,
        );
    }

    publishBlog(blog: UpdateBlog): Observable<UpdateBlog> {
        blog.status = 1;
        return this.http.put<UpdateBlog>(
            environment.apiHost + "blog/update",
            blog,
        );
    }

    upVoteBlog(blogId: number): Observable<any> {
        return this.http.get<any>(
            environment.apiHost + "blog/upvote/" + blogId,
        );
    }

    downVoteBlog(blogId: number): Observable<any> {
        return this.http.get<any>(
            environment.apiHost + "blog/downvote/" + blogId,
        );
    }
}
