import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../../fragments/section/section-title/section-title.component";
import { GhrbService } from '../../../../services/ghrb.service';
import { AuthService, AuthSession } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { Divider } from "primeng/divider";
import { SpeedDial } from "primeng/speeddial";
import { MenuItem } from 'primeng/api';
import { Pack } from '../../../../model/ghrb';
import { DataView } from "primeng/dataview";
import { Skeleton } from "primeng/skeleton";
import { Button } from "primeng/button";
import { Menu } from "primeng/menu";
import { Tag } from "primeng/tag";
import { ButtonGroup } from "primeng/buttongroup";

@Component({
  selector: 'app-ghrb-packs',
  imports: [SectionTitleComponent, Divider, SpeedDial, DataView, Skeleton, Button, Menu, Tag, ButtonGroup],
  templateUrl: './ghrb-packs.component.html',
  styleUrl: './ghrb-packs.component.scss',
})
export class GhrbPacksComponent {

    public session: AuthSession = {details: {authenticated: false}, admin: false};
    
    public packs!: Pack[];
    public placeholders: number[] = [0, 1, 2];

    public adminActions: MenuItem[] = [
        {
            label: "Add",
            icon: "pi pi-pencil",
            command: () => {
                this.router.navigate(['/admin/projects/ghrb/packs/new'])
            }
        }
    ]

    public packCount: number = 0;
    public menuItems: MenuItem[]|undefined;

    constructor(public service: GhrbService, public auth: AuthService, public router: Router) { }

    async ngOnInit() {
        this.session = await this.auth.getUserSession();
        setTimeout(async () => {
            this.packs = await this.service.getAllPacks();
            this.packCount = await this.service.countPacks();
        }, 100);
    }

}
