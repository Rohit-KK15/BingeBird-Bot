<div align="center">

# 🎬 BingeBird – AI Powered Telegram Bot

</div>

**BingeBird** is an entertainment-based **AI Agent**, built using the **⚙️ ADK-TS by IQAI** framework and integrated as a  **Telegram Bot**.
It leverages the [ Entertainment MCP](https://github.com/Rohit-KK15/entertainment-mcp) (**Model Context Protocol**) server to fetch comprehensive information about **Movies**, **TV Shows**, **Anime**, and all types of entertainment.

BingeBird empowers users to **craft review tweets** , **post them automatically on X (formerly Twitter)**, and efficiently **manage their personalized watchlist** — all through a seamless Telegram experience.

---

## 🌟 Features

- 🎥 **Rich Entertainment Information** – Fetches content via the custom Entertainment MCP.  
- 🤖 **AI-Powered Review Generation** – Helps generate and post review tweets on X (Twitter).  
- 📺 **Personalized Watchlist Management** – Manages a personal watchlist using ADK-TS built-in state management.  
- 💬 **Seamless Telegram Integration** – Chat-based, intuitive experience inside Telegram.  
- ⚙️ **Built with ADK-TS** – Leverages **ADK-TS (Agent Development Kit for TypeScript)** for robust **agent orchestration** and **tool integration**.  

---

## 🧠 Technologies Used

- 🧩 **ADK-TS by IQAI** – Core framework for scalable AI agents.  
    - 🪄 *Scalable AI Agents* – Enables building robust, extensible multi-agent systems.  
    - 🔄 *Agent Orchestration* – Seamless coordination of multiple agents.  
    - 🧰 *Tool Integration* – Simplifies incorporation of APIs and external tools.  
- ⚡ **fastmcp** – Used for the custom Entertainment MCP server, standardizing entertainment API interactions.  
- 🎞️ **TMDB & OMDB Integration** – For movie, show, and actor data, search, and discovery.  
- 💬 **MCP-Telegram** – Enables natural Telegram-based user interactions.  
- 🐦 **Twitter API v2** – For automated review tweet generation and posting.  
- 🗄️ **PostgreSQL** – Persistent storage for user watchlists.  

---

## 🤖 Agents Built

- 🧠 **BingeBird Agent** – The main orchestrator handling all entertainment-related tasks.  
- 💬 **Telegram Agent** – Manages Telegram communication and user experience.  
- 🎬 **Entertainment Agent** – Fetches and processes entertainment data, and manages user’s watchlist.  
- 🐦 **Twitter Review Agent** – Generates and posts review tweets on Twitter.  

---

## 🔗 Entertainment MCP – Model Context Protocol Server

The **Entertainment MCP** server (also developed by me) standardizes and abstracts multiple entertainment API interactions.
It provides the following core functionalities:

- 🎥 **OMDB Integration** – Retrieves movie, series, and episode info including IMDb ratings.  
- 🎞️ **TMDB Integration**  
- 🔍 Get detailed movie/TV show info.  
- 🎬 Search and explore collections.  
- 👥 Discover titles by actor.  
- 🏷️ Filter by genre.  
- 🌟 Retrieve popular and trending titles.  
- 📅 Discover by release year or IMDb rating.  
- 🎯 Get smart entertainment suggestions.  

---

## 🧭 Architectural Flowchart

![mermaid-flow-1x.png](https://cdn.dorahacks.io/static/files/19a095830e6ee0aa71bdf034ace9baa6.png)

---

## 🔒 Note

BingeBird is a **personal Telegram bot**, as it requires **Twitter API access tokens and secret keys** from your own Twitter developer account in order to post tweets automatically.
This ensures complete privacy and control over your personal Twitter activity.

---

<div align="center">

✨ *Built with ADK-TS for the IQAI Hackathon — by Rohit KK* ✨

</div>