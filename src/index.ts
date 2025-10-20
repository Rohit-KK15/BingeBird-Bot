import { createSamplingHandler } from "@iqai/adk";
import * as http from "node:http";
import { getRootAgent } from "./agents/binge-bird-agent/agent.js";
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

	const PORT = process.env.PORT || 3000;

    const server = http.createServer((req, res) => {
        if (req.url === "/" || req.url === "/health") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "ok", service: "bingebird" }));
        } else {
            res.writeHead(404);
            res.end();
        }
    });

    server.listen(PORT, () => {
        console.log(`🏥 Health check server running on port ${PORT}`);
    });
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
