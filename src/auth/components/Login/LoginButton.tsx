"use client";

import type { ReactElement } from "react";
import { logError } from "@/lib/logger/logger";
import { signIn } from "next-auth/react";

type LoginButtonProps = {
  callbackUrl: string;
};

export function LoginButton({ callbackUrl }: LoginButtonProps): ReactElement {
  return (
    <button
      onClick={() =>
        signIn("discord", { callbackUrl }).catch((err) =>
          logError("LoginPage:ManualLoginFailed", err),
        )
      }
      className="flex items-center justify-center w-full gap-2 px-6 py-3 text-lg font-medium transition-colors bg-blue-600 rounded hover:bg-blue-700"
    >
      Sign in with Discord
    </button>
  );
}
