"use client";

import { Fade, Grow, Slide } from "@mui/material";

import Link from "next/link";
import LoadingSpinner from "@/auth/components/Elements/LoadingSpinner";
import type { ReactElement } from "react";
import { RoleContent } from "@auth/components/Gates/RoleContent";
import { Roles } from "@auth/core/roleConstants";
import SessionCountdownDebug from "@auth/components/Debug/SessionCountdownDebug";
import SessionRoleDebug from "@auth/components/Debug/SessionRoleDebug";
import UserAvatar from "@auth/components/Elements/UserAvatar";
import { logInfo } from "@/lib/logger/logger";
import { useEffect } from "react";
import { useRoleBasedContent } from "@auth/hooks/useRoles";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CARD_DEFINITIONS = [
  {
    href: "/admin",
    title: "Admin Tools",
    desc: "Admin-only configuration",
    roles: [[Roles.ADMIN, Roles.DEV]],
  },
  {
    href: "/mod-portal",
    title: "Mod Portal",
    desc: "Moderator access to strikes, notes, and exiles",
    roles: [[Roles.ADMIN, Roles.MOD, Roles.DEV]],
  },
  {
    href: "/event",
    title: "Event Tools",
    desc: "Coordinate and schedule raid events",
    roles: [[Roles.ADMIN, Roles.MOD, Roles.DEV, Roles.EVENT]],
  },
  {
    href: "/dev",
    title: "Developer Panel",
    desc: "Internal testing & debug tools",
    roles: [[Roles.ADMIN, Roles.DEV]],
  },
  {
    href: "/auth/logout",
    title: "Logout",
    desc: "End your current session",
    roles: [],
  },
];

export default function DashboardPage(): ReactElement {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;

  // main role logic
  const allowedCards = useRoleBasedContent(CARD_DEFINITIONS);

  useEffect(() => {
    if (status === "authenticated" && user?.id) {
      logInfo("Dashboard:Access", {
        userId: user.id,
        roles: user.roles?.map((r) => (typeof r === "string" ? r : r.id)),
        timestamp: new Date().toISOString(),
      });
    }
  }, [status, user]);

  useEffect(() => {
    if (
      status === "authenticated" &&
      (!user || !user.roles || user.roles.length === 0)
    ) {
      router.push("/auth/error?error=AccessDenied");
    }
  }, [status, user, router]);

  if (status === "loading" || !user) {
    return <LoadingSpinner message="Loading Dashboard..." />;
  }

  return (
    <main
      className="max-w-5xl px-4 py-10 mx-auto"
      aria-label="Dashboard main content"
    >
      <Slide in direction="down" timeout={400}>
        <header className="flex items-center gap-4 mb-8">
          <Grow in timeout={500}>
            <div>
              <UserAvatar
                user={{ ...user, roles: user?.roles ?? [] }}
                size={64}
              />
            </div>
          </Grow>
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Welcome back, {user.name}
            </h1>
            <p className="text-sm text-muted">
              Access is tailored to your roles.
            </p>
          </div>
        </header>
      </Slide>

      <div className="mb-6 text-sm text-muted">
        <SessionCountdownDebug />
      </div>

      {/* Main Dashboard Section */}
      <section aria-label="Available Tools">
        {allowedCards.length === 0 ? (
          <EmptyToolsMessage />
        ) : (
          <Fade in timeout={500}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {allowedCards.map(({ href, title, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="
                  flex flex-col justify-between bg-[#10242b] hover:bg-[#1c3a45] transition-colors 
                  p-5 rounded-xl shadow-md border border-gray-700 min-h-[150px]"
                  aria-label={title}
                >
                  <div>
                    <h2 className="mb-1 text-xl font-semibold text-white">
                      {title}
                    </h2>
                    <p className="text-sm text-muted">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Fade>
        )}
      </section>

      {/* Status Section */}
      <section
        className="mt-8 p-4 bg-gray-800/30 rounded-lg"
        aria-label="System Status"
      >
        <RoleContent
          roles={[Roles.ADMIN, Roles.DEV]}
          fallback={
            <p className="text-sm text-muted">
              Session information is only visible to admins and developers.
            </p>
          }
        >
          <SessionRoleDebug />
        </RoleContent>
      </section>
    </main>
  );
}

// Fallback for no access
function EmptyToolsMessage(): ReactElement {
  return (
    <div className="p-8 text-center bg-gray-800/30 rounded-xl">
      <p className="text-muted">You don&apos;t have access to any tools yet.</p>
      <p className="mt-1 text-sm text-muted">
        DM a dev if this feels like a mistake.
      </p>
    </div>
  );
}
