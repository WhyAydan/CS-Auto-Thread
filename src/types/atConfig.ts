export interface atConfig {
    threadChannels?: AutothreadChannelConfig[];
    emojisEnabled?: boolean;
    messages?: {
        ERR_UNKNOWN?: string,
        ERR_ONLY_IN_SERVER?: string,
        ERR_ONLY_IN_THREAD?: string,
        ERR_ONLY_THREAD_OWNER?: string,
        ERR_NO_EFFECT?: string,
        ERR_PARAMETER_MISSING?: string,
        ERR_INSUFFICIENT_PERMS?: string,
        ERR_CHANNEL_VISIBILITY?: string,
		ERR_CHANNEL_SLOWMODE?: string,
        ERR_AMBIGUOUS_THREAD_AUTHOR?: string,

        SUCCESS_THREAD_CREATE?: string,
        SUCCESS_THREAD_ARCHIVE_IMMEDIATE?: string,
        SUCCESS_THREAD_ARCHIVE_SLOW?: string,
    },
}

export interface AutothreadChannelConfig {
    channelId: string,
    archiveImmediately?: boolean,
    messageContent?: string,
    includeBots?: boolean,
	slowmode?: number,
}
