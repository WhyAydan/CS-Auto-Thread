[![Build Status](https://drone.aydan.dev/api/badges/WhyAydan/CS-Auto-Thread/status.svg?ref=refs/heads/main)](https://drone.aydan.dev/WhyAydan/CS-Auto-Thread)

This step-by-step guide assumes you have [NodeJS](https://nodejs.org/en/) version `16.9.0` or higher installed and that you have a Discord Bot user set up at [Discord's developer page](https://discord.com/developers/applications) that has been invited to your server with the scopes `applications.commands` and `bot`.

1. Fork and clone the repository
2. Copy `.env.example` to `.env` and insert your bot's Discord API token and Application ID.
3. Run `npm install`
4. Run `npm run deploy`. This will make the slash commands show up in the servers the bot are in, but **it can take up to _ONE HOUR_ before they show up**.
5. Make sure the bot has the required permissions in Discord:
    - [x] View channels
    - [x] Send messages
    - [x] Send messages in threads
    - [x] Create public threads
    - [x] Read message history
6. Run `npm start`
7. Deploy! :tada:
