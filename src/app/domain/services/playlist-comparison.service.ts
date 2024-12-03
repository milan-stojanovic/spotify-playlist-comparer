// src/app/domain/services/playlist-comparison.service.ts
import { Playlist } from "../models/playlist";
import { Track } from "../models/track";

export class PlaylistComparisonService {
	static findMissingTracks(
		sourcePlaylist: Playlist,
		targetPlaylist: Playlist
	): Track[] {
		const targetTrackIds = new Set(
			targetPlaylist.getTracks().map(track => track.id)
		);

		return sourcePlaylist
			.getTracks()
			.filter(track => !targetTrackIds.has(track.id));
	}
}
