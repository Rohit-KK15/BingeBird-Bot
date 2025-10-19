import { AgentBuilder } from "@iqai/adk"
import { model } from "../../env.js"
import { getEntertainmentAgent } from "./sub-agents/entertainment-agent/agent.js"
import { getTwitterReviewAgent } from "./sub-agents/twitter-review-agent/agent.js"
import { getWatchlistAgent } from "./sub-agents/watchlist-agent/agent.js"
import dedent from "dedent"
 
export const getRootAgent = async () =>{
    const tmdbAgent= await getEntertainmentAgent();
	const twitterAgent = await getTwitterReviewAgent();
	const watchlistAgent = await getWatchlistAgent();
    return AgentBuilder.create("root_agent")
	.withDescription(
		"Root agent that coordinates between sub-agents to handle movie information, recommendations, and automated Twitter review postings.",
	)
	.withInstruction(dedent`
		- Use the Entertainment sub-agent to fetch, analyze, or summarize details about movies, TV shows, or anime. 
		- Use the Twitter sub-agent to compose or post reviews automatically.
		- Use Watchlist sub-agent to manage the user's wathlist.
		- Avoid confirming past actions or additions. Focus on the current request.
		- Only route user requests to the appropriate sub-agent if they are directly related to entertainment or Twitter reviews.
		- For any other off-topic messages, do not route them to any sub-agent and do not respond.
		`,
	)
	.withModel(model)
	.withSubAgents([tmdbAgent, twitterAgent, watchlistAgent])
	.build();

};