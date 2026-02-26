"use client";

import Link from "next/link";
import { Bell, ChevronDown, Search } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { useState } from "react";

interface TopNavProps {
  variant?: "marketing" | "app";
  user?: {
    email: string;
    fullName: string;
  };
  cohortStatus?: string;
}

export function TopNav({ variant = "marketing", user, cohortStatus }: TopNavProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <header
      className="h-14 flex items-center shrink-0 px-5 gap-4"
      style={{
        backgroundColor: "var(--color-surface-raised)",
        borderBottom: "1px solid var(--color-border)",
        boxShadow: "0 1px 4px rgba(0,17,70,0.06)",
        zIndex: 40,
      }}
    >
      {/* Logo (app variant — sidebar already has branding, so minimal here) */}
      {variant === "marketing" && (
        <Link href="/" className="flex items-center gap-2 mr-4">
          <Logo variant="icon" size="sm" />
          <span className="text-base font-bold" style={{ color: "var(--color-brand-primary-600)" }}>
            EdXelera
          </span>
        </Link>
      )}

      {/* Marketing nav links */}
      {variant === "marketing" && (
        <nav className="hidden md:flex items-center gap-6 flex-1">
          <Link href="/programs" className="text-sm font-medium text-foreground hover:text-brand-primary-600 transition-colors">
            Browse Programs
          </Link>
        </nav>
      )}

      {/* App variant — search + cohort chip */}
      {variant === "app" && (
        <div className="flex-1 flex items-center gap-3">
          {cohortStatus && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-brand-primary-50)",
                color: "var(--color-brand-primary-600)",
                border: "1px solid var(--color-brand-primary-100)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success-500 inline-block" />
              {cohortStatus}
            </span>
          )}
        </div>
      )}

      {/* Spacer for marketing */}
      {variant === "marketing" && <div className="flex-1" />}

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {variant === "marketing" && (
          <>
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              style={{ color: "var(--color-brand-primary-600)" }}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all"
              style={{ backgroundColor: "var(--color-brand-primary-600)" }}
            >
              Get Started
            </Link>
          </>
        )}

        {variant === "app" && user && (
          <>
            {/* Notification bell */}
            <button
              className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-surface"
              aria-label="Notifications"
            >
              <Bell size={16} style={{ color: "var(--color-muted-foreground)" }} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--color-brand-secondary-500)" }}
              />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--color-brand-primary-600)" }}
                >
                  {initials}
                </div>
                <span className="hidden md:block text-sm font-medium text-foreground">
                  {user.fullName.split(" ")[0]}
                </span>
                <ChevronDown size={12} style={{ color: "var(--color-muted-foreground)" }} />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 rounded-xl py-1.5 z-50"
                  style={{
                    backgroundColor: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 8px 30px rgba(0,17,70,0.12)",
                  }}
                >
                  <div className="px-4 py-2.5" style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <p className="text-sm font-semibold text-foreground">{user.fullName}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link href="/app/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-surface transition-colors">
                      Settings
                    </Link>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-surface"
                      style={{ color: "var(--color-brand-secondary-500)" }}>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
