import type { DiscordUser } from "@/types/discord";

const DISCORD_CDN = "https://cdn.discordapp.com";

/**
 * Generates the correct Discord avatar URL for a user.
 * Automatically handles animated avatars (.gif) vs static (.png).
 * Falls back safely if missing fields (for demonstration or incomplete users).
 */
export function getDiscordAvatar(user?: Partial<DiscordUser>): string {
  if (!user?.id) {
    // No ID = return a generic default avatar
    return `${DISCORD_CDN}/embed/avatars/0.png`;
  }

  if (!user.avatar) {
    // No custom avatar = use default fallback based on discriminator
    const fallbackIndex = user.discriminator
      ? parseInt(user.discriminator, 10) % 5
      : 0;
    return `${DISCORD_CDN}/embed/avatars/${fallbackIndex}.png`;
  }

  const isAnimated = user.avatar.startsWith("a_");
  const fileExt = isAnimated ? "gif" : "png";

  return `${DISCORD_CDN}/avatars/${user.id}/${user.avatar}.${fileExt}?size=4096`;
}
