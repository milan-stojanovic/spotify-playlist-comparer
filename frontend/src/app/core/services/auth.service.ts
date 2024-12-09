import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({ providedIn: "root" })
export class AuthService {
	private loggedInSubject = new BehaviorSubject<boolean>(false);
	loggedIn$ = this.loggedInSubject.asObservable();

	constructor(private api: ApiService) {
		// On app start, we can check login status by trying to get playlists:
		this.checkLoginStatus();
	}

	async checkLoginStatus() {
		try {
			await this.api.getPlaylists();
			this.setLoggedIn(true);
		} catch {
			this.setLoggedIn(false);
		}
	}

	setLoggedIn(status: boolean) {
		this.loggedInSubject.next(status);
	}

	async logout() {
		await this.api.logout();
		this.setLoggedIn(false);
	}
}
