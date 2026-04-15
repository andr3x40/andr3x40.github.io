import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../fragments/section/section-title/section-title.component";
import { Divider, DividerModule } from "primeng/divider";
import { Card, CardModule } from "primeng/card";
import { Button, ButtonModule, ButtonLabel } from "primeng/button";
import { RouterLink } from "@angular/router";
import { Tooltip } from "primeng/tooltip";

@Component({
  selector: 'app-project-r',
  imports: [SectionTitleComponent, Divider, Card, Button, RouterLink, ButtonLabel, Tooltip],
  templateUrl: './project-r.component.html',
  styleUrl: './project-r.component.scss',
})
export class ProjectRComponent {

    projectCard = {
        title: {
            fontSize: '36px',
            fontWeight: '800'
        }
    }

    ghrbLinks = [
        {
            text: "Charts",
            link: "ghrb/charts",
            tooltip: "Browse through all the charts released"
        },
        {
            text: "Bundles",
            tooltip: "Download full bundles of charts"
        },
        {
            text: "Setlists",
            tooltip: "Download organized setlists to play through"
        }
    ]

    piuLinks = [
        {
            text: "Maps",
            link: "piu/maps",
            tooltip: "Browse through all the maps released"
        },
        {
            text: "Bundles",
            tooltip: "Download full map bundles"
        }
    ]

}
