// src/app/routes.ts
import { Routes } from '@angular/router';
import { PlaylistSelectorComponent } from "./presentation/components/playlist-selector.component";
import { CallbackComponent } from "./presentation/components/callback.component";


export const routes: Routes = [
  { path: '', component: PlaylistSelectorComponent },
  { path: 'callback', component: CallbackComponent },
];
