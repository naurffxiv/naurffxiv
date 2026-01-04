"use client";

import "./logout.css";

import { logError, logInfo } from "@/lib/logger/logger";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import LoadingSpinner from "@auth/components/Elements/LoadingSpinner";
import type { ReactElement } from "react";
import UserAvatar from "@auth/components/Elements/UserAvatar";
import { useRouter } from "next/navigation";

export default function LogoutContent(): ReactElement {
  const [signoutTriggered, setSignoutTriggered] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    logInfo("Logout:Initiated");

    const timer = setTimeout(async () => {
      setSignoutTriggered(true);

      try {
        await signOut({ redirect: false });
        logInfo("Logout:ManualRedirect", { to: "/auth/login?loggedOut=true" });
        router.replace("/auth/login?loggedOut=true");
      } catch (err) {
        logError("Logout:Failed", err, {
          callbackUrl: "/auth/login?loggedOut=true",
        });
        setSignoutTriggered(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  const user = session?.user;

  return (
    <div className="flex items-center justify-center h-screen px-4 text-center">
      {!signoutTriggered && user ? (
        <div className="space-y-4">
          <UserAvatar user={user} size={72} className="mx-auto" />
          <h1 className="text-2xl font-semibold">
            Goodbye, {user.name}{" "}
            <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-sm text-muted">
            Signing you out
            <span className="inline-block ml-1 animate-ellipsis">.</span>
            <span className="inline-block ml-1 delay-100 animate-ellipsis">
              .
            </span>
            <span className="inline-block ml-1 delay-200 animate-ellipsis">
              .
            </span>
          </p>
        </div>
      ) : (
        <LoadingSpinner message="Redirecting..." fullscreen={false} />
      )}
    </div>
  );
}
