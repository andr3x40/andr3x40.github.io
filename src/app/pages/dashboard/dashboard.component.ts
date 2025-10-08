import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../fragments/section/section-title/section-title.component";
import { DividerModule } from "primeng/divider";
import { AuthService, UserDetails } from '../../services/auth.service';
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-dashboard',
  imports: [SectionTitleComponent, DividerModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public user!: UserDetails | null;

  constructor(private auth: AuthService) { }

  async ngOnInit() {
    this.user = await this.auth.getUserDetails();
  }

}
