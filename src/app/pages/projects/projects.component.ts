import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../fragments/section/section-title/section-title.component";
import { Divider } from "primeng/divider";
import { Router, RouterLink } from '@angular/router';
import { PanelItem } from '../../model/items';
import { Card } from "primeng/card";

@Component({
  selector: 'app-projects',
  imports: [SectionTitleComponent, Divider, RouterLink, Card],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

    items: PanelItem[] | undefined;

    constructor(private router: Router) { }

    ngOnInit() {
        this.items = [
            {
                header: "Flame Editor",
                text: `Flame Editor is an advanced chart editor for Guitar Hero and Rock Band clone games, designed to be a bit more complex than other editors, but still easy to use.`,
                link: "flame"
            },
            {
                header: "Project R",
                text: `This is not related to coding, but rhythm games. I like music, I like videogames, so I like rhythm games as well.`,
                link: "ghrb"
            },
            {
                header: "FNF PoldHub",
                text: `A Friday Night Funkin' mod about an Italian content creator doing... things, I guess. We've been doing this for so long the main game stagnated so much that it died.
                Still WIP, but I created and I'm still creating the charts for this mod. As I said, "I break your arms and fingers".
                ...I actually stole that from Camellia, but who cares.`,
                externalLink: "https://poldhub.github.io/"
            },
        ]
    }

}
