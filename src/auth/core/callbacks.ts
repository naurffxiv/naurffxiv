import { ALLOWED_SIGNIN_ROLES, DEBUG_FLAGS } from "@auth/core/config";
import { Account, Session, User } from "next-auth";
import { DiscordUserProfile, toUserWithRoles } from "@/types/discord";
import { logDebug, logError, logWarn } from "@/lib/logger/logger";

import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { getDiscordMember } from "@/lib/discord/getDiscordMember";
import { hasAnyRole } from "@/auth/core/roleUtils";
import { isUserBanned } from "@/lib/discord/getDiscordBanStatus";

// signIn callback — runs during Discord login
export async function signIn({
  profile,
}: {
  user: User | AdapterUser;
  account: Account | null;
  profile?: DiscordUserProfile;
}): Promise<boolean | string> {
  if (!profile || !("id" in profile)) return false;

  const userId = profile.id;
  const banned = await isUserBanned(userId);

  if (banned) {
    if (DEBUG_FLAGS.NEXT_AUTH) logWarn("Callback:UserBanned", { userId });
    return "/auth/error?error=Banned";
  }

  const { data: member, ttl } = await getDiscordMember(userId);
  const userHasRole = member
    ? hasAnyRole(toUserWithRoles(member), ALLOWED_SIGNIN_ROLES)
    : false;

  if (DEBUG_FLAGS.NEXT_AUTH) {
    logDebug("Callback:SignInAttempt", {
      userId,
      memberRoles: member?.roles,
      allowedRoles: ALLOWED_SIGNIN_ROLES,
      hasAccess: userHasRole,
      cacheTTL: ttl,
    });
  }

  if (!userHasRole) {
    if (DEBUG_FLAGS.NEXT_AUTH) logWarn("Callback:SignInDenied", { userId });
    // will redirect to /auth/error?error=AccessDenied
    return false;
  }

  return true;
}

// JWT callback — runs during login and any time the token is updated
export async function jwt({
  token,
  profile,
}: {
  token: JWT;
  user?: User | AdapterUser;
  account?: Account | null;
  profile?: DiscordUserProfile;
  isNewUser?: boolean;
  trigger?: "signIn" | "update" | "signUp";
}): Promise<JWT> {
  // Populate base token data from Discord Profile
  if (profile && "id" in profile) {
    token.id = profile.id;
    token.name = profile.username;
    token.avatar = profile.avatar;
    token.discriminator = profile.discriminator;

    try {
      const { data: member, ttl } = await getDiscordMember(profile.id);
      token.roles = member?.enrichedRoles ?? [];
      token.cacheExpires = ttl ?? null;
      token.hasAccess = hasAnyRole(
        toUserWithRoles(member),
        ALLOWED_SIGNIN_ROLES,
      );

      if (DEBUG_FLAGS.NEXT_AUTH) {
        logDebug("Callback:JWTSuccess", {
          id: token.id,
          hasAccess: token.hasAccess,
          roles: token.roles,
        });
      }
    } catch (error) {
      logError("Callback:JWTCallbackError", error, { userId: profile.id });
      token.roles = [];
      token.cacheExpires = null;
      token.hasAccess = false;
    }
  }

  return token;
}

// session callback — runs whenever `useSession()` is called.
export async function session({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> {
  // Populate session.user from JWT token
  session.user = {
    id: token.id as string,
    name: token.name,
    avatar: token.avatar,
    discriminator: token.discriminator,
    roles: token.roles,
    cacheExpires: token.cacheExpires,
    hasAccess: token.hasAccess,
  };

  if (DEBUG_FLAGS.NEXT_AUTH) {
    logDebug("Callback:Session", {
      user: session.user,
    });
  }
  return session;
}
