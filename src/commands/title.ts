import { SlashCommandBuilder } from "@discordjs/builders";
import { type CommandInteraction, GuildMember, Permissions } from "discord.js";
import { interactionReply, getMessage, getThreadAuthor } from "../helpers/messageHelpers";
import { setThreadName } from "../helpers/threadHelpers";
import type { atCommand } from "../types/atCommand";

export const command: atCommand = {
	name: "title",
	shortHelpDescription: "Sets the title of a thread to `value`",
	longHelpDescription: "The title command changes the title of a thread.",

	async getSlashCommandBuilder() {
		return new SlashCommandBuilder()
			.setName("title")
			.setDescription("Sets the title of a thread")
			.addStringOption(option => {
				return option
					.setName("value")
					.setDescription("The new title of the thread")
					.setRequired(true);
			})
			.toJSON();
	},

	async execute(interaction: CommandInteraction): Promise<void> {
		const member = interaction.member;
		if (!(member instanceof GuildMember)) {
			return interactionReply(interaction, getMessage("ERR_UNKNOWN", interaction.id));
		}

		const channel = interaction.channel;
		if (!channel?.isThread()) {
			return interactionReply(interaction, getMessage("ERR_ONLY_IN_THREAD", interaction.id));
		}

		const newThreadName = interaction.options.getString("value");
		if (!newThreadName) {
			return interactionReply(interaction, getMessage("ERR_PARAMETER_MISSING", interaction.id));
		}

		const oldThreadName = channel.name;
		if (oldThreadName === newThreadName) {
			return interactionReply(interaction, getMessage("ERR_NO_EFFECT", interaction.id));
		}

		const hasChangeTitlePermissions = member
			.permissionsIn(channel)
			.has(Permissions.FLAGS.MANAGE_THREADS, true);

		if (hasChangeTitlePermissions) {
			await setThreadName(channel, newThreadName);
			await interactionReply(interaction, "Success!");
			return;
		}

		const threadAuthor = await getThreadAuthor(channel);
		if (!threadAuthor) {
			return interactionReply(interaction, getMessage("ERR_AMBIGUOUS_THREAD_AUTHOR", interaction.id));
		}

		if (threadAuthor !== interaction.user) {
			return interactionReply(interaction, getMessage("ERR_ONLY_THREAD_OWNER", interaction.id));
		}

		await setThreadName(channel, newThreadName);
		await interactionReply(interaction, "Success!");
	},
};
