"use client";

import type { FCWithChildren } from "@/types/common";
import type { ReactElement } from "react";
import { useRouter } from "next/navigation";

export default function DiscordAdminPanel(): ReactElement {
  const router = useRouter();

  return (
    <div className="p-8 text-white">
      <h1 className="mb-6 text-3xl font-bold">Developer Panel</h1>

      <ActionButton
        onClick={() => router.push("/dev/ui-test")}
        disabled={false}
        color="blue"
      >
        Go to UI Test Page
      </ActionButton>
    </div>
  );
}

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  color: "indigo" | "green" | "amber" | "blue";
}

const ActionButton: FCWithChildren<ActionButtonProps> = ({
  children,
  onClick,
  disabled,
  color,
}) => {
  const colors = {
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    green: "bg-green-600 hover:bg-green-700",
    amber: "bg-amber-600 hover:bg-amber-700",
    blue: "bg-blue-600 hover:bg-blue-700",
  } as const;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 font-semibold rounded text-white disabled:opacity-50 ${colors[color]}`}
    >
      {children}
    </button>
  );
};
