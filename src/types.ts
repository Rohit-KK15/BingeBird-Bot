export type WatchlistItem = {
	id: string;
	title: string;
	type: "movie" | "tv_show";
	releaseYear?: number;
	genre?: string[];
	watched: boolean;
	imdb?: number;
	addedOn: string;
};

export type WatchlistAgentState = {
	watchlist: WatchlistItem[];
};