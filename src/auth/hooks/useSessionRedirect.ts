"use client";

import { logDebug, logError } from "@/lib/logger/logger";
import { useEffect, useState } from "react";

import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export function useSessionRedirect(
  session: Session | null,
  status: string,
  callbackUrl: string,
): boolean {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Wait for session to finish loading before deciding on redirect

    if (status === "unauthenticated") {
      return;
    }

    const hasAnyRoles = (session?.user?.roles?.length ?? 0) > 0;

    if (hasAnyRoles) {
      logDebug("LoginPage:AutoRedirect", {
        userId: session?.user?.id,
        to: callbackUrl,
      });
      setRedirecting(true);

      try {
        router.push(callbackUrl);
      } catch (err) {
        logError("LoginPage:RedirectFailure", err, { callbackUrl });
        setRedirecting(false);
      }
    }
  }, [session, status, router, callbackUrl]);

  return redirecting;
}
