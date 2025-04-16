"use client";
import React from "react";
import { ModNavigation } from "@/components/ModView/ModNavigation/ModNavigation";

export default function ModViewLayout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[25ch_1fr] max-w-screen-2xl mx-auto py-4">
      <div className="top-[5.5rem] self-start hidden xl:block sticky h-[calc(100vh-100px)] scrollbar">
        <ModNavigation />
      </div>
      <article className="min-h-screen px-6">{children}</article>
    </div>
  );
}
