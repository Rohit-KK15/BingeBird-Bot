import { createTool } from "@iqai/adk"
import { z } from "zod"
import { WatchlistItem } from "../../../../types.js"

export const addToWatchlist = createTool({
	name: "add_to_watchlist",
	description: "Adds a movie or TV show to the user's watchlist.",
	schema: z.object({
		title: z.string().describe("The title of the movie or TV show."),
		type: z.enum(["movie", "tv_show"]).describe("The type of media (movie or tv_show)."),
		releaseYear: z.number().optional().describe("The release year of the movie or TV show."),
		genre: z.array(z.string()).optional().describe("An array of genres for the movie or TV show."),
        imdb: z.number().optional().describe("The IMDB rating of the movie or TV show.")
	}),
	fn: ({ title, type, releaseYear, genre, imdb }, context) => {
		const watchlist: WatchlistItem[] = context.state.get(
			"watchlist",
			[],
		);
		const newWatchlistItem: WatchlistItem = {
			id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
			title: title,
			type: type,
			releaseYear: releaseYear,
            imdb: imdb,
			genre: genre,
			watched: false,
			addedOn: new Date().toLocaleDateString('en-CA'),
		};
        watchlist.push(newWatchlistItem);
		context.state.set("watchlist", watchlist);
		return {
			success: true,
			item: newWatchlistItem,
			message: `Added ${title} to your Watchlist`,
			total_items: watchlist.length,
		};
	},
});

export const removeFromWatchlist = createTool({
	name: "remove_from_watchlist",
	description: "Removes a movie or TV show from the user's watchlist.",
	schema: z.object({
		id: z.string().describe("The ID of the watchlist item to remove.")
	}),
	fn: ({id}, context) => {
		let watchlist: WatchlistItem[] = context.state.get("watchlist", []);
		const initialLength = watchlist.length;
		watchlist = watchlist.filter(item => item.id !== id);
		context.state.set("watchlist", watchlist);
		if (watchlist.length < initialLength) {
			console.log(`Removed from watchlist: ${id}`);
			return { success: true, id: id, message: `Removed item with ID ${id} from your Watchlist.` };
		} else {
			console.log(`Item with ID ${id} not found in watchlist.`);
			return { success: false, id: id, message: `Item with ID ${id} not found in your Watchlist.` };
		}
	},
});

export const markAsWatched = createTool({
	name: "mark_as_watched",
	description: "Marks a movie or TV show in the watchlist as watched.",
	schema: z.object({
		id: z.string().describe("The ID of the watchlist item to mark as watched."),
	}),
	fn: ({id}, context) => {
		const watchlist: WatchlistItem[] = context.state.get("watchlist", []);
		const itemIndex = watchlist.findIndex(item => item.id === id);

		if (itemIndex !== -1) {
			watchlist[itemIndex].watched = true;
			context.state.set("watchlist", watchlist);
			console.log(`Marked as watched: ${id}`);
			return { success: true, id: id, message: `Marked item with ID ${id} as watched.` };
		} else {
			console.log(`Item with ID ${id} not found in watchlist.`);
			return { success: false, id: id, message: `Item with ID ${id} not found in your Watchlist.` };
		}
	},
});

export const getWatchlist = createTool({
	name: "get_watchlist",
	description: "Retrieves the user's current watchlist.",
	schema: z.object({}),
	fn: async (_, context) => {
		const watchlist: WatchlistItem[] = context.state.get("watchlist", []);
		console.log("Retrieving watchlist...");
		return { success: true, watchlist: watchlist, total_items: watchlist.length };
	},
});

export const removeWatchedItems = createTool({
	name: "remove_watched_from_watchlist",
	description: "Removes all watched movies and TV shows from the watchlist.",
	schema: z.object({}),
	fn: (_, context) => {
		let watchlist: WatchlistItem[] = context.state.get("watchlist", []);
		const initialLength = watchlist.length;
		watchlist = watchlist.filter(item => !item.watched);
		context.state.set("watchlist", watchlist);

		if (watchlist.length < initialLength) {
			const removedCount = initialLength - watchlist.length;
			console.log(`Removed ${removedCount} watched items from watchlist.`);
			return { success: true, message: `Removed ${removedCount} watched items from your Watchlist.`, total_items: watchlist.length };
		} else {
			console.log("No watched items found in watchlist.");
			return { success: false, message: "No watched items found in your Watchlist to remove." };
		}
	},
});

export const clearWatchlist = createTool({
	name: "clear_watchlist",
	description: "Clears all items from the watchlist.",
	schema: z.object({}),
	fn: (_, context) => {
		const initialWatchlist: WatchlistItem[] = context.state.get("watchlist", []);
		if (initialWatchlist.length > 0) {
			context.state.set("watchlist", []);
			console.log("Watchlist cleared.");
			return { success: true, message: "Your Watchlist has been cleared.", total_items: 0 };
		} else {
			console.log("Watchlist is already empty.");
			return { success: false, message: "Your Watchlist is already empty." };
		}
	},
});

