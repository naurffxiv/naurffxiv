"use client";

import type { AuthErrorResult } from "@auth/types/auth-error";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const ERROR_MESSAGES: Record<string, string> = {
  AccessDenied: "You don't have the required role to sign in.",
  SessionExpired: "Your session has expired. Please log in again.",
  Unauthenticated: "You must be logged in to access that page.",
  Callback: "Login was interrupted. Please try again.",
  Banned: "You are banned from the Discord server.",
  OAuthCallback:
    "There was an issue during Discord login." +
    "This could be due to too many login attempts or a temporary session issue. Please try again shortly.",
  undefined: "How did you get here?", // /api/auth/error
};

export function useAuthError(): AuthErrorResult {
  const searchParams = useSearchParams();
  const { status } = useSession();

  const rawError = searchParams.get("error") ?? "Unknown";
  const rawMessage = searchParams.get("message");

  const { errorCode, errorDescription } = useMemo(() => {
    const [code, ...desc] = rawError.split(":");
    return {
      errorCode: code.trim(),
      errorDescription: desc.join(":").trim() || null,
    };
  }, [rawError]);

  const decodedMessage = useMemo(() => {
    try {
      return rawMessage ? decodeURIComponent(rawMessage) : null;
    } catch {
      return rawMessage;
    }
  }, [rawMessage]);

  const fallbackMessage =
    ERROR_MESSAGES[errorCode] || "Something went wrong during authentication.";

  const displayMessage = errorDescription || decodedMessage || fallbackMessage;

  const heading = useMemo(() => {
    if (errorCode === "AccessDenied") return "Access Denied";
    if (errorCode === "Banned") return "Banned";
    // NB: "Oops" is intentionally displayed only when a user is logged in (authenticated)
    // but still reaches an error state. This distinguishes it from unauthenticated errors.
    if (status === "authenticated") return "Oops";
    return "Error";
  }, [errorCode, status]);

  return {
    errorCode,
    displayMessage,
    decodedMessage,
    heading,
    status,
  };
}
