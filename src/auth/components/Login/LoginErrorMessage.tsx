"use client";

import type { ReactElement } from "react";

interface LoginErrorMessageProps {
  message: string | null;
  fromPage: string | null;
}
export function LoginErrorMessage({
  message,
  fromPage,
}: LoginErrorMessageProps): ReactElement | null {
  if (!message) return null;

  return (
    <div className="mb-4">
      <p className="mb-1 font-medium text-red-500">{message}</p>
      {fromPage && (
        <a href={fromPage} className="text-sm text-blue-500 underline">
          Return to previous page
        </a>
      )}
    </div>
  );
}
