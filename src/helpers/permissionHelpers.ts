import { type GuildMember, type NewsChannel, Permissions, type TextChannel, type ThreadAutoArchiveDuration } from "discord.js";

export function getRequiredPermissions(slowmode?: number): bigint[] {
	const output = [
		Permissions.FLAGS.VIEW_CHANNEL,
		Permissions.FLAGS.SEND_MESSAGES,
		Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
		Permissions.FLAGS.CREATE_PUBLIC_THREADS,
		Permissions.FLAGS.READ_MESSAGE_HISTORY,
	];

	if (slowmode && slowmode > 0) {
		output.push(Permissions.FLAGS.MANAGE_THREADS);
	}

	return output;
}

export function memberIsModerator(member: GuildMember): boolean {
	return member.permissions.has(Permissions.FLAGS.KICK_MEMBERS);
}

export function memberIsAdmin(member: GuildMember): boolean {
	return member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
}

// Should not be required, but Discord for some reason allows the default duration to be higher than the allowed value
export function getSafeDefaultAutoArchiveDuration(channel: TextChannel | NewsChannel): ThreadAutoArchiveDuration {
	const archiveDuration = channel.defaultAutoArchiveDuration;
	if (!archiveDuration || archiveDuration === "MAX") return "MAX";

	const highest = getHighestAllowedArchiveDuration(channel);
	return archiveDuration > highest
		? highest
		: archiveDuration;
}

function getHighestAllowedArchiveDuration(channel: TextChannel | NewsChannel) {
	if (channel.guild.features.includes("SEVEN_DAY_THREAD_ARCHIVE")) return 10080;
	if (channel.guild.features.includes("THREE_DAY_THREAD_ARCHIVE")) return 4320;

	return 1440; // 1d
}
