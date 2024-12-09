import { Injectable, UnauthorizedException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { Request } from "express";

@Injectable()
export class PlaylistsService {
	constructor(private http: HttpService) { }

	private async getAccessToken(req: Request): Promise<string> {
		const sessionData = req.session["spotify"];
		if (!sessionData || !sessionData.accessToken) {
			throw new UnauthorizedException("Not logged in with Spotify");
		}
		return sessionData.accessToken;
	}

	/**
	 * Fetches all items from a paginated Spotify endpoint until all are retrieved.
	 * @param req - Request object containing session
	 * @param url - Initial Spotify API URL (should include limit, offset if needed)
	 * @returns All retrieved items combined into an array
	 */
	private async fetchAllItems(req: Request, url: string): Promise<any[]> {
		const accessToken = await this.getAccessToken(req);
		const headers = { Authorization: `Bearer ${accessToken}` };

		let allItems = [];
		let nextUrl: string | null = url;

		while (nextUrl) {
			const response = await firstValueFrom(this.http.get(nextUrl, { headers }));
			const data = response.data;
			allItems = allItems.concat(data.items);

			// If `data.next` is null, no more pages. Otherwise, use `data.next` for the next URL.
			nextUrl = data.next;
		}

		return allItems;
	}

	async getUserPlaylists(req: Request): Promise<{ id: string; name: string }[]> {
		// The playlists endpoint: https://api.spotify.com/v1/me/playlists
		// Default limit is 50, but specify it explicitly:
		const url = "https://api.spotify.com/v1/me/playlists?limit=50";
		const items = await this.fetchAllItems(req, url);
		return items.map((p) => ({
			id: p?.id,
			name: p?.name
		}));
	}

	async getLikedSongs(req: Request): Promise<any[]> {
		// The liked tracks endpoint: https://api.spotify.com/v1/me/tracks
		const url = "https://api.spotify.com/v1/me/tracks?limit=50";
		const items = await this.fetchAllItems(req, url);
		return items.map((t) => ({
			id: t.track.id,
			name: t.track.name,
			artist: t.track.artists.map((a) => a.name).join(", ")
		}));
	}

	async getPlaylistTracks(req: Request, playlistId: string): Promise<any[]> {
		if (playlistId === "liked") {
			return this.getLikedSongs(req);
		}
		// For a given playlist: https://api.spotify.com/v1/playlists/{playlist_id}/tracks
		const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`;
		const items = await this.fetchAllItems(req, url);
		return items
			.filter((item) => item.track)
			.map((item) => ({
				id: item.track.id,
				name: item.track.name,
				artist: item.track.artists.map((a) => a.name).join(", ")
			}));
	}

	async comparePlaylists(req: Request, sourceId: string, targetId: string) {
		const [sourceTracks, targetTracks] = await Promise.all([
			this.getPlaylistTracks(req, sourceId),
			this.getPlaylistTracks(req, targetId)
		]);

		const targetTrackIds = new Set(targetTracks.map((t) => t.id));
		const difference = sourceTracks.filter((track) => !targetTrackIds.has(track.id));
		return difference;
	}
}
