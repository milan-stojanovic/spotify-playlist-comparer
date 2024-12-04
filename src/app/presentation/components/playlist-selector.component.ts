// src/app/presentation/components/playlist-selector.component.ts
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PlaylistService } from "../../application/playlist.service";
import { Playlist } from "../../domain/models/playlist";
import { Track } from "../../domain/models/track";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { NgIf, NgFor } from "@angular/common";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: "app-playlist-selector",
	templateUrl: "./playlist-selector.component.html",
	styles: [
		`
			.container {
				display: flex;
				justify-content: center;
				margin: 20px;
			}
			.selection {
				display: flex;
				gap: 20px;
				margin-bottom: 20px;
			}
			mat-card {
				max-width: 800px;
				width: 100%;
			}
			mat-form-field {
				width: 100%;
			}
		`,
	],
	standalone: true,
	imports: [
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatListModule,
		MatIconModule,
		FormsModule,
		NgIf,
		NgFor,
		MatSnackBarModule,
		MatProgressSpinnerModule,
	],
})
export class PlaylistSelectorComponent implements OnInit, OnDestroy {
	playlists: Playlist[] = [];
	selectedPlaylist1Id: string | null = null;
	selectedPlaylist2Id: string | null = null;
	missingTracks: Track[] = [];
	loading: boolean = false;

	private loginSubscription!: Subscription;

	constructor(
		public authService: AuthService,
		private playlistService: PlaylistService,
		private snackBar: MatSnackBar
	) { }

	async ngOnInit() {
		if (this.authService.isLoggedIn()) {
			this.fetchPlaylists();
		}

		this.loginSubscription = this.authService.loggedIn$.subscribe((loggedIn) => {
			if (loggedIn) {
				this.fetchPlaylists();
			}
		});
	}

	private async fetchPlaylists() {
		this.loading = true;
		try {
			this.playlists = await this.playlistService.getUserPlaylists();
		} catch (error) {
			console.error('Error fetching playlists:', error);
			this.snackBar.open('Error fetching playlists.', 'Close', {
				duration: 3000,
			});
		} finally {
			this.loading = false;
		}
	}


	async comparePlaylists() {
		if (!this.selectedPlaylist1Id || !this.selectedPlaylist2Id) {
			this.snackBar.open(
				"Please select two playlists to compare.",
				"Close",
				{
					duration: 3000,
				}
			);
			return;
		}

		this.loading = true;
		try {
			this.missingTracks = await this.playlistService.comparePlaylists(
				this.selectedPlaylist1Id,
				this.selectedPlaylist2Id
			);
		} catch (error) {
			console.error("Error comparing playlists:", error);
			this.snackBar.open("Error comparing playlists.", "Close", {
				duration: 3000,
			});
		} finally {
			this.loading = false;
		}
	}

	getPlaylistName(playlistId: string | null): string {
		const playlist = this.playlists.find(p => p.id === playlistId);
		return playlist ? playlist.name : "";
	}

	ngOnDestroy() {
		if (this.loginSubscription) {
			this.loginSubscription.unsubscribe();
		}
	}
}
