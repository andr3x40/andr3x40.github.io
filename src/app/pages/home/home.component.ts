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
import { Splash, SplashList, SplashSpecialRules } from '../../model/splash';

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
    private splashList!: SplashList;

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
        let splashes: Splash[] = [
            new Splash("Yet Another Personal Website", 1),
            new Splash("A website of some dude who likes to create things", 1),
            new Splash("Also known as andr120's lab", 1),
            new Splash("This is a long splash text I wrote with the only purpose of testing this splash system and to make sure the text is correctly displayed on the website", 1),
            new Splash("I like Minecraft splashes, how could you tell?", 1),
            new Splash("Slow ride, take it easy", 1),
            new Splash("Imagine the nerves...", 1),
            new Splash("smots gaming", 1),
            new Splash("Be proud of your death count!", 1),
            new Splash("The first step of healing is confronting the problem. It's never easy.", 1),
            new Splash("YOUR TAKING TOO LONG", 1),
            new Splash("He's groovy and NEVER glooby!", 1),
            new Splash("The king's chariot cannot be stopped.", 1),
            new Splash("Despite everything, it's still you.", 1),
            new Splash("SHAW!", 1),
            new Splash("Sale balatrito?", 1),
            new Splash("Balatro Balatrez está jugando a Balatro", 1),
            new Splash("me when the me when when the me when the when uhhhhhhhhhhhhhhhhh", 1),
            new Splash("oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah oh yeah woo yeah", 1),
            new Splash("g", 1),
            new Splash("Do you have any games on your phone?", 1),
            new Splash("Must be the water.", 1),
            new Splash("Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy?-", 1),
            new Splash("Crazy? I was crazy once. They put me in a club. A stripped club. In the stripped club. Straight up \"jorking it\". And by \"it\", haha, well. Let's justr say. My Vaporeon. Vaporeon? Did you know that in terms of-", 1),
            new Splash("Mikudayo!", 1),
        ]
        this.splashList = new SplashList(splashes);
        this.loadSplashText();
    }

    loadSplashText() {
        // clear the previous timeouts
        for (let timeout of this.splashAnimationTimeouts) {
            window.clearTimeout(timeout);
        }
        this.splashAnimationTimeouts = [];
        let text = this.splashList.roll();
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