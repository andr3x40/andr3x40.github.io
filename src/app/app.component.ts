import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from "./fragments/footer/footer.component";
import { HeaderComponent } from "./fragments/header/header.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ButtonModule, FooterComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web';
}
