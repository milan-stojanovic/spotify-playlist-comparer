import { Module } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { PlaylistsController } from "./playlists.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
	imports: [HttpModule],
	providers: [PlaylistsService],
	controllers: [PlaylistsController],
})
export class PlaylistsModule {}
