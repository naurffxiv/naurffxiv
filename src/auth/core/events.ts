import { SignInEvent, SignOutEvent } from "@auth/types/auth-events";

import { DEBUG_FLAGS } from "@auth/core/config";
import { logDebug } from "@/lib/logger/logger";
import { removeDiscordMemberFromCache } from "@/lib/discord/getDiscordMemberFromCache";

// Called when a user successfully signs in via NextAuth
// https://next-auth.js.org/configuration/events#signin
export async function signIn({ user, isNewUser }: SignInEvent): Promise<void> {
  if (!DEBUG_FLAGS.NEXT_AUTH) return;

  const userId = user.id;
  const username = user.name;

  logDebug("NextAuth:SignIn", {
    username,
    userId,
    isNewUser: Boolean(isNewUser),
  });
}

// Called when a user signs out via NextAuth and clears their cached Session
// https://next-auth.js.org/configuration/events#signout
export async function signOut({ token }: SignOutEvent): Promise<void> {
  if (!token.id) return;

  const userId = token.id;
  const username = token.name;

  if (DEBUG_FLAGS.NEXT_AUTH) {
    logDebug("NextAuth:SignOut", {
      username,
      userId,
      cacheCleared: true,
    });
  }

  removeDiscordMemberFromCache(userId);
}
