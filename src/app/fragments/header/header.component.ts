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

@Component({
    selector: 'app-header',
    imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule, ButtonModule, Divider, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

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

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Blog',
                badge: '2',
                routerLink: '/blog',
            },
            {
                label: 'Projects',
                badge: '1',
                items: [
                    {
                        label: 'Flamy',
                        badge: '1',
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
        ]
    }
}
