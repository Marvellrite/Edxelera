"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div
        className="rounded-2xl p-8"
        style={{
          backgroundColor: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 8px 40px rgba(0,17,70,0.1)",
        }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1.5 text-balance">
            Welcome back
          </h1>
          <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-subtle-foreground outline-none transition-all duration-200"
              style={{
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-brand-primary-600)";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,17,70,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--color-border)";
                e.target.style.boxShadow = "none";
              }}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-foreground">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium transition-colors"
                style={{ color: "var(--color-brand-primary-600)" }}
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-2.5 pr-11 text-sm text-foreground placeholder:text-subtle-foreground outline-none transition-all duration-200"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--color-brand-primary-600)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(0,17,70,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--color-border)";
                  e.target.style.boxShadow = "none";
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                style={{ color: "var(--color-muted-foreground)" }}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: isLoading
                ? "var(--color-brand-primary-700)"
                : "linear-gradient(135deg, var(--color-brand-primary-600) 0%, var(--color-brand-primary-700) 100%)",
              boxShadow: "0 2px 8px rgba(0,17,70,0.25)",
            }}
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center">
          <div className="flex-1" style={{ borderTop: "1px solid var(--color-border)" }} />
          <span className="px-3 text-xs" style={{ color: "var(--color-muted-foreground)" }}>
            or continue with
          </span>
          <div className="flex-1" style={{ borderTop: "1px solid var(--color-border)" }} />
        </div>

        {/* OAuth */}
        <div className="grid grid-cols-2 gap-3">
          {["Google", "GitHub"].map((provider) => (
            <button
              key={provider}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-surface"
              style={{
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-surface-raised)",
              }}
            >
              Continue with {provider}
            </button>
          ))}
        </div>

        {/* Sign-up link */}
        <p className="mt-6 text-center text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold transition-colors"
            style={{ color: "var(--color-brand-primary-600)" }}
          >
            Create one
          </Link>
        </p>
      </div>

      <p className="mt-5 text-center text-xs" style={{ color: "var(--color-subtle-foreground)" }}>
        By signing in, you agree to our{" "}
        <Link href="#" className="underline underline-offset-2">Terms of Service</Link>
      </p>
    </div>
  );
}
