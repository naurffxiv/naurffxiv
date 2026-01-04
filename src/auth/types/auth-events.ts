import type { DiscordRole } from "@/types/discord";
/**
 * Payload passed to the signIn event callback.
 * https://next-auth.js.org/configuration/events#signin
 */
export interface SignInEvent {
  user: {
    id: string;
    name?: string | null;
    avatar?: string;
    discriminator?: string;
  };
  isNewUser?: boolean; // used for DB purposes
}

/**
 * Payload passed to the signOut event callback.
 * https://next-auth.js.org/configuration/events#signout
 */
export interface SignOutEvent {
  token: {
    id: string;
    name?: string | null;
    avatar?: string;
    discriminator?: string;
    roles?: DiscordRole[];
    cacheExpires?: number | null;
    [key: string]: unknown;
  };
}
