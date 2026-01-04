"use client";

import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

import Link from "next/link";
import type { ReactElement } from "react";
import { useAuthError } from "@auth/hooks/useAuthError";
import { useAuthErrorLogger } from "@auth/hooks/useAuthErrorLogger";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/ui/useToast";

export default function ErrorContent(): ReactElement {
  const { errorCode, displayMessage, heading, status } = useAuthError();
  const { open, message, severity, durationMs, showToast, closeToast } =
    useToast();
  const router = useRouter();
  const [bannedCountdown, setBannedCountdown] = useState(15);

  useAuthErrorLogger();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    switch (errorCode) {
      case "Banned":
        showToast({
          message: "You are banned from the Discord server and cannot log in.",
          severity: "error",
        });

        interval = setInterval(() => {
          setBannedCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval!);
              router.replace("/appeal");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        break;

      case "AccessDenied":
        showToast({
          message: "You do not have permission to access this page.",
          severity: "warning",
        });
        break;

      case "SessionExpired":
        showToast({
          message: "Your session has expired. Please log in again.",
          severity: "info",
        });
        break;

      default:
        if (status === "unauthenticated") {
          showToast({
            message: "You’re not logged in or your session has expired.",
            severity: "info",
          });
        } else if (status === "authenticated") {
          showToast({
            message: "You’re logged in but hit a protected page.",
            severity: "warning",
          });
        }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [errorCode, status, showToast, router]);

  return (
    <div className="flex items-start justify-center min-h-screen px-4 pt-24">
      <div className="w-full max-w-md bg-[#0e1a1f]/80 backdrop-blur-md rounded-xl shadow-2xl ring-1 ring-blue-400/20 p-8 text-center">
        <h1 className="mb-6 text-4xl font-bold text-white">{heading}</h1>

        {errorCode === "Banned" ? (
          <>
            <p className="mb-4 text-lg font-semibold text-red-500">
              You are banned from the Discord server.
            </p>
            <p className="mb-2 text-sm text-gray-400">
              Redirecting to the appeal page in{" "}
              <strong>{bannedCountdown}</strong> seconds...
            </p>
            {bannedCountdown <= 25 && (
              <p className="mt-2 text-sm text-blue-500 underline">
                <Link href="/appeal">
                  Click here to go to the appeal page immediately
                </Link>
              </p>
            )}
          </>
        ) : errorCode === "AccessDenied" ? (
          <>
            <p className="mb-4 text-lg font-semibold text-red-500">
              Access Denied
            </p>
            <p className="mb-2 text-sm text-gray-400">
              You don&apos;t have permission to view this page.
            </p>
          </>
        ) : (
          <>
            <p className="mb-4 text-lg font-semibold text-red-400">
              If you believe you should have access, please contact a server
              administrator.
            </p>
            {displayMessage && (
              <p className="mb-2 text-sm text-gray-400">
                <strong>Details:</strong> {displayMessage}
              </p>
            )}
          </>
        )}

        <div className="space-y-2 mt-4">
          {status === "authenticated" && errorCode !== "Banned" ? (
            <Link
              href="/dashboard"
              className="block text-sm text-blue-500 underline"
            >
              Return to Dashboard
            </Link>
          ) : errorCode !== "Banned" ? (
            <Link
              href="/auth/login"
              className="block text-sm text-blue-500 underline"
            >
              Return to Login
            </Link>
          ) : null}
        </div>
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
    </div>
  );
}
