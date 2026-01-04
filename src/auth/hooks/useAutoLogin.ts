"use client";

import { logDebug, logError } from "@/lib/logger/logger";
import { useEffect, useState } from "react";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

// /auth/login?auto=true
export function useAutoLogin(
  status: string,
  autoLogin: boolean,
  callbackUrl: string,
): boolean {
  const [autoTriggered, setAutoTriggered] = useState(false);
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");

  useEffect(() => {
    if (status !== "unauthenticated" || !autoLogin) return;
    if (errorCode === "SessionExpired") return;

    setAutoTriggered(true);
    logDebug("LoginPage:AutoLoginTriggered");

    signIn("discord", { callbackUrl }).catch((err) => {
      logError("LoginPage:AutoLoginFailed", err);
      setAutoTriggered(false);
    });
  }, [status, autoLogin, callbackUrl, errorCode]);

  return autoTriggered;
}
