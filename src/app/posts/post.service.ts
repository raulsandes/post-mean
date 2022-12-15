import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../post.model';
import { map } from 'rxjs/operators';
import { response } from 'express';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient, private router: Router) { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map((post: any) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
          }
        })
      }))
      .subscribe((normalizedPosts) => {
        this.posts = normalizedPosts;
        console.log('posts', this.posts)
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    // return {...this.posts.find(p => p.id === id)}
    return this.http.get("http://localhost:3000/api/posts/" + id);
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {id: id, title: title, content: content};
    this.http.put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response => {
        this.router.navigate(["/"]);
        console.log('response', response);
      })
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((postData) => {
        console.log('post-data', postData.message);
        const id = postData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        
      })
  }


}
