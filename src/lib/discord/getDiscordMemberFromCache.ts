import type { CachedDiscordMember } from "@/types/discord";
import { MEMBER_CACHE_TTL_SECONDS } from "@/lib/discord/cache/constants";
import NodeCache from "node-cache";

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
    return { data: cachedMember, ttl: timeToLive };
  }

  return { data: null, ttl: null };
}

export function saveDiscordMemberToCache(
  userId: string,
  memberData: CachedDiscordMember,
): void {
  const cacheKey = `discordMember:${userId}`;
  memberCache.set(cacheKey, memberData);
}

export function removeDiscordMemberFromCache(userId: string): void {
  const cacheKey = `discordMember:${userId}`;
  memberCache.del(cacheKey);
}
