import { Component } from '@angular/core';
import { Divider } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';

import { SiThreadsIcon, SiInstagramIcon, SiGithubIcon, SiBlueskyIcon } from '@semantic-icons/simple-icons';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [Divider, PanelModule, CommonModule, RouterLink, CarouselModule, CardModule, Button, ButtonModule, SiThreadsIcon, SiInstagramIcon, SiGithubIcon, SiBlueskyIcon, TooltipModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    items!: any[];
    links!: any[];

    iconMap: any = {
        threads: SiThreadsIcon,
        github: SiGithubIcon,
        instagram: SiInstagramIcon
    }
    
    splashText!: string;
    private splashTexts: string[] = [
        "Yet Another Personal Website",
        "A website of some dude who likes to create things",
        "I like Minecraft splashes, how could you tell?",
        "Slow ride, take it easy",
        "Imagine the nerves...",
        "smots gaming",
        "Be proud of your death count!",
        "YOUR TAKING TOO LONG",
        "He's groovy and NEVER glooby!",
        "Despite everything, it's still you.",
        "This is a long splash text I wrote with the only purpose of testing this splash system and to make sure the text is correctly displayed on the website",
        "me when the me when when the me when the when uhhhhhhhhhhhhhhhhh",
        "SHAW!",
        "oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah",
        "g",
        "Do you have any games on your phone?",
        "norris sc*pato",
        "Must be the water.",
        "Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy?-",
        "Crazy? I was crazy once. They put me in a club. A stripped club. In the stripped club. Straight up \"jorking it\". And by \"it\", haha, well. Let's justr say. My Vaporeon. Vaporeon? Did you know that in terms of-"
    ];

    private splashAnimationTimeouts: number[] = [];

    constructor(private router: Router) { }

    ngOnInit() {
        this.items = [
            {
                header: "~$ whoami",
                link: "whoami"
            },
            {
                header: "~$ projects",
                link: "projects"
            },
            {
                header: "~$ blog",
                link: "blog"
            },
        ];
        this.links = [
            {
                icon: "threads",
                url: "https://www.threads.com/@andr3x40",
            },
            {
                icon: "bluesky",
                url: "https://bsky.app/profile/andr3x40.bsky.social",
            }
        ]
        this.loadSplashText();
    }

    loadSplashText() {
        // clear the previous timeouts
        for (let timeout of this.splashAnimationTimeouts) {
            window.clearTimeout(timeout);
        }
        this.splashAnimationTimeouts = [];
        // get the index of a splash
        let splashIndex = Math.floor(Math.random() * this.splashTexts.length);
        // animate the splash text
        let text = this.splashTexts[splashIndex];
        for (let i = 0; i < text.length; i++) {
            this.splashAnimationTimeouts.push(
                window.setTimeout(() => {
                    this.splashText = text.substring(0, i + 1) + "_";
                }, i * 40)
            );
        }
        this.splashAnimationTimeouts.push(
            window.setTimeout(() => {
                this.splashText = text;
            }, (text.length - 1) * 40 + 1)
        );
    }

}