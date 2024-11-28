// src/app/domain/models/playlist.ts
import { Track } from './track';

export class Playlist {
  private tracks: Track[] = [];

  constructor(
    public readonly id: string,
    public readonly name: string
  ) { }

  addTrack(track: Track): void {
    if (!this.tracks.some(t => t.equals(track))) {
      this.tracks.push(track);
    }
  }

  getTracks(): Track[] {
    return this.tracks;
  }
}
