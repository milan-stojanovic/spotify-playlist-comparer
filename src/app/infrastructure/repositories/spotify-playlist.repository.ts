// src/app/infrastructure/repositories/spotify-playlist.repository.ts
import { Injectable } from '@angular/core';
import { PlaylistRepository } from '../../domain/repositories/playlist.repository';
import { Playlist } from '../../domain/models/playlist';
import { Track } from '../../domain/models/track';
import { SpotifyApiService } from '../api/spotify-api.service';

@Injectable()
export class SpotifyPlaylistRepository implements PlaylistRepository {
  constructor(private apiService: SpotifyApiService) { }

  async getUserPlaylists(): Promise<Playlist[]> {
    const playlistsData = await this.apiService.getUserPlaylists();

    // Create a Playlist instance for "Liked Songs"
    const likedSongsPlaylist = new Playlist('liked_songs', 'Liked Songs');

    const playlists = playlistsData.map(
      (data) => new Playlist(data.id, data.name)
    );

    // Include "Liked Songs" at the beginning of the playlists array
    return [likedSongsPlaylist, ...playlists];
  }

  async getPlaylistTracks(playlistId: string): Promise<Playlist> {
    if (playlistId === 'liked_songs') {
      return this.getLikedSongsPlaylist();
    }

    const playlistData = await this.apiService.getPlaylist(playlistId);
    const playlist = new Playlist(playlistData.id, playlistData.name);
    const tracksData = await this.apiService.getPlaylistTracks(playlistId);

    tracksData.forEach((data) => {
      const track = new Track(
        data.track.id,
        data.track.name,
        data.track.artists.map((artist: any) => artist.name),
        data.track.album.name
      );
      playlist.addTrack(track);
    });

    return playlist;
  }

  private async getLikedSongsPlaylist(): Promise<Playlist> {
    const playlist = new Playlist('liked_songs', 'Liked Songs');
    const tracksData = await this.apiService.getLikedSongsTracks();

    tracksData.forEach((data) => {
      const track = new Track(
        data.track.id,
        data.track.name,
        data.track.artists.map((artist: any) => artist.name),
        data.track.album.name
      );
      playlist.addTrack(track);
    });

    return playlist;
  }
}
