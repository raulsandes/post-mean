import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  mode = 'create';
  postId: any;
  post?: Post;

  constructor(public postsService: PostService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get("postId");
        this.postsService.getPost(this.postId).subscribe((postData: any) => {
          this.post = { id: postData._id, title: postData.title, content: postData.content };
        });
      } else {
        this.mode = 'create'
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.postsService.addPost(form.value.title, form.value.content);
      form.resetForm();
    }
    if (this.mode === "edit") {
      this.postsService.updatePost(this.postId ,form.value.title, form.value.content);
      form.resetForm();
    }
  }


}
