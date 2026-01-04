"use client";

import { logInfo, logWarn } from "@/lib/logger/logger";

import type { FCWithChildren } from "@/types/common";
import LoadingSpinner from "@auth/components/Elements/LoadingSpinner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AuthGate: FCWithChildren = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const isValidUser = session?.user?.id && session?.user?.roles?.length;

    if (status === "unauthenticated") {
      logWarn("AuthGate:Unauthenticated");
      router.replace("/auth/login?error=Unauthenticated");
      return;
    }

    if (!isValidUser) {
      logWarn("AuthGate:InvalidSession", { session });
      router.replace("/auth/login?error=InvalidSession");
      return;
    }

    if (session?.user) {
      logInfo("AuthGate:Authenticated", { userId: session.user.id });
    }
  }, [status, session, router]);

  const isWaiting = status === "loading" || !session?.user;

  if (isWaiting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <LoadingSpinner message="Warming up your session..." timeoutMs={8000} />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGate;
