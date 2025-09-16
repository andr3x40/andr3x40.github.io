import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../fragments/section/section-title/section-title.component";
import { Divider } from "primeng/divider";
import { PanelItem } from '../../../model/items';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { Button } from "primeng/button";

@Component({
    selector: 'app-ghrb',
    imports: [SectionTitleComponent, Divider, RouterLink, CardModule, Button],
    templateUrl: './ghrb.component.html',
    styleUrl: './ghrb.component.scss'
})
export class GhrbComponent {

    items: PanelItem[] | undefined;

    constructor(private router: Router) { }

    ngOnInit() {
        this.items = [
            {
                header: "Charts",
                text: `Browse through all the charts I released in all these years.`,
                link: "charts"
            },
            {
                header: "Bundles",
                text: `If you don't want to look for specific charts, try downloading a bunch of them at once.`
            },
            {
                header: "Setlists",
                text: `Groups of charts divided in tiers, based on their difficulty or theme.`
            }
        ]
    }

}   
