import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../fragments/section/section-title/section-title.component";
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-privacy',
    imports: [SectionTitleComponent, DividerModule, CardModule],
    templateUrl: './privacy.component.html',
    styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

    paragraph = {
        title: {
            fontSize: '24px',
            fontWeight: '800'
        }
    }

}
