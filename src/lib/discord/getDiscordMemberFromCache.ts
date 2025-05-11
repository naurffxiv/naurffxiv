import type { CachedDiscordMember } from "@/types/discord";
import { DEBUG_FLAGS } from "@auth/core/config";
import { MEMBER_CACHE_TTL_SECONDS } from "@/lib/discord/cache/constants";
import NodeCache from "node-cache";
import { logDebug } from "@/lib/logger/logger";

const memberCache = new NodeCache({ stdTTL: MEMBER_CACHE_TTL_SECONDS });

// Gets a Discord member from cache if available.
export function getDiscordMemberFromCache(userId: string): {
  data: CachedDiscordMember | null;
  ttl: number | null;
} {
  const cacheKey = `discordMember:${userId}`;
  const cachedMember = memberCache.get<CachedDiscordMember>(cacheKey);

  if (cachedMember) {
    const timeToLive = memberCache.getTtl(cacheKey) ?? null;
    const ttlRemaining = timeToLive ? timeToLive - Date.now() : null;

    if (DEBUG_FLAGS.DISCORD) {
      logDebug("DiscordCache:Hit", {
        userId,
        expiresAt: formatTimestamp(timeToLive),
        secondsLeft: ttlRemaining ? Math.floor(ttlRemaining / 1000) : null,
      });
    }

    return { data: cachedMember, ttl: timeToLive };
  }

  if (DEBUG_FLAGS.DISCORD) {
    logDebug("DiscordCache:Miss", { userId });
  }

  return { data: null, ttl: null };
}

export function saveDiscordMemberToCache(
  userId: string,
  memberData: CachedDiscordMember,
): void {
  const cacheKey = `discordMember:${userId}`;
  memberCache.set(cacheKey, memberData);

  if (DEBUG_FLAGS.DISCORD) {
    logDebug("DiscordCache:Set", { userId });
  }
}

export function removeDiscordMemberFromCache(userId: string): void {
  const cacheKey = `discordMember:${userId}`;
  memberCache.del(cacheKey);

  if (DEBUG_FLAGS.DISCORD) {
    logDebug("DiscordCache:Cleared", { userId });
  }
}

function formatTimestamp(timestamp?: number | null): string {
  return timestamp ? new Date(timestamp).toLocaleString() : "unknown";
}
