// src/app/domain/repositories/playlist.repository.ts
import { InjectionToken } from '@angular/core';
import { Playlist } from '../models/playlist';

export interface PlaylistRepository {
  getUserPlaylists(): Promise<Playlist[]>;
  getPlaylistTracks(playlistId: string): Promise<Playlist>;
}

export const PLAYLIST_REPOSITORY = new InjectionToken<PlaylistRepository>('PlaylistRepository');
