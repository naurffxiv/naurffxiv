"use client";

import ChangelogContent from "@/components/Changelog/ChangelogContent";

export default function ChangelogPage() {
  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <ChangelogContent />
      </div>
    </div>
  );
}
