"use client";

import ChangelogContent from "@/components/Changelog/ChangelogContent";
import type { ReactElement } from "react";

export default function ChangelogPage(): ReactElement {
  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <ChangelogContent />
      </div>
    </div>
  );
}
