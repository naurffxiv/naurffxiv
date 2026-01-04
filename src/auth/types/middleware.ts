import { NextRequest } from "next/server";

// Defines the expected structure of the session token (NextAuth JWT)
export interface SessionToken {
  id: string;
  name?: string;
  avatar?: string;
  discriminator?: string;
  roles: Array<string | { id: string }>;
  cacheExpires?: number | null;
}

// Parameters for logging access denied events
export interface LogAccessDeniedParams {
  pathname: string;
  token?: { id?: string };
  roleIds?: string[];
  allowedRoles?: string[];
  request: NextRequest;
}
