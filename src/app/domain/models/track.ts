// src/app/domain/models/track.ts
export class Track {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artists: string[],
    public readonly album: string
  ) { }

  equals(other: Track): boolean {
    return this.id === other.id;
  }
}
