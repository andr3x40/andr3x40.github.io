import { Component, OnDestroy } from '@angular/core';
import { SectionTitleComponent } from "../../../fragments/section/section-title/section-title.component";
import { DividerModule } from "primeng/divider";
import { TerminalModule, TerminalService } from "primeng/terminal";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-console',
  imports: [SectionTitleComponent, DividerModule, TerminalModule],
  providers: [TerminalService],
  templateUrl: './admin-console.component.html',
  styleUrl: './admin-console.component.scss'
})
export class AdminConsoleComponent implements OnDestroy {
    subscription: Subscription;

    constructor(private terminalService: TerminalService) {
        this.subscription = this.terminalService.commandHandler.subscribe((command) => {
            let response = command === 'date' ? new Date().toDateString() : 'Unknown command: ' + command;
            this.terminalService.sendResponse(response);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    
}