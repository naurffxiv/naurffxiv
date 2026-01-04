import { NextRequest, NextResponse } from "next/server";
import { extractRoleIds, getRoleName } from "@/auth/core/roleUtils";

import { DEBUG_FLAGS } from "@auth/core/config";
import { SessionToken } from "@auth/types/middleware";
import { getAllowedRolesForPath } from "@auth/core/routeRoles";
import { getToken } from "next-auth/jwt";
import { logAccessDenied } from "@auth/middleware/authLogger";
import { logDebug } from "@/lib/logger/logger";
import { protectedRoutes } from "@auth/middleware/routes.config";

//
// Entry point for protected route access control
// https://next-auth.js.org/configuration/options#jwt-helper
//
export async function handleProtectedRoutesAuth(
  request: NextRequest,
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  if (!isProtectedRoute(pathname) || isAuthCallbackPath(pathname)) {
    return null;
  }

  const token = (await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  })) as SessionToken | null;

  if (!token) {
    const isTryingToLogin = pathname.startsWith("/auth/login");
    if (isTryingToLogin) {
      return null;
    }
    return redirectToError(request, pathname, "AccessDenied");
  }

  const userRoles = extractRoleIds(token.roles ?? []);
  const allowedRoles = getAllowedRolesForPath(pathname);

  if (allowedRoles.length === 0 || hasRequiredRole(userRoles, allowedRoles)) {
    const response = NextResponse.next();

    if (DEBUG_FLAGS.NEXT_AUTH) {
      const userRoleNames = userRoles.map((id) => getRoleName(id) || id);
      logDebug("AccessGranted", {
        pathname,
        name: token?.name,
        userId: token?.id,
        roles: userRoleNames,
      });
    }

    if (!pathname.startsWith("/auth/login")) {
      response.cookies.set("lastPath", pathname, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    return response;
  }

  logAccessDenied({
    pathname,
    token,
    roleIds: userRoles,
    allowedRoles,
  });

  return redirectToError(request, pathname, "AccessDenied");
}

function isProtectedRoute(pathname: string): boolean {
  if (pathname.startsWith("/auth")) return false;
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

function isAuthCallbackPath(pathname: string): boolean {
  return pathname.startsWith("/api/auth/callback");
}

function hasRequiredRole(userRoles: string[], allowedRoles: string[]): boolean {
  return userRoles.some((role) => allowedRoles.includes(role));
}

function redirectToError(
  request: NextRequest,
  pathname: string,
  error: string,
): NextResponse {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/auth/error";

  redirectUrl.searchParams.set("from", pathname);
  redirectUrl.searchParams.set("error", error);

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.delete("lastPath");

  return response;
}
