import { Component } from '@angular/core';
import { Post } from '../../../model/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { Avatar } from "primeng/avatar";
import { Tooltip } from "primeng/tooltip";
import { Divider } from "primeng/divider";
import { Tag } from "primeng/tag";
import { BlogService } from '../../../services/blog.service';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-blog-post',
    imports: [Avatar, Tooltip, Divider, Tag, SkeletonModule, ButtonModule],
    templateUrl: './blog-post.component.html',
    styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {

    // path variable
    private id!: number;

    public post!: Post | null;

    public nextPostAvailable!: boolean;
    public previousPostAvailable!: boolean;

    constructor(private route: ActivatedRoute, private router: Router, public service: BlogService) {
        this.route.params.subscribe(p => this.id = parseInt(p['id'])); // aaand it's not parsing on its own. i hate javascript.
    }

    async ngOnInit() {
        setTimeout(async () => {
            this.nextPostAvailable = await this.service.existsPost(this.id + 1);
            this.previousPostAvailable = await this.service.existsPost(this.id - 1);
            this.post = await this.service.getPost(this.id);
        }, 100);
    }

    async goToNextPost() {
        this.id++;
        await this.router.navigate(['/blog']);
        this.router.navigate(['/blog', this.id]);
    }

    async goToPreviousPost() {
        this.id--;
        await this.router.navigate(['/blog']);
        this.router.navigate(['/blog', this.id]);
    }

}
