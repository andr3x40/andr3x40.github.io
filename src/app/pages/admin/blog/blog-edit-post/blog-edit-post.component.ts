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
import { InputText, InputTextModule } from 'primeng/inputtext';
import { FormService } from '../../../../services/form.service';
import { ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { ValidationError } from '../../../../model/validation';

@Component({
  selector: 'app-blog-edit-post',
  imports: [FormsModule, DividerModule, ButtonModule, TooltipModule, TextareaModule, ReactiveFormsModule, InputTextModule, InputText, ToastModule],
  providers: [MessageService],
  templateUrl: './blog-edit-post.component.html',
  styleUrl: './blog-edit-post.component.scss',
})
export class BlogEditPostComponent {

  public id!: number;
  public user!: UserDetails | null;
  public postForm!: FormGroup;

  titleInput = {
    root: {
      lg: {
        fontSize: '2rem'
      }
    }
  }
  
  private buildForm(id: number, title: string, content: string, tags: string) {
    this.postForm = this.formBuilder.group({
      id: [id, Validators.required],
      title: [title, Validators.required],
      content: [content, Validators.required],
      tags: [tags]
    })
  }

  constructor(private formBuilder: FormBuilder, public auth: AuthService, public blog: BlogService, public router: Router,
    public route: ActivatedRoute, public formService: FormService, public messageService: MessageService) {
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
    // check if the post is valid
    if (!this.checkFormValidity()) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Input', detail: 'Make sure to fill all mandatory fields.', key: 'bottom', life: 3000 });
      return;
    }
    // create a new post to save
    let post: Post = this.createPost(this.postForm);
    // and save it
    let errors: ValidationError[] | null = await this.blog.savePost(post);
    if (errors !== null) {
      if (errors.length == 0) {
        this.router.navigate(['/blog']);
      } else {
        // send error messages
        for (let error of errors) {
          this.messageService.add({
            severity: 'error',
            summary: `Invalid Input (${error.rejectedValue})`,
            detail: error.code,
            key: 'bottom',
            life: 3000
          });
        }
      }
    }
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

  /**
   * Checks the validity of a field in a form.
   * @param form the form to check in
   * @param field the field of the given form to check
   * @returns `false` if it's invalid, `true` in all other cases
   */
  public checkFieldValidity(form: FormGroup, field: string) : boolean {
    return this.formService.checkFieldValidity(form, field);
  }

  /**
   * Checks if a field in a form is disabled.
   * @param form the form to check in
   * @param field the field of the given form to check
   * @returns `true` if it's disabled, `false` otherwise
   */
  public checkFieldDisable(form: FormGroup, field: string) : boolean {
    return this.formService.checkFieldDisable(form, field);
  }

  /**
   * Checks the validity of the post form.
   * @returns `true` if the post form is valid, `false` if at least one control is invalid
   */
  private checkFormValidity(): boolean {
    return this.formService.checkFormValidity(this.postForm);
  }

}
