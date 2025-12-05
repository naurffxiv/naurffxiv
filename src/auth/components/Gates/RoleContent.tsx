"use client";

import { useHasAllRoles, useHasAnyRole } from "@auth/hooks/useRoles";

import type { ReactElement } from "react";
import type { ReactNode } from "react";
import type { WithChildren } from "@/types/common";
import { useMemo } from "react";

type RoleContentProps = WithChildren & {
  roles: string[];
  fallback?: ReactNode;
  match?: "any" | "all";
};

/**
 * Component that renders content only if the user has the required roles.
 * Supports matching "any" or "all" of the provided roles.
 */
export function RoleContent({
  roles,
  children,
  fallback = null,
  match = "any", // default any
}: RoleContentProps): ReactElement {
  const hasAnyRole = useHasAnyRole(roles);
  const hasAllRoles = useHasAllRoles(roles);

  const hasAccess = useMemo(() => {
    return match === "all" ? hasAllRoles : hasAnyRole;
  }, [hasAnyRole, hasAllRoles, match]);

  return <>{hasAccess ? children : fallback}</>;
}
