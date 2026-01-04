// Note: This list is used for auth control inside code
// (NOT directly in Next.js middleware `matcher` array).
// This separation avoids issues with Next.js matcher syntax limitations.
// Don't ask me why. Could probably be revisited in the future.
export const protectedRoutes: readonly string[] = [
  "/admin",
  "/dev",
  "/mod-portal",
  "/dashboard",
  "/event",
];
