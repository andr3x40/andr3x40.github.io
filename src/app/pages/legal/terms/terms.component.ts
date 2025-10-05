import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../fragments/section/section-title/section-title.component";
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-terms',
    imports: [SectionTitleComponent, DividerModule, CardModule],
    templateUrl: './terms.component.html',
    styleUrl: './terms.component.scss'
})
export class TermsComponent {

    paragraph = {
        title: {
            fontSize: '24px',
            fontWeight: '800'
        }
    }

}
