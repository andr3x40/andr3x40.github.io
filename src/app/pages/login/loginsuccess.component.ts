
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserDetails } from '../../services/auth.service';

@Component({
  template: '<p class="my-8">Login successful. Please wait.</p>'
})
export class LoginSuccessComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    // check the session
    let user: UserDetails | null = await this.authService.getUserDetails();
    if (user === null) this.router.navigate(['/login?error=true']);
    else this.router.navigate(['/dashboard']);
  }

}