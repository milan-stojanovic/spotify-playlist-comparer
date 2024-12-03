// src/app/infrastructure/api/spotify-api.service.ts
import { Injectable } from "@angular/core";
import axios from "axios";
import { AuthService } from "../../services/auth.service";

@Injectable({
	providedIn: "root",
})
export class SpotifyApiService {
	private apiUrl = "https://api.spotify.com/v1";

	constructor(private authService: AuthService) {}

	private getAuthHeaders() {
		const accessToken = this.authService.getAccessToken();
		if (!accessToken) {
			throw new Error("User not authenticated");
		}
		return { Authorization: `Bearer ${accessToken}` };
	}

	async getUserPlaylists(): Promise<any[]> {
		const response = await axios.get(`${this.apiUrl}/me/playlists`, {
			headers: this.getAuthHeaders(),
		});
		return response.data.items.filter((item: any) => item !== null);
	}

	async getPlaylist(playlistId: string): Promise<any> {
		const response = await axios.get(
			`${this.apiUrl}/playlists/${playlistId}`,
			{
				headers: this.getAuthHeaders(),
			}
		);
		return response.data;
	}

	async getPlaylistTracks(playlistId: string): Promise<any[]> {
		let tracks: any[] = [];
		let url = `${this.apiUrl}/playlists/${playlistId}/tracks`;
		do {
			const response = await axios.get(url, {
				headers: this.getAuthHeaders(),
			});
			tracks = tracks.concat(response.data.items);
			url = response.data.next;
		} while (url);

		return tracks;
	}

	async getLikedSongsTracks(): Promise<any[]> {
		let tracks: any[] = [];
		let url = `${this.apiUrl}/me/tracks?limit=50`;
		do {
			const response = await axios.get(url, {
				headers: this.getAuthHeaders(),
			});
			tracks = tracks.concat(response.data.items);
			url = response.data.next;
		} while (url);
		return tracks;
	}
}
