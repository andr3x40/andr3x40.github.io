import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../fragments/section/section-title/section-title.component";
import { Divider } from "primeng/divider";
import { CardModule } from "primeng/card";
import { SkeletonModule } from "primeng/skeleton";
import { ButtonModule } from "primeng/button";
import { SplitButtonModule } from "primeng/splitbutton";
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-flamy',
  imports: [SectionTitleComponent, Divider, CardModule, SkeletonModule, ButtonModule, SplitButtonModule],
  templateUrl: './flamy.component.html',
  styleUrl: './flamy.component.scss'
})
export class FlamyComponent {

    public jvms: MenuItem[] = [
        {
            label: 'Windows'
        },
        {
            label: 'Windows (64 bit)'
        },
        {
            separator: true
        },
        {
            label: 'macOS x64'
        },
        {
            label: 'macOS ARM64'
        },
        {
            separator: true
        },
        {
            label: 'Linux'
        },
        {
            label: 'Linux RPM'
        },
        {
            label: 'Linux x64'
        },
        {
            label: 'Linux x64 RPM'
        }
    ];

}
