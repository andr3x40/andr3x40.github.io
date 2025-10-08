import { Component, OnInit } from '@angular/core';

import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { Divider } from "primeng/divider";
import { AuthService, UserDetails } from '../../services/auth.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-header',
    imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule, ButtonModule, Divider, RouterLink, SkeletonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    public user!: UserDetails | null;
    public admin: boolean = false;

    navbar = {
        root: {
            borderRadius: '40px',
            padding: '8px'
        },
        baseItem: {
            borderRadius: '40px',
            padding: '3px',
        },
        item: {
            borderRadius: '40px',
            padding: '3px',
        },
        submenu: {
            borderRadius: '24px',
            padding: '8px',
            gap: '5px',
        },
        dark: {
            item: {
                focusBackground: '{surface.800}',
                activeBackground: '{primary.950}',
            }
        }
    }

    navbarButton = {
        root: {
            paddingX: '8px',
            paddingY: '3px'
        },
        dark: {
            text: {
                primary: {
                    hoverBackground: '{surface.800}',
                    activeBackground: '{primary.950}',
                    color: '{surface.0}'
                }
            }
        }
    }

    items: MenuItem[] | undefined;

    constructor(private router: Router, private auth: AuthService) {}

    async ngOnInit() {
        this.items = [
            {
                label: 'Blog',
                routerLink: '/blog',
            },
            {
                label: 'Projects',
                items: [
                    {
                        label: 'Flamy',
                        routerLink: 'projects/flamy'
                    },
                    {
                        label: 'Project R',
                        items: [
                            {
                                label: 'R:/GHRB',
                                routerLink: 'projects/ghrb',
                            }
                        ]
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Others',
                        items: [
                            {
                                label: 'FNF PoldHub',
                                url: 'https://poldhub.github.io'
                            }
                        ]
                    }
                ]
            }
        ];
        // check the session
        this.user = await this.auth.getUserDetails();
        this.admin = await this.auth.isAdminUser();
    }

    logout() {
        // force the window to change URL for now
        // TODO find a better solution
        window.location.href = `http://localhost:8080/logout`;
    }

}
