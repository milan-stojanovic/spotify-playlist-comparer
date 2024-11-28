// src/app/presentation/components/callback.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: '<p>Redirecting...</p>',
  standalone: true,
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.handleAuthCallback();
  }
}
