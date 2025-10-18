import { type BaseTool, McpConfig, McpToolset } from "@iqai/adk";
import { env } from "../../env.js"
import dotenv from "dotenv"

dotenv.config();

let tools: BaseTool[];

export const getTmdbTools = async () => {
	const tmdbMcpConfig: McpConfig = {
		name: "TMDB MCP Server",
		description:"MCP server for TMDB",
		transport: {
			mode: "stdio",
			command: "node",
			args: ["D:\\adk-ts-main\\adk-ts-main\\apps\\starter-templates\\entertainment-mcp\\dist\\index.js"],
			env: {
				TMDB_API_KEY: env.TMDB_API_KEY,
				OMDB_API_KEY: env.OMDB_API_KEY,
				PATH: process.env.PATH as string
			},
		},
	};


	const tmdbToolset = new McpToolset(tmdbMcpConfig);
	const tools = await tmdbToolset.getTools();

	return tools;
};
