"use client";

import Link from "next/link";
import { Logo } from "@/components/branding/Logo";

interface TopNavProps {
  variant?: "marketing" | "app";
  user?: {
    email: string;
    fullName: string;
  };
}

export function TopNav({ variant = "marketing", user }: TopNavProps) {
  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo variant="icon" size="md" />
            <span className="hidden text-lg font-bold text-primary sm:inline">
              EdXelera
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            {variant === "marketing" && (
              <>
                <Link
                  href="/programs"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Browse Programs
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}

            {variant === "app" && user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {user.fullName}
                </span>
                <button className="rounded-full bg-muted-background w-8 h-8 flex items-center justify-center text-xs font-bold text-foreground">
                  {user.fullName.charAt(0)}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
