import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPosts, Post } from '../shared/models/blog.model';
import { BehaviorSubject, Observable } from 'rxjs';

export const routes = {
  getBlogPosts: () =>
    `https://frontend-api-test-nultien.azurewebsites.net/api/BlogPosts`,
  addBlogPost: () =>
    `https://frontend-api-test-nultien.azurewebsites.net/api/BlogPosts`,
  editBlogPost: (id) =>
    `https://frontend-api-test-nultien.azurewebsites.net/api/BlogPosts/${id}`,
  deleteBlogPost: (id) =>
    `https://frontend-api-test-nultien.azurewebsites.net/api/BlogPosts/${id}`,
};

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  posts: Post[];
  notify$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  getAllPosts(): Observable<BlogPosts> {
    return this._http.get<BlogPosts>(routes.getBlogPosts());
  }

  addPost(title: string, text: string) {
    const id = this.posts?.length
      ? Math.max(...this.posts?.map((x) => x.id)) + 1
      : 1;

    const body = {
      id: id,
      title: title,
      text: text,
      categoryId: 0, //As it is not described in task and probably not in scope categoryId hardcoded
    };

    return this._http.post(routes.addBlogPost(), body).subscribe(() => {
      this.notify$.next(true);
    });
  }

  editPost(post: Post) {
    const body = {
      id: post.id,
      title: post.title,
      text: post.text,
      categoryId: post.categoryId,
    };

    return this._http.put(routes.editBlogPost(post.id), body).subscribe();
  }

  deletePost(postId: number) {
    return this._http.delete(routes.deleteBlogPost(postId)).subscribe(() => {
      this.notify$.next(true);
    });
  }
}
