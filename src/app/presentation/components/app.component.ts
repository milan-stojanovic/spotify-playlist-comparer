// src/app/presentation/components/app.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Spotify Playlist Comparer</span>
      <span class="spacer"></span>
      <button mat-button *ngIf="!authService.isLoggedIn()" (click)="authService.login()">
        Login with Spotify
      </button>
      <button mat-button *ngIf="authService.isLoggedIn()" (click)="authService.logout()">
        Logout
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, NgIf],
})
export class AppComponent {
  constructor(public authService: AuthService) { }
}
