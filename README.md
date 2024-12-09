# Spotify Playlist Comparer

Spotify Playlist Comparer is a web application that allows users to log in with their Spotify account, view their playlists (including Liked Songs), and compare two playlists to see which tracks are present in one but not the other.

## Features

-   **Spotify OAuth Authentication**: Securely log in using your Spotify account.
-   **Playlist & Liked Songs Retrieval**: Fetch all playlists and Liked Songs without 50-item limits (pagination implemented).
-   **Playlist Comparison**: Compare two playlists to find tracks unique to one playlist.
-   **User Session & Logout**: Sessions are stored on the backend; you can easily log out to terminate the session.
-   **Responsive UI**: Built with Angular and Angular Material for a polished, responsive user interface.

## Technology Stack

-   **Backend**: NestJS (TypeScript), `express-session` for sessions, `axios` for Spotify API calls
-   **Frontend**: Angular with standalone components, Angular Material for UI components
-   **Spotify Web API**: Used for authentication (OAuth) and retrieving playlist/track data

## Requirements

-   Node.js (LTS recommended)
-   npm
-   Angular CLI (`npm install -g @angular/cli`)
-   NestJS CLI (`npm install -g @nestjs/cli`)
-   A Spotify Developer account and a registered Spotify app with a **Client ID**, **Client Secret**, and configured Redirect URI.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/milan-stojanovic/spotify-playlist-comparer.git
cd spotify-playlist-comparer
```

### 2. Configure environment variables:

In `spotify-playlist-comparer/backend`, create a `.env` file:

```bash
SPOTIFY_CLIENT_ID=<your_spotify_client_id>
SPOTIFY_CLIENT_SECRET=<your_spotify_client_secret>
SPOTIFY_REDIRECT_URI=http://localhost:3000/auth/callback
APP_PORT=3000
SESSION_SECRET=<some_secure_random_string>
```

Make sure the SPOTIFY_REDIRECT_URI matches what you’ve set in your Spotify Developer Dashboard.

### 3. Install dependencies:

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

## Running the Application

### 1. Start the backend:

```bash
cd ../backend
npm run start:dev
```

The backend runs on `http://localhost:3000`.

### 2. Start the frontend:

```bash
cd ../frontend
ng serve
```

The frontend runs on `http://localhost:4200`.

## Using the Application

1. Open http://localhost:4200 in your browser.
2. If you are not logged in, a login icon will appear in the toolbar. Click it to initiate the Spotify OAuth flow.
3. After approving access on Spotify’s page, you will be redirected back to the frontend.
4. Once logged in, select two playlists (including "Liked Songs" if desired) and click "Compare" to view the unique tracks.
5. To log out, click the logout icon in the toolbar. This clears the session, requiring a new login to access playlists again.

## Notes and Troubleshooting

-   Ensure cookies are enabled, as sessions depend on them.
-   If you encounter a `401 Unauthorized` error, verify that:
    -   You have successfully logged in.
    -   CORS and `withCredentials` are correctly configured in the frontend.
    -   The session is stored and retrieved properly by the backend.
-   To change themes or adjust styling, review the `frontend/src/styles.scss` and Material theme imports.

## Future Improvements

TBD
