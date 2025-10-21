import { config } from "dotenv";
import { z } from "zod";
import { type LanguageModelV2, createOpenRouter } from "@openrouter/ai-sdk-provider";

config();

/**
 * Environment variable schema definition for the simple agent.
 *
 * Defines and validates required environment variables including:
 * - DEBUG: Optional debug mode flag (defaults to "false")
 * - GOOGLE_API_KEY: Required API key for Google/Gemini model access
 */
export const envSchema = z.object({
	ADK_DEBUG: z.coerce.boolean().default(false),
	OPEN_ROUTER_KEY: z.string(),
	LLM_MODEL: z.string().default("openai/gpt-4.1"),
	TMDB_API_KEY: z.string().min(1),
	OMDB_API_KEY: z.string().min(1),
	DATABASE_URL: z.string().min(1),
	TELEGRAM_BOT_TOKEN: z.string().min(1),
	TWITTER_API_KEY: z.string().min(1),
	TWITTER_API_SECRET: z.string().min(1),
	TWITTER_ACCESS_TOKEN: z.string().min(1),
	TWITTER_ACCESS_TOKEN_SECRET: z.string().min(1),
});

/**
 * Validated environment variables parsed from process.env.
 * Throws an error if required environment variables are missing or invalid.
 */
export const env = envSchema.parse(process.env);
export let model: LanguageModelV2;
console.log("🚀 AGENT WILL USE OPENROUTER 🚀");
console.log(`LLM_MODEL: ${env.LLM_MODEL}`);
console.log(`OPEN_ROUTER_KEY: ${env.OPEN_ROUTER_KEY ? "Set" : "Not Set"}`); // Log if key is set, not the key itself
const openrouter = createOpenRouter({
	apiKey: env.OPEN_ROUTER_KEY,
});
model = openrouter(env.LLM_MODEL);