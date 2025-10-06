
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserDetails } from '../../services/auth.service';

@Component({
  template: '<p class="my-8">Login successful. This is a temporary page.</p>'
})
export class LoginSuccessComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // check the session
    this.authService.getUserDetails().subscribe({
      next: (user: UserDetails) => {
        // if logged correctly, move to the home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // redirect if there's an error logging in
        this.router.navigate(['/login?error=true']);
      }
    });
  }

}