import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-header',
    imports: [RouterLink, Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule, ButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                link: '/',
            },
            {
                label: 'Blog',
                badge: '1',
                link: '/blog',
            },
            {
                label: 'Projects',
                items: [
                    {
                        label: 'Project R',
                        items: [
                            {
                                label: 'R:/GHRB',
                                link: 'pjr/ghrb',
                            },
                            {
                                label: 'R:/BB',
                                link: 'pjr/bb',
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
