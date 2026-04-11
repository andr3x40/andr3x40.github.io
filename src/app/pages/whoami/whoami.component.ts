import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../fragments/section/section-title/section-title.component";
import { Divider } from "primeng/divider";
import { AccordionModule } from "primeng/accordion";
import { Button, ButtonModule } from 'primeng/button';
import { Tooltip } from "primeng/tooltip";

@Component({
    selector: 'app-whoami',
    imports: [SectionTitleComponent, Divider, AccordionModule, ButtonModule, Tooltip],
    templateUrl: './whoami.component.html',
    styleUrl: './whoami.component.scss'
})
export class WhoamiComponent {

    myAge!: number;

    constructor() { }
    
    ngOnInit() {
        let birthday = new Date("2002-12-17");
        let now = new Date(Date.now());
        this.myAge = this.getDateDistance(birthday, now);
    }

    mainSocials: any[] = [
        {
            name: "Threads",
            link: "https://www.threads.com/@andr3x40",
            tip: "microblogging in italian",
            nickname: "@andr3x40",
            important: true
        },
        {
            name: "Bluesky",
            link: "https://bsky.app/profile/andr3x40.bsky.social",
            tip: "microblogging in english",
            nickname: "@andr3x40.bsky.social",
            important: true
        }
    ]

    otherSocials: any[] = [
        {
            name: "GitHub",
            link: "https://github.com/andr3x40",
            tip: "all my repos",
            nickname: "@andr3x40",
            important: false
        },
        {
            name: "Instagram",
            link: "https://instagram.com/andr3x40",
            tip: "i only watch reels here for now",
            nickname: "@andr3x40",
            important: false
        },
        {
            name: "Twitch",
            link: "https://www.twitch.tv/andr3x40",
            tip: "...what if i livestream",
            nickname: "@andr3x40",
            important: false
        }
    ]

    private getDateDistance(a: Date, b: Date) {
        return new Date(b.getTime() - a.getTime()).getFullYear() - 1970;
    }

}
