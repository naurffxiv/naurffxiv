import { Roles } from "@auth/core/roleConstants";
import type { SessionOptions, SessionStrategy } from "next-auth";

export const DEBUG_FLAGS = {
  NEXT_AUTH: process.env["DEBUG_NEXT_AUTH_ROUTE"] === "true",
  DISCORD: process.env["DEBUG_DISCORD"] === "true",
  WEBHOOK: process.env["DEBUG_WEBHOOK"] === "true",
};

// Roles allowed to sign in (from Discord)
export const ALLOWED_SIGNIN_ROLES = [
  Roles.ADMIN,
  Roles.MOD,
  Roles.DEV,
  Roles.EVENT,
];

// Session settings for NextAuth
// https://next-auth.js.org/configuration/options#session
export const sessionConfig: SessionOptions = {
  strategy: "jwt" satisfies SessionStrategy,
  maxAge: 60 * 10, // 10 min
  updateAge: 60 * 2, // 2 min
  generateSessionToken: () => crypto.randomUUID(),
};

// Custom auth page routes
// https://next-auth.js.org/configuration/pages
export const authPages = {
  signIn: "/auth/login",
  error: "/auth/error",
};

// JWT encryption secret
// https://next-auth.js.org/configuration/options#nextauth_secret
// can add logic here for generating our own secret later on
// TODO: Uncomment when running live auth
// export const authSecret = process.env.NEXTAUTH_SECRET;
export const authSecret =
  process.env.NEXTAUTH_SECRET || "development-secret-only";
