import { type CommandInteraction, type MessageComponentInteraction } from "discord.js";
import { promises } from "fs";
import { resolve as pathResolve } from "path";
import { getMessage, interactionReply } from "../helpers/messageHelpers";
import type { atCommand } from "../types/atCommand";

const COMMANDS_PATH = pathResolve(__dirname, "../commands");

let loadedCommands: atCommand[] = [];

export function handleCommandInteraction(interaction: CommandInteraction): Promise<void> {
	const command = getCommand(interaction.commandName);
	if (!command) return Promise.reject();

	try {
		return command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		return interactionReply(interaction, getMessage("ERR_UNKNOWN", interaction.id));
	}
}

export async function handleButtonClickedInteraction(interaction: MessageComponentInteraction): Promise<void> {
	const command = getCommand(interaction.customId);
	if (!command) return Promise.reject();

	try {
		return command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		return interactionReply(interaction, getMessage("ERR_UNKNOWN", interaction.id));
	}
}

export async function getOrLoadAllCommands(allowCache = true): Promise<atCommand[]> {
	if (loadedCommands.length > 0 && allowCache) {
		return loadedCommands;
	}

	console.log("Started reloading commands from disk.");

	let commandFiles = await promises.readdir(COMMANDS_PATH);
	commandFiles = commandFiles.filter(file => file.endsWith(".js"));
	const output = [];
	for (const file of commandFiles) {
		const { command } = await import(`${COMMANDS_PATH}/${file}`);
		output.push(command);
	}

	console.log("Successfully reloaded commands from disk.");
	loadedCommands = output;
	return output;
}

export function getAllLoadedCommands(): atCommand[] {
	if (loadedCommands.length === 0) {
		console.error("No commands found. Did you forget to invoke \"getOrLoadAllCommands()\"?");
	}

	return loadedCommands;
}

export function getCommand(commandName: string): atCommand | undefined {
	if (loadedCommands.length === 0) {
		console.error("No commands found. Did you forget to invoke \"getOrLoadAllCommands()\"?");
	}

	return loadedCommands.find(command => command.name === commandName);
}
