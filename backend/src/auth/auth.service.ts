import { Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import * as querystring from "querystring";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
	private clientId: string;
	private clientSecret: string;
	private redirectUri: string;

	constructor(
		private configService: ConfigService,
		private httpService: HttpService
	) {
		this.clientId = this.configService.get<string>("spotifyClientId");
		this.clientSecret = this.configService.get<string>("spotifyClientSecret");
		this.redirectUri = this.configService.get<string>("spotifyRedirectUri");
	}

	getSpotifyAuthUrl(): string {
		const scopes = [
			"user-read-private",
			"user-read-email",
			"playlist-read-private",
			"user-library-read",
		].join(" ");

		const queryParams = querystring.stringify({
			client_id: this.clientId,
			response_type: "code",
			redirect_uri: this.redirectUri,
			scope: scopes,
		});

		return `https://accounts.spotify.com/authorize?${queryParams}`;
	}

	async exchangeCodeForTokens(code: string) {
		const tokenUrl = "https://accounts.spotify.com/api/token";
		const payload = querystring.stringify({
			code,
			redirect_uri: this.redirectUri,
			grant_type: "authorization_code",
		});

		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " + Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64"),
		};

		const response = await firstValueFrom(
			this.httpService.post(tokenUrl, payload, { headers })
		);
		return response.data;
	}

	async refreshToken(refreshToken: string) {
		const tokenUrl = "https://accounts.spotify.com/api/token";
		const payload = querystring.stringify({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		});

		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " + Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64"),
		};

		const response = await firstValueFrom(
			this.httpService.post(tokenUrl, payload, { headers })
		);
		return response.data;
	}
}
