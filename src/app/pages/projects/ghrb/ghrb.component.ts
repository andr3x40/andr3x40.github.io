import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../fragments/section/section-title/section-title.component";
import { Divider } from "primeng/divider";

@Component({
  selector: 'app-ghrb',
  imports: [SectionTitleComponent, Divider],
  templateUrl: './ghrb.component.html',
  styleUrl: './ghrb.component.scss'
})
export class GhrbComponent {

}
