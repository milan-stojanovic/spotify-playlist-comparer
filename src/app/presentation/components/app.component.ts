// src/app/presentation/components/app.component.ts
import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
	selector: "app-root",
	template: `
		<mat-toolbar color="primary">
			<span>Spotify Playlist Comparer</span>
			<span class="spacer"></span>
			<ng-container *ngIf="authService.loggedIn$ | async as isLoggedIn">
				<button mat-button *ngIf="!isLoggedIn" (click)="authService.login()">
					Login with Spotify
				</button>
				<button mat-button *ngIf="isLoggedIn" (click)="authService.logout()">
					Logout
				</button>
			</ng-container>
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
	imports: [RouterOutlet, MatToolbarModule, MatButtonModule, NgIf, AsyncPipe],
})
export class AppComponent {
	constructor(public authService: AuthService) { }
}
