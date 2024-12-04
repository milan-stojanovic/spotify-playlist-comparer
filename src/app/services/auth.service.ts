// src/app/services/auth.service.ts
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private clientId = "a5574594d76d4db88b8a6ac03eb41edf"; // Replace with your Client ID
	private redirectUri = "http://localhost:4200/callback";

	private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
	loggedIn$ = this.loggedInSubject.asObservable();

	constructor(private router: Router) { }

	login() {
		const scopes = [
			"user-read-private",
			"playlist-read-private",
			"playlist-read-collaborative",
			"user-library-read", // Added scope
		];
		const authUrl =
			`https://accounts.spotify.com/authorize` +
			`?response_type=token` +
			`&client_id=${this.clientId}` +
			`&scope=${encodeURIComponent(scopes.join(" "))}` +
			`&redirect_uri=${encodeURIComponent(this.redirectUri)}`;

		window.location.href = authUrl;
	}

	handleAuthCallback() {
		const hashParams = new URLSearchParams(
			window.location.hash.replace("#", "")
		);
		const accessToken = hashParams.get("access_token");
		if (accessToken) {
			localStorage.setItem("spotify_access_token", accessToken);
			this.loggedInSubject.next(true); // Emit new login status
			this.router.navigate(["/"]);
		}
	}

	logout() {
		localStorage.removeItem("spotify_access_token");
		this.loggedInSubject.next(false); // Emit new login status
		this.router.navigate(["/"]);
	}

	getAccessToken(): string | null {
		return localStorage.getItem("spotify_access_token");
	}

	isLoggedIn(): boolean {
		return this.getAccessToken() !== null;
	}
}
