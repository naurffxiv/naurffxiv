"use client";

import { Alert, Fade, Snackbar } from "@mui/material";

import Link from "next/link";
import LoadingSpinner from "@auth/components/Elements/LoadingSpinner";
import { LoginButton } from "@auth/components/Login/LoginButton";
import { LoginErrorMessage } from "@auth/components/Login/LoginErrorMessage";
import LogoutButton from "@auth/components/Logout/LogoutButton";
import type { ReactElement } from "react";
import SessionCountdownDebug from "@auth/components/Debug/SessionCountdownDebug";
import SessionRoleDebug from "@auth/components/Debug/SessionRoleDebug";
import UserAvatar from "@auth/components/Elements/UserAvatar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/hooks/ui/useToast";

export default function UiTestPage(): ReactElement {
  const { data: session } = useSession();
  const { open, message, severity, durationMs, showToast, closeToast } =
    useToast();
  const [avatarSize, setAvatarSize] = useState(64);

  const mockCards = [
    { href: "", title: "Card #1", desc: "Description" },
    { href: "", title: "Card #2", desc: "Description" },
    { href: "", title: "Card #3", desc: "Description" },
    { href: "", title: "Card #4", desc: "Description" },
  ];

  return (
    <main className="max-w-6xl mx-auto p-8 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        UI Components Showcase
      </h1>

      {/* Session Debug Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Session Debug Tools</h2>
        <SessionCountdownDebug />
        <SessionRoleDebug />
      </section>

      {/* Login Button */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Login Button</h2>
        <LoginButton callbackUrl="/dashboard" />
      </section>

      {/* Logout Button */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Logout Button</h2>
        <LogoutButton />
      </section>

      {/* Loading Spinner */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Loading Spinner</h2>
        <LoadingSpinner
          fullscreen={false}
          message="Loading spinner test..."
          size={40}
          timeoutMs={5000}
        />
      </section>

      {/* User Avatars */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">User Avatar</h2>
        <div className="flex gap-4 items-center">
          {session?.user && (
            <UserAvatar user={session.user} size={avatarSize} />
          )}
          <UserAvatar
            user={{
              id: "117676960091471877",
              avatar: "a_ffeae4f3749af95448f22b2f740c8328",
            }}
            size={avatarSize}
          />
          <UserAvatar
            user={{
              id: "testid2",
              name: "Fallback User",
              discriminator: "1234",
              avatar: undefined,
            }}
            size={avatarSize}
          />
        </div>
      </section>

      {/* Avatar Size Selector */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Avatar Size Selector</h2>
        <select
          className="border p-2 rounded text-black"
          value={avatarSize}
          onChange={(e) => setAvatarSize(Number(e.target.value))}
        >
          {[32, 48, 64, 96, 128, 256, 512, 1024, 2048, 4096].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </section>

      {/* Login Error Message */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Login Error Message</h2>
        <LoginErrorMessage
          message="Example error: You must be logged in."
          fromPage="/previous-page"
        />
      </section>

      {/* Toast / Snackbar Test */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Toast / Snackbar Test</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() =>
              showToast({
                severity: "success",
                message: "This is a success toast.",
              })
            }
            className="toast-success"
          >
            Success
          </button>
          <button
            onClick={() =>
              showToast({ severity: "info", message: "This is an info toast." })
            }
            className="toast-info"
          >
            Info
          </button>
          <button
            onClick={() =>
              showToast({
                severity: "warning",
                message: "This is a warning toast.",
              })
            }
            className="toast-warning"
          >
            Warning
          </button>
          <button
            onClick={() =>
              showToast({
                severity: "error",
                message: "This is an error toast.",
              })
            }
            className="toast-error"
          >
            Error
          </button>
        </div>

        {/* Snackbar */}
        <Snackbar
          open={open}
          autoHideDuration={durationMs}
          onClose={closeToast}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={severity}
            variant="filled"
            sx={{ width: "100%" }}
            onClose={closeToast}
          >
            {message}
          </Alert>
        </Snackbar>
      </section>

      {/* Role-based Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Role-Based Cards</h2>
        <Fade in timeout={500}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {mockCards.map(({ href, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col justify-between bg-[#10242b] hover:bg-[#1c3a45] 
                transition-colors p-5 rounded-xl shadow-md border border-gray-700 min-h-[150px]"
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
      </section>

      {/* Quick Actions Demo Section, This is just an idea I had */}
      <section className="mb-8" aria-label="Quick Actions Demo">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Quick Actions Demo
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-red-900/20 rounded-lg border border-red-900/30">
            <h3 className="font-medium text-red-300">Admin Actions</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              <button className="px-3 py-1.5 text-sm bg-red-800 hover:bg-red-700 transition-colors rounded-md text-white">
                Button #1
              </button>
              <button className="px-3 py-1.5 text-sm bg-red-800 hover:bg-red-700 transition-colors rounded-md text-white">
                Button #2
              </button>
            </div>
          </div>
          <div className="p-4 bg-rose-900/20 rounded-lg border border-rose-900/30">
            <h3 className="font-medium text-rose-300">Moderation Actions</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              <button className="px-3 py-1.5 text-sm bg-rose-800 hover:bg-rose-700 transition-colors rounded-md text-white">
                Button #1
              </button>
              <button className="px-3 py-1.5 text-sm bg-rose-800 hover:bg-rose-700 transition-colors rounded-md text-white">
                Button #2
              </button>
            </div>
          </div>
          <div className="p-4 bg-pink-900/20 rounded-lg border border-pink-900/30">
            <h3 className="font-medium text-pink-300">Event Actions</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              <button className="px-3 py-1.5 text-sm bg-pink-800 hover:bg-pink-700 transition-colors rounded-md text-white">
                Button #1
              </button>
              <button className="px-3 py-1.5 text-sm bg-pink-800 hover:bg-pink-700 transition-colors rounded-md text-white">
                Button #2
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
