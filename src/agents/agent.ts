import { AgentBuilder } from "@iqai/adk"
import { model } from "../env.js"
import { getTmdbAgent } from "./entertainment-agent/agent.js"
import { getTwitterReviewAgent } from "./twitter-review-agent/agent.js"
 
export const getRootAgent = async () =>{
    const tmdbAgent= await getTmdbAgent();
	const twitterAgent = await getTwitterReviewAgent();
    return AgentBuilder.create("root_agent")
	.withDescription(
		"Root agent that coordinates between sub-agents to handle movie information, recommendations, and automated Twitter review postings.",
	)
	.withInstruction(
		"Use the TMDB sub-agent to fetch, analyze, or summarize details about movies, TV shows, or anime. Use the Twitter sub-agent to compose or post reviews automatically. Only route user requests to the appropriate sub-agent if they are directly related to entertainment or Twitter reviews. For any other off-topic messages, do not route them to any sub-agent and do not respond.",
	)
	.withModel(model)
	.withSubAgents([tmdbAgent, twitterAgent])
	.build();

};