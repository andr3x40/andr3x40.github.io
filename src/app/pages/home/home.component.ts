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
import { HttpClient } from '@angular/common/http';

import splashesFile from '../../../assets/splashes.json';

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

    constructor(private router: Router, private httpClient: HttpClient) { }

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
        this.splashList = new SplashList(splashesFile.splashes);
        console.info(`Loaded ${this.splashList.count()} splashes.`);
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