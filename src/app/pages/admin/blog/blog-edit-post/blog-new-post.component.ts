import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DividerModule } from "primeng/divider";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from 'primeng/tooltip';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, UserDetails } from '../../../../services/auth.service';
import { BlogService } from '../../../../services/blog.service';
import { Post } from '../../../../model/blog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-new-post',
  imports: [FormsModule, DividerModule, ButtonModule, TooltipModule, TextareaModule, ReactiveFormsModule],
  templateUrl: './blog-new-post.component.html',
  styleUrl: './blog-new-post.component.scss',
})
export class BlogNewPostComponent {

  public id!: number;
  public user!: UserDetails | null;
  public postForm!: FormGroup;
  
  private buildForm(id: number, title: string, content: string, tags: string) {
    this.postForm = this.formBuilder.group({
      id: [id, Validators.required],
      title: [title, Validators.required],
      content: [content, Validators.required],
      tags: [tags, Validators.required]
    })
  }

  constructor(private formBuilder: FormBuilder, public auth: AuthService, public blog: BlogService, public router: Router, public route: ActivatedRoute) {
    this.buildForm(0, '', '', '');
  }

  async ngOnInit() {
    this.user = await this.auth.getUserDetails();
  }

  public async confirmPost() {
    // check if the post is new or not
    this.saveNewPost();
  }

  private async saveNewPost() {
    // create a new post to save
    let post: Post = this.createPost(this.postForm);
    // and save it
    console.log(post);
    await this.blog.savePost(post);
    this.router.navigate(['/blog']);
  }

  public confirmCancel() {
    this.router.navigate(['/blog']);
  }

  private createPost(form: FormGroup): Post {
    let post: Post = new Post(null);
    post.title = form.get('title')?.value;
    post.author = this.user?.login;
    post.tags = form.get('tags')?.value;
    post.content = form.get('content')?.value;
    post.time = new Date(Date.now()).toISOString();
    return post;
  }

}
