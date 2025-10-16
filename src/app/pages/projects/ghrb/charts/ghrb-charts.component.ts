import { Component, inject, signal } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Track, Chart, Variant } from '../../../../model/ghrb';
import { Divider } from "primeng/divider";
import { SectionTitleComponent } from "../../../../fragments/section/section-title/section-title.component";
import { ButtonGroupModule } from "primeng/buttongroup";
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogModule, Dialog } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';

import { SiSpotifyIcon } from '@semantic-icons/simple-icons';
import { SiYoutubeIcon } from '@semantic-icons/simple-icons';
import { SiSoundcloudIcon } from '@semantic-icons/simple-icons';
import { SiBandcampIcon } from '@semantic-icons/simple-icons';
import { GhrbService } from '../../../../services/ghrb.service';
import { SkeletonModule } from 'primeng/skeleton';
import { AuthService, AuthSession } from '../../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TextareaModule } from 'primeng/textarea';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { MenuModule } from "primeng/menu";
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-ghrb-charts',
    templateUrl: './ghrb-charts.component.html',
    styleUrl: './ghrb-charts.component.scss',
    imports: [DataView, ButtonModule, Tag, CommonModule, Divider, SectionTitleComponent, ButtonGroupModule, SelectButton, FormsModule, ToggleButtonModule, DialogModule, Dialog, TooltipModule, PaginatorModule, SiSpotifyIcon, SiYoutubeIcon, SiSoundcloudIcon, SiBandcampIcon, SkeletonModule, RouterLink, TextareaModule, InputTextModule, InputText, MenuModule],
})
export class GhrbChartsComponent {

    public session: AuthSession = {details: {authenticated: false}, admin: false};

    public charts!: Chart[];
    public placeholders: number[] = [0, 1, 2];

    public chartFilter: string = "";
    public releasedFilter: boolean = true;
    public gamemodeFilter: string | null = "5 Fret Lead Guitar";
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

    public absoluteGamemodes: AbsoluteDifficulty[] = [
        {
            name: "None",
            tip: "No challenge involved. It's a freebie."
        },
        {
            name: "Beginner",
            tip: "Simple patterns, simple rhythm. Recommended for new players."
        },
        {
            name: "Intermediate",
            tip: "Typical rhythms, but patterns that can be tricky. A challenge for new players who want to step up their game."
        },
        {
            name: "Advanced",
            tip: "Fast and tricky. Suited best for seasoned players."
        },
        {
            name: "Expert",
            tip: "Crazy fast patterns and tricky rhythms. A proper challenge for expert players."
        },
        {
            name: "Grandmaster",
            tip: "Insanely fast, technical patterns. For who has mastered the game."
        },
        {
            name: "Super Grandmaster",
            tip: "Calling these insane is an understatement. Not recommended for anybody other than top players."
        }
    ]

    public standardDifficulties: any[] = ["Easy", "Medium", "Hard", "Expert"];

    public infoDialogVisible: boolean = false;
    public deleteDialogVisible: boolean = false;

    public itemSelected!: Chart;
    
    public menuItems: MenuItem[] = [];
    public selectedItemId: number | undefined;

    constructor(public service: GhrbService, public auth: AuthService, public router: Router) { }

    async ngOnInit() {
        this.session = await this.auth.getUserSession();
        this.menuItems = [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                action: (id: number) => {
                    this.selectedItemId = id;
                    this.editChart();
                }
            },
            {
                separator: true
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                action: (id: number) => {
                    this.selectedItemId = id;
                    this.showConfirmDeleteDialog();
                }
            }
        ];
        setTimeout(async () => {
            this.charts = await this.service.getAllCharts();
        }, 100);
    }

    showChartInfo(chartID: number) {
        let chart: Chart | undefined = this.charts.find(x => x.id == chartID);
        if (chart !== undefined) {
            this.infoDialogVisible = true;
            this.itemSelected = chart;
            console.log(this.itemSelected);
        }
    }

    getMaxDifficulty(variants: Variant[]): number {
        let maxDiff: number = 0;
        for (let variant of variants) {
            maxDiff = Math.max(maxDiff, variant.intensity === undefined ? 0 : variant.intensity);
        }
        return maxDiff;
    }

    getAbsoluteDifficulty(variants: Variant[]): AbsoluteDifficulty {
        let maxDiff: number = this.getMaxDifficulty(variants);
        let output: AbsoluteDifficulty | undefined;
        if (maxDiff >= 1 && maxDiff <= 3) {
            output = this.absoluteGamemodes.find(x => x.name === "Beginner");
        } else if (maxDiff >= 4 && maxDiff <= 6) {
            output = this.absoluteGamemodes.find(x => x.name === "Intermediate");
        } else if (maxDiff >= 7 && maxDiff <= 9) {
            output = this.absoluteGamemodes.find(x => x.name === "Advanced");
        } else if (maxDiff >= 10 && maxDiff <= 12) {
            output = this.absoluteGamemodes.find(x => x.name === "Expert");
        } else if (maxDiff >= 13 && maxDiff <= 15) {
            output = this.absoluteGamemodes.find(x => x.name === "Grandmaster");
        } else if (maxDiff >= 16) {
            output = this.absoluteGamemodes.find(x => x.name === "Super Grandmaster");
        } else {
            output = this.absoluteGamemodes.find(x => x.name === "None");
        }
        return output !== undefined ? output : {name: "Undefined", tip: "Undefined"}
    }

    orderByDifficulty(variants: Variant[], decrescent: boolean) {
        return variants.sort((a, b) => {
            let aDiff = a.difficultyCode;
            let bDiff = b.difficultyCode;
            return decrescent ? aDiff - bDiff : bDiff - aDiff;
        })
    }

    private matchesFilter(chart: Chart) {
        if (chart.variants === undefined) return false;
        let artistTitle: string = chart.track?.artist + " - " + chart.track?.title;
        let filter = chart.variants.find(x => x.gamemode === this.gamemodeFilter)
            && artistTitle.toLowerCase().includes(this.chartFilter.toLowerCase())
        if (this.releasedFilter) return filter && chart.downloadLink !== undefined
        else return filter;
    }

    getFilteredItems(): Chart[] {
        // return all charts if the gamemode filter is not set
        if (this.gamemodeFilter === null) return this.charts;
        let output: Chart[] = [];
        for (let chart of this.charts) {
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

    public editChart() {
        this.router.navigate(['/admin/projects/ghrb/charts/edit/' + this.selectedItemId]);
    }

    public showConfirmDeleteDialog() {
        this.deleteDialogVisible = true;
    }

    public async deleteSelectedChart() {
        this.deleteDialogVisible = false;
        if (this.selectedItemId !== undefined) {
            // delete the post
            this.service.deleteChart(this.selectedItemId);
            // reload the page
            await this.router.navigate(['/']);
            this.router.navigate(['/projects/ghrb/charts']);
        } 
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

class AbsoluteDifficulty {

    public name!: string;
    public tip!: string;

}

