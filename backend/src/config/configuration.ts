export default () => ({
	spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
	spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI,
	port: parseInt(process.env.APP_PORT, 10) || 3000,
	sessionSecret: process.env.SESSION_SECRET,
});
