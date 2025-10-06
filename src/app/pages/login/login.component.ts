import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SectionTitleComponent } from "../../fragments/section/section-title/section-title.component";
import { SiGithubIcon, SiGoogleIcon } from '@semantic-icons/simple-icons';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, DividerModule, SectionTitleComponent, SiGoogleIcon, SiGithubIcon, RouterLink, FloatLabelModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private apiUrl = "http://localhost:8080";

  constructor(private http: HttpService, private router: Router) {
  }

  /**
   * Login the user using an OAuth2 provider.
   * @param provider the provider to use
   */
  login(provider: 'google' | 'github') {
    // force the window to change URL for now
    // TODO find a better solution
    window.location.href = `${this.apiUrl}/oauth2/authorization/${provider}`;
  }

}
