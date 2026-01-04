import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@auth/core";
import { logError } from "@/lib/logger/logger";

const nextAuthHandler = NextAuth(authOptions);

interface Context {
  params: {
    nextauth: string[];
  };
}

async function handler(
  request: NextRequest,
  context: Context,
): Promise<Response> {
  try {
    return await nextAuthHandler(request, context);
  } catch (error) {
    logError("NextAuth:HandlerError", error, {
      method: request.method,
      url: request.url,
      params: context.params,
    });

    const message =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? `[NextAuth:AuthError] ${error.message}`
        : "Authentication failed";

    return new Response(message, {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
        "X-Error": "NextAuthFailure",
      },
    });
  }
}
export const GET = handler;
export const POST = handler;
