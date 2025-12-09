// TODO(#347): Put in its own const folder

import type { DiscordRole, UserWithRoles } from "@/types/discord";

import { RolesArray } from "@auth/core/roleConstants";

// Optional: Shared role-aware UI content
export type Card = {
  href: string;
  title: string;
  desc: string;
  roles?: string[][]; // OR logic: if any group matches, allow
};

//
// === Core Type Guards & Helpers ===
//

/**
 * Checks if a value is a DiscordRole object.
 */
export function isDiscordRole(role: unknown): role is DiscordRole {
  return (
    typeof role === "object" &&
    role !== null &&
    "id" in role &&
    "name" in role &&
    "color" in role
  );
}

/**
 * Extracts role IDs from a mixed array of strings or DiscordRole objects.
 */
export function extractRoleIds(
  roles: Array<string | { id: string }> = [],
): string[] {
  return roles
    .map((role) => (typeof role === "string" ? role : (role?.id ?? null)))
    .filter((id): id is string => id !== null);
}

/**
 * Gets readable role names from a mixed array of roles.
 */
export function extractRoleNames(
  roles: Array<string | DiscordRole> = [],
): string[] {
  return roles.map((role) => (isDiscordRole(role) ? role.name : role));
}

//
// === Role Check Functions ===
//

export function hasAnyRole(
  user: UserWithRoles | null | undefined,
  roleIdsToCheck: string[],
): boolean {
  const userRoles = extractRoleIds(user?.roles ?? []);
  return roleIdsToCheck.some((roleId) => userRoles.includes(roleId));
}

export function hasAllRoles(
  user: UserWithRoles | null | undefined,
  roleIdsToCheck: string[],
): boolean {
  const userRoles = extractRoleIds(user?.roles ?? []);
  return roleIdsToCheck.every((roleId) => userRoles.includes(roleId));
}

//
// === Role-aware Content Filters ===
//

/**
 * Filters a list of UI cards based on role access rules.
 */
export function getAllowedCards(user: UserWithRoles, cards: Card[]): Card[] {
  // old logic
  return cards.filter((card) => {
    if (!card.roles?.length) return true;
    return card.roles.some((roleGroup) => hasAnyRole(user, roleGroup));
  });
}

/**
 * Gets the role object or string for a specific role ID, if present.
 */
export function getRoleById( // old logic
  user: UserWithRoles | null | undefined,
  roleId: string,
): DiscordRole | string | null {
  return (
    (user?.roles ?? []).find((r) =>
      isDiscordRole(r) ? r.id === roleId : r === roleId,
    ) ?? null
  );
}

/**
 * Gets a human-readable role name from the master role list.
 */
export function getRoleName(roleId: string): string | null {
  return RolesArray.find((r) => r.id === roleId)?.name ?? null;
}
