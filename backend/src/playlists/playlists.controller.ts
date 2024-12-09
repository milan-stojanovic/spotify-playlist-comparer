import { Controller, Get, Query, Req } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { Request } from "express";

@Controller("playlists")
export class PlaylistsController {
	constructor(private readonly playlistsService: PlaylistsService) {}

	@Get()
	async getUserPlaylists(@Req() req: Request) {
		const playlists = await this.playlistsService.getUserPlaylists(req);
		// Prepend a pseudo-playlist for Liked Songs
		return [{ id: "liked", name: "Liked Songs" }, ...playlists];
	}

	@Get("compare")
	async comparePlaylists(
		@Req() req: Request,
		@Query("source") sourceId: string,
		@Query("target") targetId: string
	) {
		return this.playlistsService.comparePlaylists(req, sourceId, targetId);
	}
}
