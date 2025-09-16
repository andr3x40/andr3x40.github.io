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

@Component({
    selector: 'app-blog',
    imports: [SectionTitleComponent, Divider, FieldsetModule, Avatar, PanelModule, ButtonModule, MenuModule, TagModule, Tooltip, RouterLink],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent {

    panelStyle = {
        dark: {
            root: {
                borderRadius: '16px'
            }
        }
    }

    posts: Post[] = [
        new Post(1,
            "Blog Post Title",
            `Blog Post Text`,
            "andr3x40",
            "2025-09-16T15:15:00",
            ["Test", "Test 2"]
        ),
        new Post(2,
            "Blog Post Title",
            `Blog Post Text`,
            "andr3x40",
            "2025-09-14T14:15:00",
            ["Test"]
        )
    ]

}
