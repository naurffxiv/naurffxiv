import { NextRequest, NextResponse } from "next/server";

import { handleProtectedRoutesAuth } from "@auth/middleware/auth";
import { logDiscordCallbackMetadata } from "@auth/middleware/authLogger";
import { logError } from "@/lib/logger/logger";

// Middleware to handle authentication, role-based access, and Discord callback tracking.
// https://next-auth.js.org/configuration/nextjs#middleware
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  try {
    logDiscordCallbackMetadata(request);

    // Handle protected routes
    const authResponse = await handleProtectedRoutesAuth(request);
    if (authResponse) {
      return authResponse;
    }

    // No auth needed: proceed normally
    return NextResponse.next();
  } catch (err) {
    logError("Middleware:UnhandledError", err, {
      path: pathname,
      method: request.method,
    });

    // Redirect to login if an error interrupts processing
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/auth/login";
    redirectUrl.searchParams.set("error", "UnexpectedMiddlewareError");

    const redirectResponse = NextResponse.redirect(redirectUrl);
    redirectResponse.headers.set("X-Middleware-Error", "true");
    return redirectResponse;
  }
}

// protected routes
// Do not manually edit
export const config = {
  matcher: [
    "/admin/:path*",
    "/dev/:path*",
    "/mod-portal/:path*",
    "/dashboard/:path*",
    "/event/:path*",
  ],
};
