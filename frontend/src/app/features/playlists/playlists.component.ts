import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ApiService } from "../../core/services/api.service";
import { AuthService } from "../../core/services/auth.service";

@Component({
	standalone: true,
	imports: [
		CommonModule,
		MatSelectModule,
		MatButtonModule,
		FormsModule,
		MatCardModule,
		MatProgressSpinnerModule,
		MatSnackBarModule
	],
	selector: "app-playlists",
	templateUrl: "./playlists.component.html",
	styleUrls: ["./playlists.component.scss"]
})
export class PlaylistsComponent implements OnInit {
	private api = inject(ApiService);
	private snackBar = inject(MatSnackBar);
	private authService = inject(AuthService);

	playlists: { id: string; name: string }[] = [];
	selectedPlaylistA: string | null = null;
	selectedPlaylistB: string | null = null;
	differenceTracks: any[] = [];
	loading = false;
	comparing = false;

	loggedIn$ = this.authService.loggedIn$; // We can display UI changes based on this observable

	async ngOnInit(): Promise<void> {
		this.loading = true;
		try {
			const playlists = await this.api.getPlaylists();
			this.playlists = playlists ?? [];
		} catch (e: any) {
			// Show an error if not logged in or other error
			this.showErrorSnackBar("Failed to load playlists. Please login or try again.");
		} finally {
			this.loading = false;
		}
	}

	async compare(): Promise<void> {
		if (!this.selectedPlaylistA || !this.selectedPlaylistB) return;

		this.comparing = true;
		this.differenceTracks = [];
		try {
			this.differenceTracks = (await this.api.comparePlaylists(this.selectedPlaylistA, this.selectedPlaylistB)) ?? [];
		} catch (e: any) {
			this.showErrorSnackBar("Failed to compare playlists. Please try again.");
		} finally {
			this.comparing = false;
		}
	}

	get canCompare(): boolean {
		return !!this.selectedPlaylistA && !!this.selectedPlaylistB && !this.loading;
	}

	private showErrorSnackBar(message: string) {
		this.snackBar.open(message, "Close", {
			duration: 3000,
			verticalPosition: "top"
		});
	}
}
