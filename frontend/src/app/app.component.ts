import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { AuthService } from "./core/services/auth.service";

@Component({
	standalone: true,
	imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, CommonModule],
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	private authService = inject(AuthService);
	loggedIn$ = this.authService.loggedIn$;

	async logout() {
		await this.authService.logout();
		window.location.href = "/login"; // Redirect to login page after logout
	}

	goToLogin() {
		window.location.href = "/login";
	}
}
