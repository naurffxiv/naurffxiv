"use client";

import { ModNavigation } from "@/components/ModPortal/ModNavigation/ModNavigation";
import React from "react";

export default function ModPortalLayout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[25ch_1fr] max-w-screen-2xl mx-auto py-4">
      <div className="scrollbar">
        <ModNavigation />
      </div>
      <article className="min-h-screen px-6">{children}</article>
    </div>
  );
}
