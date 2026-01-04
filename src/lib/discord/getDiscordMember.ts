import {
  getDiscordMemberFromCache,
  saveDiscordMemberToCache,
} from "@/lib/discord/getDiscordMemberFromCache";

import { MEMBER_CACHE_TTL_SECONDS } from "@/lib/discord/cache/constants";
import type { ResolvedDiscordMember } from "@/types/discord";
import { getDiscordMemberFromAPI } from "@/lib/discord/getDiscordMemberFromAPI";

const CACHE_TTL = MEMBER_CACHE_TTL_SECONDS * 1000;

export async function getDiscordMember(
  userId: string,
): Promise<ResolvedDiscordMember> {
  const { data: cachedMember, ttl } = getDiscordMemberFromCache(userId);

  if (cachedMember) {
    const safeExpirationTime = ttl ?? Date.now() + CACHE_TTL;
    return {
      data: cachedMember,
      ttl: safeExpirationTime,
    };
  }

  // Cache miss - fetch the member directly from Discord API
  const freshMember = await getDiscordMemberFromAPI(userId);

  if (freshMember) {
    saveDiscordMemberToCache(userId, freshMember);

    return {
      data: freshMember,
      ttl: Date.now() + CACHE_TTL,
    };
  }

  return { data: null, ttl: null };
}
