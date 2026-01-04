"use client";

import ErrorContent from "@auth/components/Error/ErrorContent";
import LoadingSpinner from "@auth/components/Elements/LoadingSpinner";
import type { ReactElement } from "react";
import { Suspense } from "react";

export default function ErrorPage(): ReactElement {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorContent />
    </Suspense>
  );
}
