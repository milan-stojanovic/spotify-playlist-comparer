import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./features/playlists/playlists.component").then((m) => m.PlaylistsComponent),
	},
	{
		path: "login",
		loadComponent: () =>
			import("./features/login/login.component").then((m) => m.LoginComponent),
	},
];
