"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Simple wrapper for Link that shows a 'selected' style when the
 * current pathname & href match
 * */
export function PathSelectedLink({ children, ...linkProps }) {
  const pathname = usePathname();

  if (pathname === linkProps.href) {
    linkProps.className ??= "";
    linkProps.className = [linkProps.className, "text-[#007EA7]"].join(" ");
  }

  return <Link {...linkProps}>{children}</Link>;
}
