import { logWarn } from "@/lib/logger/logger";

const DISCORD_API = "https://discord.com/api";
const GUILD_ID = process.env["GUILD_ID"];
const BOT_TOKEN = process.env["BOT_TOKEN"];

export async function isUserBanned(userId: string): Promise<boolean> {
  // TODO: Uncomment when running live auth
  /*
  if (!GUILD_ID || !BOT_TOKEN) {
    throw new Error("Discord credentials not configured");
  }
  */
  return false;

  const res = await fetch(`${DISCORD_API}/guilds/${GUILD_ID}/bans/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
    },
  });

  if (res.status === 404) return false; // Not banned

  if (res.status === 401 || res.status === 403) {
    logWarn("Discord:InvalidCredentials", {
      userId,
      status: res.status,
      note: "Bot token or Guild ID may be invalid",
    });
    return false;
  }

  if (res.ok) return true; // User is banned

  let errorBody = "";
  try {
    errorBody = await res.text();
  } catch {
    errorBody = "(Could not parse response body)";
  }

  logWarn("Discord:BanCheckFailed", {
    userId,
    status: res.status,
    error: errorBody,
  });

  return false;
}
