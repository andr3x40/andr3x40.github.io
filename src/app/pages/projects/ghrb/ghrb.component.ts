import { Component, inject, signal } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Chart, Variant } from '../../../model/ghrb';
import { Divider } from "primeng/divider";
import { SectionTitleComponent } from "../../../fragments/section/section-title/section-title.component";
import { ButtonGroupModule } from "primeng/buttongroup";
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';

@Component({
    selector: 'app-ghrb',
    templateUrl: './ghrb.component.html',
    styleUrl: './ghrb.component.scss',
    imports: [DataView, ButtonModule, Tag, CommonModule, Divider, SectionTitleComponent, ButtonGroupModule, SelectButton, FormsModule, InputIcon, IconField],
})
export class GhrbComponent {

    public items!: Chart[]
    public chartFilter: string = "";
    public gamemodeFilter: string = "5 Fret Lead Guitar";
    public gamemodeOptions: any[] = [
        { label: '5 Fret Lead Guitar', value: '5 Fret Lead Guitar' },
        { label: '5 Fret Bass Guitar', value: '5 Fret Bass Guitar' },
        { label: '5 Fret Rhythm Guitar', value: '5 Fret Rhythm Guitar' },
        { label: '6 Fret Lead Guitar', value: '6 Fret Lead Guitar' },
        { label: '6 Fret Bass Guitar', value: '6 Fret Bass Guitar' },
        { label: '6 Fret Rhythm Guitar', value: '6 Fret Rhythm Guitar' },
        { label: 'Drums', value: 'Drums' },
        { label: 'Keyboard', value: 'Keyboard' },
    ];

    constructor() { }

    ngOnInit() {
        this.items = [
            {
                id: 1,
                title: "Never Gonna Give You Up",
                artist: "Rick Astley",
                album: "Album",
                year: "1986",
                genre: "Pop",
                downloadLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                releaseDate: "15/11/2029",
                source: "none",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 5,
                        gamemode: "5 Fret Lead Guitar"
                    },
                    {
                        charter: "andr3x40",
                        difficulty: "Hard",
                        intensity: 3,
                        gamemode: "5 Fret Lead Guitar"
                    },
                    {
                        charter: "andr3x40",
                        difficulty: "Medium",
                        intensity: 2,
                        gamemode: "5 Fret Lead Guitar"
                    },
                    {
                        charter: "andr3x40",
                        difficulty: "Easy",
                        intensity: 1,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            }
        ]
    }

    getMaxDifficulty(variants: Variant[]): number {
        let maxDiff: number = 0;
        for (let variant of variants) {
            maxDiff = Math.max(maxDiff, variant.intensity === undefined ? 0 : variant.intensity);
        }
        return maxDiff;
    }

    getAbsoluteDifficulty(variants: Variant[]): string {
        let maxDiff: number = this.getMaxDifficulty(variants);
        if (maxDiff >= 1 && maxDiff <= 3) {
            return "Beginner";
        } else if (maxDiff >= 4 && maxDiff <= 6) {
            return "Intermediate";
        } else if (maxDiff >= 7 && maxDiff <= 9) {
            return "Advanced";
        } else if (maxDiff >= 10 && maxDiff <= 12) {
            return "Expert";
        } else if (maxDiff >= 13 && maxDiff <= 15) {
            return "Grandmaster"
        } else if (maxDiff >= 16) {
            return "Super Grandmaster";
        } else return "None";
    }

    private getDifficultyN(variant: Variant): number {
        switch (variant.difficulty) {
            case 'Easy': return 1;
            case 'Medium': return 2;
            case 'Hard': return 3;
            case 'Expert': return 4;
            default: return 5;
        }
    }

    orderByDifficulty(variants: Variant[], decrescent: boolean) {
        return variants.sort((a, b) => {
            let aDiff = this.getDifficultyN(a);
            let bDiff = this.getDifficultyN(b);
            return decrescent ? aDiff - bDiff : bDiff - aDiff;
        })
    }

    getFilteredItems(): Chart[] {
        let output: Chart[] = [];
        for (let chart of this.items) {
            let artistTitle: string = chart.artist + " - " + chart.title;
            if (chart.variants !== undefined && chart.variants.find(x => x.gamemode === this.gamemodeFilter) && artistTitle.toLowerCase().includes(this.chartFilter.toLowerCase())) {
                let c: Chart = Chart.cloneWithoutVariants(chart)
                c.variants = chart.variants.filter(x => x.gamemode === this.gamemodeFilter)
                output.push(c)
            }
        }
        return output;
    }

}

