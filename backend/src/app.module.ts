import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PlaylistsModule } from "./playlists/playlists.module";
import configuration from "./config/configuration";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		AuthModule,
		PlaylistsModule,
	],
})
export class AppModule {}
