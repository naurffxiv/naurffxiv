"use client";

import { useEffect, useState } from "react";

import type { ReactElement } from "react";
import Snackbar from "@mui/material/Snackbar";
import { logDebug } from "@/lib/logger/logger";
import { useSession } from "next-auth/react";

export default function SessionCountdownDebug(): ReactElement | null {
  const { data: session, status } = useSession();

  const [sessionTTL, setSessionTTL] = useState<number | null>(null);
  const [cacheTTL, setCacheTTL] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (status !== "authenticated" || !session?.expires) return;

    const sessionExpiry = new Date(session.expires).getTime();
    const cacheExpiry = session.user?.cacheExpires
      ? new Date(session.user.cacheExpires).getTime()
      : null;

    const updateCountdowns = (): void => {
      const now = Date.now();
      const sessionRemaining = Math.max(
        0,
        Math.floor((sessionExpiry - now) / 1000),
      );
      const cacheRemaining = cacheExpiry
        ? Math.max(0, Math.floor((cacheExpiry - now) / 1000))
        : null;

      setSessionTTL(sessionRemaining);
      setCacheTTL(cacheRemaining);

      if (sessionRemaining <= 0) {
        setExpired(true);
        clearInterval(intervalId);

        logDebug("Session:Expired", {
          userId: session?.user?.id,
          sessionTTL: sessionRemaining,
          cacheTTL: cacheRemaining,
        });

        setTimeout(() => {
          window.location.href = "/auth/login?error=SessionExpired";
        }, 3000);
      }
    };
    updateCountdowns();

    const intervalId = setInterval(updateCountdowns, 1000);

    return () => clearInterval(intervalId);
  }, [session, status]);

  if (status !== "authenticated") return null;

  return (
    <>
      <div className="space-y-1 text-sm text-muted" aria-live="polite">
        {sessionTTL !== null && (
          <div>
            <strong>Session TTL:</strong> {Math.floor(sessionTTL / 60)}m{" "}
            {sessionTTL % 60}s
          </div>
        )}
        {cacheTTL !== null && (
          <div>
            <strong>Discord Cache TTL:</strong> {Math.floor(cacheTTL / 60)} min
          </div>
        )}
      </div>

      <Snackbar
        open={expired}
        autoHideDuration={5000}
        onClose={() => setExpired(false)}
        message="You've been logged out due to inactivity."
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
