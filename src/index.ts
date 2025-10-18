import { createSamplingHandler } from "@iqai/adk";
import { getRootAgent } from "./agents/agent.js";
import { getTelegramAgent } from "./agents/telegram-agent/agent.js";


async function main() {
	console.log("🤖 Initializing Telegram bot agent...");

	try {
		const { runner } = await getRootAgent();

		// Create sampling handler for the Telegram MCP
		const samplingHandler = createSamplingHandler(runner.ask);

		// Initialize Telegram toolset
		await getTelegramAgent(samplingHandler);

		console.log("✅ Telegram bot agent initialized successfully!");
		console.log("🚀 Bot is now running and ready to receive messages...");

		// Keep the process running
		await keepAlive();
	} catch (error) {
		console.error("❌ Failed to initialize Telegram bot:", error);
		process.exit(1);
	}
}

/**
 * Keep the process alive
 */
async function keepAlive() {
	// Keep the process running
	process.on("SIGINT", () => {
		console.log("\n👋 Shutting down Telegram bot gracefully...");
		process.exit(0);
	});

	// Prevent the process from exiting
	setInterval(() => {
		// This keeps the event loop active
	}, 1000);
}

main().catch(console.error);
