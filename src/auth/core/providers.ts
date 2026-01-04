import DiscordProvider from "next-auth/providers/discord";

// Discord OAuth provider configuration
// https://next-auth.js.org/providers/discord
const clientId = process.env["DISCORD_CLIENT_ID"];
const clientSecret = process.env["DISCORD_CLIENT_SECRET"];

if (!clientId || !clientSecret) {
  throw new Error("MISSING DISCORD SECRET IN .ENV");
}

export const providers = [
  DiscordProvider({
    clientId,
    clientSecret,
    authorization: {
      params: {
        scope: "identify guilds guilds.members.read",
      },
    },
  }),
];
