/* eslint-disable @typescript-eslint/no-unused-vars */
// makes eslint happy :) - DO NOT REMOVE -
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      avatar?: string;
      discriminator?: string;
      roles?: DiscordRole[];
      cacheExpires?: number | null;
      hasAccess: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string;
    avatar?: string;
    discriminator?: string;
    roles?: DiscordRole[];
    cacheExpires?: number | null;
    hasAccess: boolean;
  }
}
