// src/app/application/playlist.service.ts
import { Inject, Injectable } from '@angular/core';
import { PlaylistRepository, PLAYLIST_REPOSITORY } from '../domain/repositories/playlist.repository';
import { Playlist } from '../domain/models/playlist';
import { Track } from '../domain/models/track';
import { PlaylistComparisonService } from '../domain/services/playlist-comparison.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(@Inject(PLAYLIST_REPOSITORY) private playlistRepository: PlaylistRepository) { }

  getUserPlaylists(): Promise<Playlist[]> {
    return this.playlistRepository.getUserPlaylists();
  }

  async comparePlaylists(
    sourcePlaylistId: string,
    targetPlaylistId: string
  ): Promise<Track[]> {
    const [sourcePlaylist, targetPlaylist] = await Promise.all([
      this.playlistRepository.getPlaylistTracks(sourcePlaylistId),
      this.playlistRepository.getPlaylistTracks(targetPlaylistId),
    ]);

    return PlaylistComparisonService.findMissingTracks(
      sourcePlaylist,
      targetPlaylist
    );
  }
}
