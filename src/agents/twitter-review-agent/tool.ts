import { createTool, type BaseTool } from "@iqai/adk";
import { postTweet } from "./twitterApi.js";
import { z } from 'zod';

export const getTwitterReviewTools = async (): Promise<BaseTool[]> => {
	const postTweetTool = createTool({
		name: "post_tweet",
		description: "Posts a tweet to the user's Twitter account. Input should be the tweet content (string, max 280 characters).",
		schema: z.object({
			tweetText: z.string().max(280).describe("The content of the tweet (max 280 characters)."),
		}),
		fn: async ({ tweetText }: { tweetText: string }) => {
			return await postTweet(tweetText);
		},
	});

	return [postTweetTool];
};
