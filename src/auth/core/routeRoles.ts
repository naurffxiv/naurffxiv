import { Roles } from "@auth/core/roleConstants";

//
// Maps route prefixes to Discord roles that are allowed access.
//
// Used for:
// - Middleware authorization (src/auth/middleware/auth.ts)
// - UI access control (e.g. session.role-based rendering)
//
// NOTE: This uses **prefix matching**, so all nested routes are also protected.
//
export const routeRoleAccessMap: Record<string, string[]> = {
  "/admin": [Roles.ADMIN],
  "/dev": [Roles.ADMIN, Roles.DEV],
  "/mod-portal": [Roles.ADMIN, Roles.MOD],
  "/dashboard": [Roles.ADMIN, Roles.MOD, Roles.DEV, Roles.EVENT],
  "/event": [Roles.ADMIN, Roles.MOD, Roles.EVENT],
};

// Get the list of allowed roles for a route
// If the route isn't protected, return an empty array (aka "open access")
const routeRoleEntries = Object.entries(routeRoleAccessMap);
export function getAllowedRolesForPath(pathname: string = ""): string[] {
  for (const [prefix, allowedRoles] of routeRoleEntries) {
    if (pathname.startsWith(prefix)) {
      return allowedRoles;
    }
  }
  return [];
}
