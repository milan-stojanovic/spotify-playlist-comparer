import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ApiService {
	private baseUrl = "http://localhost:3000";

	constructor(private http: HttpClient) { }

	getPlaylists() {
		return this.http
			.get<
				{ id: string; name: string }[]
			>(`${this.baseUrl}/playlists`, { withCredentials: true })
			.toPromise();
	}

	comparePlaylists(sourceId: string, targetId: string) {
		return this.http
			.get<
				any[]
			>(`${this.baseUrl}/playlists/compare?source=${sourceId}&target=${targetId}`, { withCredentials: true })
			.toPromise();
	}

	logout() {
		return this.http.get<{ message: string }>(`${this.baseUrl}/auth/logout`, { withCredentials: true }).toPromise();
	}
}
