"use client";

import type { ReactElement } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton(): ReactElement {
  const router = useRouter();

  const handleClick = (): void => {
    router.push("/auth/logout");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center px-4 py-2 text-sm 
      font-semibold rounded-md transition-colors bg-blue-600 hover:bg-blue-700 text-white"
    >
      Logout
    </button>
  );
}
