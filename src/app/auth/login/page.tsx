"use client";

import LoadingSpinner from "@auth/components/Elements/LoadingSpinner";
import LoginContent from "@auth/components/Login/LoginContent";
import type { ReactElement } from "react";
import { Suspense } from "react";

export default function LoginPage(): ReactElement {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginContent />
    </Suspense>
  );
}
