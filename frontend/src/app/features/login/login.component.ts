import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
	standalone: true,
	imports: [CommonModule, MatButtonModule],
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
	loginToSpotify() {
		window.location.href = "http://localhost:3000/auth/login";
	}
}
