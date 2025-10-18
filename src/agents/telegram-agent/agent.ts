import { LlmAgent, type SamplingHandler } from "@iqai/adk";
import { getTelegramTools } from "./tool.js"
import { model } from "../../env.js";

export const getTelegramAgent = async (samplingHandler: SamplingHandler) => {
	const telegramMcpTools = await getTelegramTools(samplingHandler);
	const telegramAgent = new LlmAgent({
		name: "telegram_agent",
		description:
			"An agent capable of interacting with Telegram. It can send messages, add reactions to messages, retrieve group and channel information, and perform various Telegram management tasks.",
		model: model,
		tools: telegramMcpTools,
		instruction: `
			When a user sends a message, first react to it with a relevant emoji using the 'telegram_add_reaction' tool, and then send a response using the 'telegram_send_message' tool.
			Only respond to messages that are related to entertainment (movies, TV shows, anime) or posting reviews on Twitter. For any off-topic messages, do not respond with a message, only react with an emoji.
		`,
	});
	return telegramAgent;
};