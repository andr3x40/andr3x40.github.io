import { Component } from '@angular/core';
import { Post } from '../../../model/blog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Avatar } from "primeng/avatar";
import { Tooltip } from "primeng/tooltip";
import { Divider } from "primeng/divider";
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";

@Component({
    selector: 'app-blog-post',
    imports: [Avatar, Tooltip, Divider, Tag],
    templateUrl: './blog-post.component.html',
    styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {

    // path variable
    private id!: number;

    public post!: Post;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(p => this.id = p['id']);
    }

    ngOnInit() {
        this.post = new Post(this.id,
            "No Post Available",
            `there's no backend lmao`,
            "andr3x40",
            "2024-11-11T16:00:00",
            ["Test", "Test 2", "Test 3"]
        )
    }

}
