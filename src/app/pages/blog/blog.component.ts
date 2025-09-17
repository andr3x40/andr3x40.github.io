import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../fragments/section/section-title/section-title.component";
import { Divider } from "primeng/divider";
import { FieldsetModule } from 'primeng/fieldset';
import { Avatar } from "primeng/avatar";
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { Tooltip } from "primeng/tooltip";
import { Post } from '../../model/blog';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-blog',
    imports: [SectionTitleComponent, Divider, FieldsetModule, Avatar, PanelModule, ButtonModule, MenuModule, TagModule, Tooltip, RouterLink, SkeletonModule],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent {

    public posts!: Post[];
    public placeholders: number[] = [0, 1, 2];

    constructor(public service: BlogService) { }

    async ngOnInit() {
        setTimeout(async () => {
            this.posts = await this.service.getAllPosts();
        }, 100);
    }

}
