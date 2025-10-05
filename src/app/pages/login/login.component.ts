import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SectionTitleComponent } from "../../fragments/section/section-title/section-title.component";
import { SiGithubIcon, SiGoogleIcon } from '@semantic-icons/simple-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, DividerModule, SectionTitleComponent, SiGoogleIcon, SiGithubIcon, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
