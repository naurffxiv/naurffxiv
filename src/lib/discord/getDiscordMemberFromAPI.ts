import type { DiscordMember, DiscordRole } from "@/types/discord";
import { logError, logWarn } from "@/lib/logger/logger";

const DISCORD_API = "https://discord.com/api";
const GUILD_ID = process.env["GUILD_ID"];
const BOT_TOKEN = process.env["BOT_TOKEN"];

export async function getDiscordMemberFromAPI(
  userId: string,
): Promise<(DiscordMember & { enrichedRoles: DiscordRole[] }) | null> {
  if (!GUILD_ID || !BOT_TOKEN) {
    logError(
      "Discord:MissingCredentials",
      new Error("Missing GUILD_ID or BOT_TOKEN"),
      {
        missingGuildId: !GUILD_ID,
        missingBotToken: !BOT_TOKEN,
        note: "Cannot fetch Discord member without credentials",
      },
    );
    return null;
  }

  try {
    const [memberRes, rolesRes] = await Promise.all([
      fetch(`${DISCORD_API}/guilds/${GUILD_ID}/members/${userId}`, {
        headers: { Authorization: `Bot ${BOT_TOKEN}` },
      }),
      fetch(`${DISCORD_API}/guilds/${GUILD_ID}/roles`, {
        headers: { Authorization: `Bot ${BOT_TOKEN}` },
      }),
    ]);

    if (!memberRes.ok || !rolesRes.ok) {
      logWarn("Discord:APIRequestFailed", {
        userId,
        memberStatus: memberRes.status,
        rolesStatus: rolesRes.status,
        note: "Discord might be borked again.",
      });
      return null;
    }

    const member: DiscordMember = await memberRes.json();
    const guildRoles: DiscordRole[] = await rolesRes.json();

    const enrichedRoles = enrichRoleObjects(member.roles, guildRoles);

    return { ...member, enrichedRoles };
  } catch (err) {
    logError("Discord:APIRequestError", err, { userId });
    // TODO(#345): Implement Robust Auto-Retry Logic for Discord API Calls (5xx & 429)
    return null;
  }
}

function enrichRoleObjects(
  roleIds: string[] = [],
  allRoles: DiscordRole[] = [],
): DiscordRole[] {
  return roleIds
    .map((id) => allRoles.find((role) => role.id === id) || null)
    .filter((role): role is DiscordRole => role !== null);
}
