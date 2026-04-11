import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../fragments/section/section-title/section-title.component";
import { Divider } from "primeng/divider";
import { CardModule } from "primeng/card";
import { SkeletonModule } from "primeng/skeleton";
import { ButtonModule } from "primeng/button";
import { SplitButtonModule } from "primeng/splitbutton";
import { MenuItem } from 'primeng/api';
import { Tooltip } from "primeng/tooltip";

@Component({
  selector: 'app-flamy',
  imports: [SectionTitleComponent, Divider, CardModule, SkeletonModule, ButtonModule, SplitButtonModule, Tooltip],
  templateUrl: './flame.component.html',
  styleUrl: './flame.component.scss'
})
export class FlameComponent {

}
