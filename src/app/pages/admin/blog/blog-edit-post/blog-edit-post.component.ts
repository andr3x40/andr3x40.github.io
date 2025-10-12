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
  selector: 'app-blog-edit-post',
  imports: [FormsModule, DividerModule, ButtonModule, TooltipModule, TextareaModule, ReactiveFormsModule],
  templateUrl: './blog-edit-post.component.html',
  styleUrl: './blog-edit-post.component.scss',
})
export class BlogEditPostComponent {

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
    // get the ID, if there is one
    this.route.params.subscribe(p => this.id = parseInt(p['id']));
    // load the selected post if an ID was provided
    if (!Number.isNaN(this.id)) {
      let post: Post | null = await this.blog.getPost(this.id);
      if (post !== null) {
        this.buildForm(
          post.id ?? 0,
          post.title ?? '',
          post.content ?? '',
          post.tags ?? ''
        );
      }
    }
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
    let post: Post = new Post();
    post.id = form.get('id')?.value;
    // if the ID is 0, set to undefined, just in case
    if (post.id === 0) post.id = undefined;
    post.title = form.get('title')?.value;
    post.author = this.user?.login;
    post.tags = form.get('tags')?.value;
    post.content = form.get('content')?.value;
    post.time = new Date(Date.now()).toISOString();
    return post;
  }

}
