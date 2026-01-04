"use client";

import { extractRoleIds, hasAllRoles, hasAnyRole } from "@auth/core/roleUtils";

import type { UserWithRoles } from "@/types/discord";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

/**
 * Hook to check if the current user has at least one of the specified roles.
 *
 * @param roleIds - An array of role IDs to check against.
 * @returns True if the user has any of the specified roles, otherwise false.
 */
export function useHasAnyRole(roleIds: string[]): boolean {
  const { data: session } = useSession();

  return useMemo(() => {
    if (!session?.user) return false;
    const userWithRoles = { ...session.user, roles: session.user?.roles ?? [] };
    return hasAnyRole(userWithRoles, roleIds);
  }, [session?.user, roleIds]);
}

/**
 * Hook to check if the current user has all of the specified roles.
 *
 * @param roleIds - An array of role IDs to check against.
 * @returns True if the user has all of the specified roles, otherwise false.
 */
export function useHasAllRoles(roleIds: string[]): boolean {
  const { data: session } = useSession();

  return useMemo(() => {
    if (!session?.user) return false;
    const userWithRoles = { ...session.user, roles: session.user?.roles ?? [] };
    return hasAllRoles(userWithRoles, roleIds);
  }, [session?.user, roleIds]);
}

/**
 * Hook to retrieve all role IDs assigned to the current user.
 *
 * @returns An array of role IDs the user has, or an empty array if none.
 */
export function useUserRoles(): string[] {
  // old logic
  const { data: session } = useSession();

  return useMemo(() => {
    if (!session?.user?.roles) return [];
    return extractRoleIds(session.user.roles);
  }, [session?.user?.roles]);
}

/**
 * Hook to filter an array of items based on user roles.
 * Each item can specify one or more role groups that grant access.
 *
 * @param items - Array of items to filter. Each item can define allowed role groups.
 * @returns Array of items the current user has permission to access.
 */
export function useRoleBasedContent<T extends { roles?: string[][] }>(
  items: T[],
): T[] {
  const { data: session } = useSession();

  return useMemo(() => {
    if (!session?.user) return [];
    const userWithRoles = {
      ...session.user,
      roles: session.user?.roles ?? [],
    } as UserWithRoles;

    return items.filter((item) => {
      if (!item.roles?.length) return true;
      return item.roles.some((roleGroup) =>
        hasAnyRole(userWithRoles, roleGroup),
      );
    });
  }, [items, session?.user]);
}
