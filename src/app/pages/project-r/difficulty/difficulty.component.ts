import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../fragments/section/section-title/section-title.component";
import { Divider, DividerModule } from "primeng/divider";
import { Card, CardModule } from "primeng/card";
import { TabsModule, Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-difficulty',
  imports: [SectionTitleComponent, Divider, Card, Tabs, TabList, Tab, TabPanels, TabPanel, TableModule],
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.scss',
})
export class PJRDifficultyComponent {

    card = {
        title: {
            fontSize: '24px',
            fontWeight: '800'
        }
    }
    tiers = [
        {
            tier: "Beginner",
            ghrbRange: "1-3 (CSC 0)",
            piuRange: "1-3",
            bbRange: "1-3",
        },
        {
            tier: "Intermediate",
            ghrbRange: "4-6 (CSC 0-2)",
            piuRange: "4-6",
            bbRange: "4-7",
        },
        {
            tier: "Advanced",
            ghrbRange: "7-9 (CSC 3-5)",
            piuRange: "7-9",
            bbRange: "8-11"
        },
        {
            tier: "Expert",
            ghrbRange: "10-12 (CSC 6-8)",
            piuRange: "10-12",
            bbRange: "12-15"
        },
        {
            tier: "Grandmaster",
            ghrbRange: "13-15 (CSC 9-11)",
            piuRange: "13-15",
            bbRange: "16-19"
        },
    ]

}
