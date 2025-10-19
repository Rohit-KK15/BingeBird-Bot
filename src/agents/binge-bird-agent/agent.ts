import { AgentBuilder, createDatabaseSessionService } from "@iqai/adk"
import { env, model } from "../../env.js"
import { getEntertainmentAgent } from "./sub-agents/entertainment-agent/agent.js"
import { getTwitterReviewAgent } from "./sub-agents/twitter-review-agent/agent.js"
import dedent from "dedent"

const APP_NAME = "task_master";
const USER_ID = "default_user";
const SESSION_ID = "default_session";

export const getRootAgent = async () =>{
    const tmdbAgent= await getEntertainmentAgent();
	const twitterAgent = await getTwitterReviewAgent();
	const sessionService = createDatabaseSessionService(env.DATABASE_URL);
	const initialState = {
		watchlist: []
	};
	let session = await sessionService.getSession(APP_NAME,USER_ID,SESSION_ID);
	if (!session) {
		session = await sessionService.createSession(
			APP_NAME,
			USER_ID,
			initialState,
			SESSION_ID,
		);
	}
    return AgentBuilder.create("root_agent")
	.withDescription(
		"Root agent that coordinates between sub-agents to handle movie information, recommendations, automated Twitter review postings, and watchlist management.",
	)
	.withSessionService(sessionService, { userId: USER_ID, appName: APP_NAME })
	.withSession(session)
	.withInstruction(dedent`
		- Use the Entertainment sub-agent to fetch, analyze, or summarize details about movies, TV shows, or anime, and to manage the user's watchlist. 
		- Use the Twitter sub-agent to compose or post reviews automatically.
		- Avoid confirming past actions or additions. Focus on the current request.
		- Only route user requests to the appropriate sub-agent if they are directly related to entertainment, watchlist management, or Twitter reviews.
		- For any other off-topic messages, do not route them to any sub-agent and do not respond.
		`,
	)
	.withModel(model)
	.withSubAgents([tmdbAgent, twitterAgent])
	.build();

};