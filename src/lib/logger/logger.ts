import { DEBUG_FLAGS } from "@auth/core/config";

type LogLevel = "info" | "warn" | "error" | "debug";

interface ErrorPayload {
  message: string;
  stack: string | null;
  [key: string]: unknown;
}

export function logInfo(tag: string, data: Record<string, unknown> = {}): void {
  if (DEBUG_FLAGS.WEBHOOK) {
    sendLogToWebhook(tag, "info", data);
  }
  log(tag, "info", data);
}

export function logWarn(tag: string, data: Record<string, unknown> = {}): void {
  if (DEBUG_FLAGS.WEBHOOK) {
    sendLogToWebhook(tag, "warn", data);
  }
  log(tag, "warn", data);
}

export function logError(
  tag: string,
  error: unknown,
  extra: Record<string, unknown> = {},
): void {
  const payload = {
    ...parseError(error),
    ...extra,
  } as ErrorPayload;

  if (DEBUG_FLAGS.WEBHOOK) {
    sendLogToWebhook(tag, "error", payload);
  }
  log(tag, "error", payload);
}

export function logDebug(
  tag: string,
  data: Record<string, unknown> = {},
): void {
  if (DEBUG_FLAGS.WEBHOOK) {
    sendLogToWebhook(tag, "debug", data);
  }
  log(tag, "debug", data);
}

// not fully functional (?)
// export function logRateLimit(
//   provider: string,
//   retryAfter?: string | null,
// ): void {
//   logWarn("OAuth:RateLimited", {
//     provider,
//     retryAfter: retryAfter ?? "unknown",
//     timestamp: new Date().toISOString(),
//   });
// }

function log(
  tag: string,
  level: LogLevel,
  data: Record<string, unknown>,
): void {
  const now = new Date().toISOString();
  const logFn = console[level] ?? console.log;
  logFn(`[${tag}]`, { ...data, timestamp: now });
}

function parseError(error: unknown): ErrorPayload {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack ?? null,
    };
  }
  return { message: String(error), stack: null };
}

async function sendLogToWebhook(
  tag: string,
  level: LogLevel,
  payload: Record<string, unknown>,
): Promise<void> {
  const webhookUrls = {
    info: process.env["DISCORD_INFO_WEBHOOK"],
    warn: process.env["DISCORD_WARN_WEBHOOK"],
    error: process.env["DISCORD_ERROR_WEBHOOK"],
    debug: process.env["DISCORD_DEBUG_WEBHOOK"],
  };

  const webhookUrl = webhookUrls[level];
  if (!webhookUrl) {
    console.warn(`No webhook for ${level}`);
    return;
  }

  const prettyColors = {
    info: 1291761,
    warn: 16776960,
    error: 15548997,
    debug: 10181046,
  };

  const embed = {
    title: `[${tag}] [${level.toUpperCase()}]`,
    description: "```json\n" + JSON.stringify(payload, null, 2) + "\n```",
    color: prettyColors[level],
    timestamp: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!res.ok) {
      console.warn(`webhook sad (${res.status}):`, await res.text());
    }
  } catch (err) {
    console.warn(`webhook very sad:`, err);
  }
}
