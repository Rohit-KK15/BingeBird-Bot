import { AgentBuilder, LlmAgent, type SamplingHandler } from "@iqai/adk";
import { getTelegramTools } from "./tool.js"
import { model } from "../../env.js";

export const getTelegramAgent = async (samplingHandler: SamplingHandler) => {
	const telegramMcpTools = await getTelegramTools(samplingHandler);
	return AgentBuilder
		.create("telegram_agent")
		.withModel(model)
		.withTools(...telegramMcpTools)
		.build();
};