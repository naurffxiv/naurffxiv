import { logError, logInfo, logWarn } from "@/lib/logger/logger";

import { NextRequest } from "next/server";

interface FrontendLogPayload {
  message: string;
  extraInfo?: Record<string, unknown>;
}

export async function POST(req: NextRequest): Promise<Response> {
  let body: FrontendLogPayload | undefined;

  try {
    try {
      body = await req.json();
    } catch (err: unknown) {
      logWarn("AuthLog:MalformedJSON", {
        error: err,
        rawBody: await req.text(),
      });
      return new Response("Invalid JSON", { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return new Response("Invalid body format", { status: 400 });
    }

    const { message, extraInfo = {} } = body;

    if (typeof message !== "string" || message.length > 1000) {
      return new Response("Invalid or missing message", { status: 400 });
    }

    const clientInfo = {
      userAgent: req.headers.get("user-agent") ?? "Undefined",
      timestamp: new Date().toISOString(),
    };

    logInfo("AuthLog:FrontendErrorReport", {
      message,
      extraInfo,
      meta: clientInfo,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    logError("AuthLog:UnhandledServerError", err, { body });
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(): Promise<Response> {
  return new Response("Method Not Allowed", { status: 405 });
}
