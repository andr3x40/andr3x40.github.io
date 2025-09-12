import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../fragments/section/section-title/section-title.component";
import { Divider } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PanelItem } from '../../model/items';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [SectionTitleComponent, Divider, PanelModule, CommonModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    items: PanelItem[] | undefined;

    constructor(private router: Router) { }

    ngOnInit() {
        this.items = [
            {
                header: "~$ whoami",
                text: `I'm a 22 y/o Italian guy who likes to create things. That's how I describe myself in the quickest way possible.
                This website is a way for me to showcase my projects and hobbies.`
            },
            {
                header: "~$ projects",
                text: `There's some stuff where I'm mediocre, like art, and other stuff where I'm somewhat good, like coding. And there's a good chance a project of mine is related to computers and stuff.
                (this website is not good because it lacks a proper backend, but let's not talk about that)`,
                link: "projects"
            },
            {
                header: "~$ blog",
                text: `I'm somewhat active on some social media. Mostly on microblogging ones.
                And since my thoughts are scattered around different platforms, I can easily group them all here.`,
                link: "blog"
            },
        ]
    }

}