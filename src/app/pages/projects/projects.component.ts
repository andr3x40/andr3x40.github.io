import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../fragments/section/section-title/section-title.component";
import { Divider } from "primeng/divider";
import { Panel } from "primeng/panel";
import { Router, RouterLink } from '@angular/router';
import { PanelItem } from '../../model/items';

@Component({
  selector: 'app-projects',
  imports: [SectionTitleComponent, Divider, Panel, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  items: PanelItem[] | undefined;

    constructor(private router: Router) { }

    ngOnInit() {
        this.items = [
            {
                header: "Flamy",
                text: `Flamy is an advanced chart editor for Guitar Hero and Rock Band clone games, designed to be a bit more complex than other editors, but still easy to use.`,
                link: "flamy"
            },
            {
                header: "Project R:\\GHRB",
                text: `This is not related to coding, but it's a collection of charts for Guitar Hero and Rock Band clone games, hence the name "GHRB".`,
                link: "ghrb"
            },
            {
                header: "FNF PoldHub",
                text: `To put it simply, a Friday Night Funkin' mod about an Italian content creator doing... things, I guess. Still WIP, but I created and I'm still creating the charts of this mod.
                As I said, "I break your arms and fingers". (i actually stole this from Camellia)`,
                externalLink: "https://poldhub.github.io/"
            },
        ]
    }

}
