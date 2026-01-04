"use client";

import { logDebug, logError } from "@/lib/logger/logger";
import { useCallback, useEffect, useMemo } from "react";

import { useAuthError } from "./useAuthError";

export function useAuthErrorLogger(): void {
  const { errorCode, displayMessage, status } = useAuthError();

  const payload = useMemo(
    () => ({
      message: "Authenticated user landed on error page",
      extraInfo: { error: errorCode, displayMessage },
      timestamp: new Date().toISOString(),
    }),
    [errorCode, displayMessage],
  );

  const sendLog = useCallback(async (): Promise<void> => {
    try {
      const res = await fetch("/api/frontend-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        logError(
          "ErrorLogger:POSTFailed",
          new Error(`Status: ${res.status}`),
          payload,
        );
      }
    } catch (err) {
      logError("ErrorLogger:POSTCatch", err, payload);
    }
  }, [payload]);

  useEffect(() => {
    if (status !== "authenticated") return;

    sendLog();
    logDebug("ErrorLogger:UserOnError", payload);
  }, [status, payload, sendLog]);
}
