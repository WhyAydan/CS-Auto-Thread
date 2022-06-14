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


I require the following permissions to function, along with the `applications.commands` and `bot` scopes.

-   [x] View channels
-   [x] Send messages
-   [x] Send messages in threads
-   [x] Create public threads
-   [x] Read message history

You can use this link to invite your self-hosted version of Needle, replacing `<APP ID>` with your bot's application ID:

```
https://discord.com/oauth2/authorize?client_id=<APP ID>&permissions=309237713920&scope=bot%20applications.commands
```

### 🐳 Docker

[official Docker image](https://github.com/WhyAydan/CS-Auto-Thread/pkgs/container/cs-auto-thread). Releases are tagged with latest release tag. Branches are tagged by their name. To run the image, write the following command, replacing `token` with your bot's token:

```sh
docker run -d --name CS-Auto-Thread --env DISCORD_API_TOKEN=token ghcr.io/whyaydan/cs-auto-thread:latest
```
