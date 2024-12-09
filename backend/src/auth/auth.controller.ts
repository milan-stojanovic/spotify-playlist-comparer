import { Controller, Get, Query, Redirect, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Get("login")
	@Redirect()
	login() {
		return { url: this.authService.getSpotifyAuthUrl() };
	}

	@Get("callback")
	async callback(@Query("code") code: string, @Req() req: Request, @Res() res: Response) {
		const tokens = await this.authService.exchangeCodeForTokens(code);
		req.session["spotify"] = {
			accessToken: tokens.access_token,
			refreshToken: tokens.refresh_token,
			expiresIn: tokens.expires_in,
			obtainedAt: Date.now(),
		};
		// Redirect back to frontend
		return res.redirect("http://localhost:4200");
	}

	@Get("logout")
	logout(@Req() req: Request, @Res() res: Response) {
		// Destroy the session
		req.session.destroy((err) => {
			if (err) {
				// If there's an error, log it and return an error response
				console.error("Session destroy error:", err);
				return res.status(500).json({ message: "Failed to log out" });
			}
			// On success, the user is effectively logged out
			return res.status(200).json({ message: "Logged out successfully" });
		});
	}
}
