import { Component, OnInit } from '@angular/core';

import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule, ButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                routerLink: '/'
            },
            {
                label: 'Blog',
                routerLink: '/blog',
            },
            {
                label: 'Projects',
                items: [
                    {
                        label: 'Flamy',
                        routerLink: 'flamy'
                    },
                    {
                        label: 'Project R',
                        items: [
                            {
                                label: 'R:/GHRB',
                                routerLink: 'pjr/ghrb',
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
