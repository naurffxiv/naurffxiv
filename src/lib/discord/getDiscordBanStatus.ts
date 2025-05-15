import { logWarn } from "@/lib/logger/logger";

const DISCORD_API = "https://discord.com/api";
const GUILD_ID = process.env["GUILD_ID"];
const BOT_TOKEN = process.env["BOT_TOKEN"];

export async function isUserBanned(userId: string): Promise<boolean> {
  if (!GUILD_ID || !BOT_TOKEN) return false;

  const res = await fetch(`${DISCORD_API}/guilds/${GUILD_ID}/bans/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
    },
  });

  if (res.status === 404) return false; // Not banned
  if (res.ok) return true;

  logWarn("Discord:BanCheckError", {
    userId,
    status: res.status,
    error: await res.text(),
  });

  return false;
}
