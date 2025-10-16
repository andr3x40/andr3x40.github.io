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
import { Router, RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { SkeletonModule } from 'primeng/skeleton';
import { AuthService, AuthSession } from '../../services/auth.service';
import { MenuItem } from 'primeng/api';
import { DialogModule } from "primeng/dialog";

@Component({
    selector: 'app-blog',
    imports: [SectionTitleComponent, Divider, FieldsetModule, Avatar, PanelModule, ButtonModule, MenuModule, TagModule, Tooltip, RouterLink, SkeletonModule, DialogModule],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent {

    public posts!: Post[];
    public placeholders: number[] = [0, 1, 2];

    public session: AuthSession = {details: {authenticated: false}, admin: false};

    public deleteDialogVisible: boolean = false;
    
    public menuItems: MenuItem[] = [];
    public selectedItemId: number | undefined;

    showConfirmDeleteDialog() {
        this.deleteDialogVisible = true;
    }

    constructor(public service: BlogService, public auth: AuthService, public router: Router) {
        
    }

    async ngOnInit() {
        this.session = await this.auth.getUserSession();
        this.menuItems = [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                action: (id: number) => {
                    this.selectedItemId = id;
                    this.editPost();
                }
            },
            {
                separator: true
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                action: (id: number) => {
                    this.selectedItemId = id;
                    this.showConfirmDeleteDialog();
                }
            }
        ];
        setTimeout(async () => {
            this.posts = await this.service.getAllPosts();
        }, 100);
    }

    async deleteSelectedPost() {
        this.deleteDialogVisible = false;
        if (this.selectedItemId !== undefined) {
            // delete the post
            this.service.deletePost(this.selectedItemId);
            // reload the page
            await this.router.navigate(['/']);
            this.router.navigate(['/blog']);
        }
    }

    private editPost() {
        this.router.navigate([`/admin/blog/edit/${this.selectedItemId}`])
    }

}
