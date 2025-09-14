import { Component, inject, signal } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Chart, Variant } from '../../../../model/ghrb';
import { Divider } from "primeng/divider";
import { SectionTitleComponent } from "../../../../fragments/section/section-title/section-title.component";
import { ButtonGroupModule } from "primeng/buttongroup";
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogModule, Dialog } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-ghrb-charts',
    templateUrl: './ghrb-charts.component.html',
    styleUrl: './ghrb-charts.component.scss',
    imports: [DataView, ButtonModule, Tag, CommonModule, Divider, SectionTitleComponent, ButtonGroupModule, SelectButton, FormsModule, ToggleButtonModule, DialogModule, Dialog, TooltipModule],
})
export class GhrbChartsComponent {

    public items!: Chart[]
    public chartFilter: string = "";
    public releasedFilter: boolean = true;
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

    public standardDifficulties: any[] = ["Easy", "Medium", "Hard", "Expert"];

    public infoDialogVisible: boolean = false;
    public itemSelected: Chart = {
        id: 0,
        variants: []
    }

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
                youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                releaseDate: "15/11/2029",
                description: `Send this to your friends to make them happy!`,
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
            },
            {
                id: 2,
                title: "Through the Fire and Flames",
                artist: "DragonForce",
                album: "Inhuman Rampage",
                year: "2006",
                genre: "Power Metal",
                description: `Probably the most famous song of DragonForce, it was featured in Guitar Hero III as a bonus track. It became really popular due to its absurd difficulty in that game.`,
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert+",
                        intensity: 14,
                        gamemode: "5 Fret Lead Guitar"
                    },
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 11,
                        gamemode: "5 Fret Lead Guitar"
                    },
                    {
                        charter: "andr3x40",
                        difficulty: "Hard",
                        intensity: 9,
                        gamemode: "5 Fret Lead Guitar"
                    },
                    {
                        charter: "andr3x40",
                        difficulty: "Medium",
                        intensity: 7,
                        gamemode: "5 Fret Lead Guitar"
                    },
                    {
                        charter: "andr3x40",
                        difficulty: "Easy",
                        intensity: 4,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            },
            {
                id: 3,
                title: "Test Chart 3",
                artist: "Test",
                album: "Test",
                year: "2025",
                genre: "Test",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 14,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            },
            {
                id: 4,
                title: "Test Chart 4",
                artist: "Test",
                album: "Test",
                year: "2025",
                genre: "Test",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 1,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            },
            {
                id: 5,
                title: "Test Chart 5",
                artist: "Test",
                album: "Test",
                year: "2025",
                genre: "Test",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 1,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            },
            {
                id: 6,
                title: "Test Chart 6",
                artist: "Test",
                album: "Test",
                year: "2025",
                genre: "Test",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 1,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            },
            {
                id: 7,
                title: "Test Chart 7",
                artist: "Test",
                album: "Test",
                year: "2025",
                genre: "Test",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 1,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            },
            {
                id: 8,
                title: "Test Chart 8",
                artist: "Test",
                album: "Test",
                year: "2025",
                genre: "Test",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 1,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            },
            {
                id: 9,
                title: "Test Chart 9",
                artist: "Test",
                album: "Test",
                year: "2025",
                genre: "Test",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 1,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            },
            {
                id: 10,
                title: "Test Chart 10",
                artist: "Test",
                album: "Test",
                year: "2025",
                genre: "Test",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 1,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            },
            {
                id: 11,
                title: "Test Chart 11",
                artist: "Test",
                album: "Test",
                year: "2025",
                genre: "Test",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 1,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            },
            {
                id: 12,
                title: "Test Chart 12",
                artist: "Test",
                album: "Test",
                year: "2025",
                genre: "Test",
                variants: [
                    {
                        charter: "andr3x40",
                        difficulty: "Expert",
                        intensity: 1,
                        gamemode: "5 Fret Lead Guitar"
                    }
                ]
            }
        ]
    }

    showChartInfo(chartID: number) {
        let chart: Chart | undefined = this.items.find(x => x.id == chartID);
        if (chart !== undefined) {
            this.infoDialogVisible = true;
            this.itemSelected = chart;
        }
    }

    getMaxDifficulty(variants: Variant[]): number {
        let maxDiff: number = 0;
        for (let variant of variants) {
            if (this.standardDifficulties.includes(variant.difficulty)) {
                maxDiff = Math.max(maxDiff, variant.intensity === undefined ? 0 : variant.intensity);
            }
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

    private matchesFilter(chart: Chart) {
        if (chart.variants === undefined) return false;
        let artistTitle: string = chart.artist + " - " + chart.title;
        let filter = chart.variants.find(x => x.gamemode === this.gamemodeFilter)
            && artistTitle.toLowerCase().includes(this.chartFilter.toLowerCase())
        if (this.releasedFilter) return filter && chart.downloadLink !== undefined
        else return filter;
    }

    getFilteredItems(): Chart[] {
        let output: Chart[] = [];
        for (let chart of this.items) {
            if (chart.variants !== undefined && this.matchesFilter(chart)) {
                let c: Chart = Chart.cloneWithoutVariants(chart)
                c.variants = chart.variants.filter(x => x.gamemode === this.gamemodeFilter)
                output.push(c)
            }
        }
        return output;
    }

    variantsByGamemode(variants: Variant[]) {
        let output: GamemodeVariantList[] = [];
        for (let variant of variants) {
            if (variant.gamemode !== undefined) {
                let list: GamemodeVariantList | undefined = output.find(x => x.gamemode === variant.gamemode);
                // if there's no list, create it
                if (list === undefined) {
                    list = new GamemodeVariantList(variant.gamemode);
                    output.push(list);
                }
                list.variants.push(variant);
            }
        }
        // order every difficulty the same as the dataviews
        for (let list of output) {
            list.variants = this.orderByDifficulty(list.variants, true);
        }
        // order them the same as the options
        output.sort((a, b) => {
            let indexA = this.gamemodeOptions.findIndex(x => x.label === a.gamemode);
            let indexB = this.gamemodeOptions.findIndex(x => x.label === b.gamemode);
            return indexA - indexB;
        });
        return output;
    }

}

class GamemodeVariantList {

    public gamemode!: string;
    public variants!: Variant[];

    constructor(gamemode: string) {
        this.gamemode = gamemode;
        this.variants = [];
    }

    get length() {
        return this.variants.length;
    }

}

