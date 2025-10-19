
<div align="center">


# BingeBird - Telegram Bot

</div>

BingeBird is an entertainment-based AI Agent integrated as a Telegram Bot that fetches information about Movies, TV Shows, Anime, and all types of entertainment. It helps users craft review tweets and automatically post them on X (formerly Twitter), and also manages a user's watchlist.

## Features
- Fetches detailed information about movies, TV shows, anime, and other entertainment content.
- Assists users in generating and posting review tweets on X (Twitter).
- Manages a personalized watchlist for users.
- Integrated as a Telegram Bot for easy interaction.

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- pnpm (recommended) or npm/yarn

### Installation
```bash
pnpm install
```

### Environment Variables
Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

**Required variables:**

- `ADK_DEBUG` — Optional debug mode flag (defaults to `false`)
- `OPEN_ROUTER_KEY` — API key for OpenRouter (if used)
- `LLM_MODEL` — LLM model name (default: `openai/gpt-4.1`)
- `TMDB_API_KEY` — API key for The Movie Database (TMDB)
- `OMDB_API_KEY` — API key for The Open Movie Database (OMDB)
- `DATABASE_URL` — Database connection URL
- `TELEGRAM_BOT_TOKEN` — Telegram bot token
- `TWITTER_API_KEY` — API key for Twitter/X
- `TWITTER_API_SECRET` — API secret for Twitter/X
- `TWITTER_ACCESS_TOKEN` — Access token for Twitter/X
- `TWITTER_ACCESS_TOKEN_SECRET` — Access token secret for Twitter/X

### Build
```bash
pnpm run build
```

### Development
```bash
pnpm run dev
```

### Production
```bash
pnpm run start
```

## Usage
The agent will start, initialize all toolsets, and be ready to interact via Telegram. It will respond to user queries for entertainment information, help create and post reviews on X, and manage watchlists.

## 📁 Project Structure
```
├── src/
│   ├── agents/
│   │   ├── binge-bird-agent/           # Root BingeBird Agent
│   │   │   ├── agent.ts
│   │   │   └── sub-agents/
│   │   │       ├── entertainment-agent/ # Fetches entertainment info
│   │   │       │   ├── agent.ts
│   │   │       │   └── tool.ts
│   │   │       ├── twitter-review-agent/  # Helps craft and post Twitter reviews
│   │   │       │   ├── agent.ts
│   │   │       │   └── tool.ts
│   │   │       └── watchlist-agent/       # Manages user watchlists
│   │   │           ├── agent.ts
│   │   │           └── tool.ts
│   │   └── telegram-agent/               # Handles Telegram interactions
│   │       ├── agent.ts
│   │       └── tool.ts
│   ├── env.ts                        # Environment variable validation
│   ├── index.ts                      # Main execution entry point
│   ├── services/
│   │   └── twitter.ts                # Twitter API service
│   └── types.ts                      # Type definitions
```

## License
MIT