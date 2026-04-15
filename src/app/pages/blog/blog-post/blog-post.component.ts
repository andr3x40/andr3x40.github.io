import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Post } from '../../../model/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { Avatar } from "primeng/avatar";
import { Tooltip } from "primeng/tooltip";
import { Divider } from "primeng/divider";
import { Tag } from "primeng/tag";
import { BlogService } from '../../../services/blog.service';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';

import { MarkdownRendererPipe } from '../../../pipes/markdown-renderer.pipe';
import { SplitPipe } from '../../../pipes/split.pipe';
import { TimeElapsedPipe } from "../../../pipes/time-elapsed.pipe";

@Component({
    selector: 'app-blog-post',
    imports: [Avatar, Tooltip, Divider, Tag, SkeletonModule, ButtonModule, MarkdownRendererPipe, DatePipe, SplitPipe, TimeElapsedPipe],
    templateUrl: './blog-post.component.html',
    styleUrl: './blog-post.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // suppress warnings for custom blocks
})
export class BlogPostComponent {

    // path variable
    private id!: number;

    public post!: Post | null;

    public nextPostId!: number | null | undefined;
    public previousPostId!: number | null | undefined;

    constructor(private route: ActivatedRoute, private router: Router, public service: BlogService) { }

    async ngOnInit() {
        this.route.params.subscribe(p => this.id = parseInt(p['id'])); // aaand it's not parsing on its own. i hate javascript.
        setTimeout(async () => {
            let allPosts: Post[] | null = await this.service.getAllPosts();
            this.post = await this.service.getPost(this.id);
            if (this.post !== null) {
                // now, dear javascript, pray tell
                // why the FUCK this works and allPosts.indexOf(this.post) DOESN'T???
                let index: number = allPosts.findIndex(x => x.id === this.id);
                // get the ID of the next and previous post
                // posts are ordered by date, from newest to oldest
                // the previous post is the next one in the list and the next post is the previous one
                this.previousPostId = index === allPosts.length - 1 ? undefined : allPosts.at(index + 1)?.id;
                this.nextPostId = index === 0 ? undefined : allPosts.at(index - 1)?.id;
            }
        }, 100);
    }

    async goToNextPost() {
        await this.router.navigate(['/blog']);
        this.router.navigate(['/blog', this.nextPostId]);
    }

    async goToPreviousPost() {
        await this.router.navigate(['/blog']);
        this.router.navigate(['/blog', this.previousPostId]);
    }

}
