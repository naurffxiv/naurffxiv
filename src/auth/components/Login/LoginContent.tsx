"use client";

import { Alert, Snackbar } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

import LoadingSpinner from "@auth/components/Elements/LoadingSpinner";
import { LoginButton } from "@auth/components/Login/LoginButton";
import { LoginErrorMessage } from "@auth/components/Login/LoginErrorMessage";
import type { ReactElement } from "react";
import { useAuthError } from "@auth/hooks/useAuthError";
import { useAutoLogin } from "@auth/hooks/useAutoLogin";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSessionRedirect } from "@auth/hooks/useSessionRedirect";
import { useToast } from "@/hooks/ui/useToast";

export default function LoginContent(): ReactElement {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const autoLogin = searchParams.get("auto") === "true";
  const loggedOut = searchParams.get("loggedOut") === "true";
  const fromPage = searchParams.get("from");
  const callbackUrl =
    fromPage || searchParams.get("callbackUrl") || "/dashboard";

  const { errorCode, displayMessage } = useAuthError();
  const redirecting = useSessionRedirect(session, status, callbackUrl);
  const autoTriggered = useAutoLogin(status, autoLogin, callbackUrl);

  const { open, message, severity, durationMs, showToast, closeToast } =
    useToast();

  // Handle toast messages
  useEffect(() => {
    if (errorCode === "SessionExpired") {
      showToast({
        message: "You’ve been logged out due to inactivity.",
        severity: "info",
      });
    } else if (loggedOut) {
      showToast({
        message: "You have been logged out successfully.",
        severity: "success",
      });
    }
  }, [errorCode, loggedOut, showToast]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.hasAccess === false) {
      router.replace("/auth/error?error=AccessDenied");
    }
  }, [status, session, router]);

  if (status === "loading" || redirecting || autoTriggered) {
    return <LoadingSpinner message="Great Community BTW" />;
  }

  return (
    <main className="flex items-start justify-center px-4 pt-24">
      <div className="w-full max-w-md bg-[#0e1a1f]/80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-800 p-8 text-center">
        <h1 className="mb-6 text-4xl font-bold">Login</h1>

        {errorCode !== "Unknown" && (
          <LoginErrorMessage message={displayMessage} fromPage={fromPage} />
        )}

        <LoginButton callbackUrl={callbackUrl} />
      </div>

      <Snackbar
        open={open}
        autoHideDuration={durationMs}
        onClose={closeToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </main>
  );
}
