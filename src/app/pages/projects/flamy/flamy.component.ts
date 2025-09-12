import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../fragments/section/section-title/section-title.component";
import { Divider } from "primeng/divider";

@Component({
  selector: 'app-flamy',
  imports: [SectionTitleComponent, Divider],
  templateUrl: './flamy.component.html',
  styleUrl: './flamy.component.scss'
})
export class FlamyComponent {

}
