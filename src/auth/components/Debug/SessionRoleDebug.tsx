"use client";

import "./debug.css";

import type { ReactElement } from "react";
import { logDebug } from "@/lib/logger/logger";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const isDev = process.env.NODE_ENV !== "production";

export default function SessionRoleDebug(): ReactElement | null {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (isDev && status === "authenticated") {
      logDebug("Session:RoleDebug", JSON.parse(JSON.stringify(session)));
    }
  }, [status, session]);

  if (!isDev || status !== "authenticated") return null;

  const { user } = session || {};
  const roles = user?.roles || [];

  return (
    <div className="debug-box">
      <h2 className="mb-3 text-lg font-bold text-blue-300">
        Session Role Debug
      </h2>

      <div className="space-y-2 text-sm">
        <div>
          <strong>User:</strong> {user?.name}
        </div>
        <div>
          <strong>ID:</strong> {user?.id}
        </div>
        <div>
          <strong>Roles:</strong>{" "}
          {roles.length ? (
            <div className="flex flex-wrap gap-2 mt-1">
              {roles.map((role) => {
                const hex = `#${(role.color || 0)
                  .toString(16)
                  .padStart(6, "0")}`;
                return (
                  <span
                    key={role.id || role}
                    className="role-pill"
                    style={{ backgroundColor: hex }}
                  >
                    {role.name || role}
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="ml-2 text-xs text-muted">No roles assigned</span>
          )}
        </div>
        <div>
          <strong>Cache TTL:</strong>{" "}
          {user?.cacheExpires ? (
            new Date(user.cacheExpires).toLocaleString()
          ) : (
            <span className="text-muted">Not available</span>
          )}
        </div>
      </div>

      <details className="mt-4">
        <summary className="text-blue-400 underline cursor-pointer">
          View Raw Session JSON
        </summary>
        <pre className="p-2 mt-2 overflow-auto text-xs text-green-300 bg-gray-800 border border-gray-700 rounded">
          {JSON.stringify(session, null, 2)}
        </pre>
      </details>
    </div>
  );
}
