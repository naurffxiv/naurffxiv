import type { Profile } from "next-auth";
/**
 * A Discord OAuth profile object (returned during login).
 * https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/discord.ts
 */
export interface DiscordProfile {
  id: string;
  username: string;
  avatar?: string;
  discriminator: string;
  locale?: string;
  mfa_enabled?: boolean;
}

/**
 * A Discord profile or generic OAuth profile (used in signIn/jwt callbacks).
 */
export type DiscordUserProfile = DiscordProfile | Profile;

/**
 * A minimal Discord user object (used for avatars or mentions).
 */
export interface DiscordUser {
  id: string;
  avatar?: string;
  discriminator?: string;
}

/**
 * A role returned from the Discord API.
 */
export interface DiscordRole {
  id: string;
  name: string;
  color: number;
}

/**
 * A session user passed to the client.
 * Derived from JWT and enriched with role info.
 */
export interface DiscordSessionUser {
  id: string;
  name?: string;
  discriminator?: string;
  avatar?: string;
  roles?: (string | DiscordRole)[];
  cacheExpires?: number | null;
}

/**
 * A Discord member object from the Discord API.
 */
export interface DiscordMember {
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  roles: string[];
  additionalFields?: Record<string, unknown>; // Can be typed as needed
}

/**
 * Cached Discord member enriched with full role objects.
 */
export type CachedDiscordMember = DiscordMember & {
  enrichedRoles: DiscordRole[];
};

/**
 * Result of resolving a Discord member from API/cache.
 */
export type ResolvedDiscordMember =
  | { data: CachedDiscordMember; ttl: number }
  | { data: null; ttl: null };

/**
 * Simplified user object used internally for permission checks.
 */
export type UserWithRoles = {
  id: string;
  roles: (string | DiscordRole)[];
};

//
// === Utility Functions ===
//

/**
 * Convert a raw or enriched DiscordMember into a normalized UserWithRoles object.
 */
export function toUserWithRoles(
  member: DiscordMember | CachedDiscordMember | null | undefined,
): UserWithRoles | null {
  if (!member) return null;

  const roleSet = new Set<string>();
  const enrichedRoles: DiscordRole[] = [];

  if (Array.isArray(member.roles)) {
    member.roles.forEach((r) => {
      if (typeof r === "string") roleSet.add(r);
    });
  }

  if ("enrichedRoles" in member && Array.isArray(member.enrichedRoles)) {
    member.enrichedRoles.forEach((r) => {
      roleSet.add(r.id);
      enrichedRoles.push(r);
    });
  }

  return {
    id: member.user.id,
    roles: [...roleSet, ...enrichedRoles],
  };
}

/**
 * Full Discord profile returned by Discord’s OAuth API.
 * https://discord.com/developers/docs/resources/user#get-current-user
 *     scope: 'guilds guilds.members.read email identify'
 */
// WIP, not finished yet, need full refactor if I'm going to be using this,
// idk if I even want to use this need to research more on this.
export interface FullDiscordProfile {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  public_flags: number;
  flags: number;
  banner: string | null;
  accent_color: number | null;
  global_name: string;
  avatar_decoration_data: {
    asset: string;
    sku_id: string;
    expires_at: string | null;
  } | null;
  collectibles: unknown | null;
  banner_color: string | null;
  clan: {
    identity_guild_id: string;
    identity_enabled: boolean;
    tag: string;
    badge: string;
  } | null;
  primary_guild: {
    identity_guild_id: string;
    identity_enabled: boolean;
    tag: string;
    badge: string;
  } | null;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
  verified: boolean;
  image_url: string;
}
