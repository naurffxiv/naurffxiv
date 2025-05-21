import { logError, logInfo, logWarn } from "@/lib/logger/logger";

import { DEBUG_FLAGS } from "@auth/core/config";
import type { LogAccessDeniedParams } from "@auth/types/middleware";
import type { NextRequest } from "next/server";

export function logDiscordCallbackMetadata(request: NextRequest): void {
  try {
    const path = request.nextUrl.pathname;

    if (!path.startsWith("/api/auth/callback/discord")) return;

    if (!DEBUG_FLAGS.DISCORD) return;
    logInfo("Auth:DiscordCallback", {
      path,
      timestamp: getISOTimestamp(),
    });
  } catch (error) {
    logError("Auth:CallbackLoggingError", error);
  }
}

// Logs rejected access attempts to protected routes.
export function logAccessDenied({
  pathname,
  token,
  roleIds,
  allowedRoles,
}: Omit<LogAccessDeniedParams, "request">): void {
  try {
    logWarn("Auth:AccessDenied", {
      path: pathname,
      userId: token?.id ?? "unknown",
      userRoles: roleIds ?? [],
      requiredRoles: allowedRoles ?? [],
      reason: token ? "Missing required role" : "No session, who are you?",
      timestamp: getISOTimestamp(),
    });
  } catch (error) {
    logError("Auth:AccessLogFailure", error);
  }
}

function getISOTimestamp(): string {
  return new Date().toISOString();
}
