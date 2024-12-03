// src/app/presentation/components/playlist-selector.component.ts
import { Component, OnInit } from "@angular/core";
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

@Component({
	selector: "app-playlist-selector",
	template: `
		<div
			*ngIf="playlists.length > 0; else loadingTemplate"
			class="container"
		>
			<mat-card>
				<h2>Select Playlists to Compare</h2>
				<div class="selection">
					<mat-form-field appearance="fill">
						<mat-label>Playlist 1</mat-label>
						<mat-select [(ngModel)]="selectedPlaylist1Id">
							<mat-option
								*ngFor="let playlist of playlists"
								[value]="playlist.id"
							>
								<span *ngIf="playlist.id === 'liked_songs'">
									<mat-icon>favorite</mat-icon>
									{{ playlist.name }}
								</span>
								<span *ngIf="playlist.id !== 'liked_songs'">
									{{ playlist.name }}
								</span>
							</mat-option>
						</mat-select>
					</mat-form-field>

					<mat-form-field appearance="fill">
						<mat-label>Playlist 2</mat-label>
						<mat-select [(ngModel)]="selectedPlaylist2Id">
							<mat-option
								*ngFor="let playlist of playlists"
								[value]="playlist.id"
							>
								<span *ngIf="playlist.id === 'liked_songs'">
									<mat-icon>favorite</mat-icon>
									{{ playlist.name }}
								</span>
								<span *ngIf="playlist.id !== 'liked_songs'">
									{{ playlist.name }}
								</span>
							</mat-option>
						</mat-select>
					</mat-form-field>
				</div>
				<button
					mat-raised-button
					color="accent"
					(click)="comparePlaylists()"
				>
					Compare Playlists
				</button>
			</mat-card>
		</div>

		<ng-template #loadingTemplate>
			<mat-spinner></mat-spinner>
		</ng-template>

		<div *ngIf="missingTracks.length > 0" class="container">
			<mat-card>
				<h3>
					Tracks in "{{ getPlaylistName(selectedPlaylist1Id) }}"
					missing from "{{ getPlaylistName(selectedPlaylist2Id) }}":
				</h3>
				<mat-list>
					<mat-list-item *ngFor="let track of missingTracks">
						<mat-icon matListIcon>music_note</mat-icon>
						<h4 matLine>{{ track.name }}</h4>
						<p matLine>
							<small>{{ track.artists.join(", ") }}</small>
						</p>
					</mat-list-item>
				</mat-list>
			</mat-card>
		</div>
	`,
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
export class PlaylistSelectorComponent implements OnInit {
	playlists: Playlist[] = [];
	selectedPlaylist1Id: string | null = null;
	selectedPlaylist2Id: string | null = null;
	missingTracks: Track[] = [];
	loading: boolean = false;

	constructor(
		private playlistService: PlaylistService,
		private snackBar: MatSnackBar
	) {}

	async ngOnInit() {
		this.loading = true;
		try {
			this.playlists = await this.playlistService.getUserPlaylists();
		} catch (error) {
			console.error("Error fetching playlists:", error);
			this.snackBar.open("Error fetching playlists.", "Close", {
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
}
