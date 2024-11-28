// src/app/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from "./app/routes";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from "./app/presentation/components/app.component";
import { PLAYLIST_REPOSITORY } from "./app/domain/repositories/playlist.repository";
import { SpotifyPlaylistRepository } from "./app/infrastructure/repositories/spotify-playlist.repository";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes)
    ),
    { provide: PLAYLIST_REPOSITORY, useClass: SpotifyPlaylistRepository },
  ],
}).catch((err: any) => console.error(err));
