import { config } from "dotenv";
config();

import { Client, Intents } from "discord.js";
import { getOrLoadAllCommands } from "./handlers/commandHandler";
import { handleInteractionCreate } from "./handlers/interactionHandler";
import { handleMessageCreate } from "./handlers/messageHandler";
import { deleteConfigsFromUnknownServers, getApiToken, resetConfigToDefault } from "./helpers/configHelpers";

console.log(`Welcome to Auto Thread`);

(async () => {
	// Initial load of all commands
	await getOrLoadAllCommands(false);

	const CLIENT = new Client({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
		],
		presence: {
			activities: [{
				type: "LISTENING",
				name: "/help",
			}],
		},
	});

	CLIENT.once("ready", () => {
		console.log("Ready!");
		deleteConfigsFromUnknownServers(CLIENT);
	});

	CLIENT.on("interactionCreate", async interaction => await handleInteractionCreate(interaction).catch(console.error));
	CLIENT.on("messageCreate", async message => await handleMessageCreate(message).catch(console.error));
	CLIENT.on("guildDelete", guild => { resetConfigToDefault(guild.id); });

	CLIENT.login(getApiToken());

	process.on("SIGINT", () => {
		CLIENT.destroy();
		console.log("Destroyed client");
		process.exit(0);
	});
})();

