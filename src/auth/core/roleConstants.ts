//
// Discord role ID mappings – pulled from env vars
//
// These are safe for client-side use in:
// - Middleware route protection
// - Conditional rendering in UI
// - Auth validation in NextAuth callbacks
//

// TODO(#347): Put in its own const folder
export const Roles = {
  ADMIN:
    process.env["NEXT_PUBLIC_ADMIN_ROLE_ID"] ?? "NEXT_PUBLIC_ADMIN_ROLE_ID",
  MOD: process.env["NEXT_PUBLIC_MOD_ROLE_ID"] ?? "NEXT_PUBLIC_MOD_ROLE_ID",
  DEV: process.env["NEXT_PUBLIC_DEV_ROLE_ID"] ?? "NEXT_PUBLIC_DEV_ROLE_ID",
  EVENT:
    process.env["NEXT_PUBLIC_EVENT_ROLE_ID"] ?? "NEXT_PUBLIC_EVENT_ROLE_ID",
} as const;

// Used for rendering role names based on their IDs
export const RolesArray = [
  { id: Roles.ADMIN, name: "Admin" },
  { id: Roles.MOD, name: "Moderator" },
  { id: Roles.DEV, name: "Developer" },
  { id: Roles.EVENT, name: "Event Staff" },
];

export type Role = keyof typeof Roles;
export type RoleID = (typeof Roles)[Role];
