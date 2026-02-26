"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const inputClass =
  "w-full rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-subtle-foreground outline-none transition-all duration-200";

const inputStyle = {
  border: "1px solid var(--color-border)",
  backgroundColor: "var(--color-surface)",
};

function focusStyle(el: HTMLInputElement) {
  el.style.borderColor = "var(--color-brand-primary-600)";
  el.style.boxShadow = "0 0 0 3px rgba(0,17,70,0.1)";
}

function blurStyle(el: HTMLInputElement) {
  el.style.borderColor = "var(--color-border)";
  el.style.boxShadow = "none";
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const programSlug = searchParams.get("program");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div
        className="rounded-2xl p-8"
        style={{
          backgroundColor: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 8px 40px rgba(0,17,70,0.1)",
        }}
      >
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-foreground mb-1.5 text-balance">
            Create your account
          </h1>
          <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
            Join EdXelera and start your structured learning journey
          </p>
        </div>

        {programSlug && (
          <div
            className="mb-6 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
            style={{
              backgroundColor: "var(--color-brand-primary-50)",
              color: "var(--color-brand-primary-600)",
              border: "1px solid var(--color-brand-primary-100)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-success-500 shrink-0" />
            You&apos;ll be enrolled in the selected program after registration.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={inputClass}
              style={inputStyle}
              onFocus={(e) => focusStyle(e.target as HTMLInputElement)}
              onBlur={(e) => blurStyle(e.target as HTMLInputElement)}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass}
              style={inputStyle}
              onFocus={(e) => focusStyle(e.target as HTMLInputElement)}
              onBlur={(e) => blurStyle(e.target as HTMLInputElement)}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`${inputClass} pr-11`}
                style={inputStyle}
                onFocus={(e) => focusStyle(e.target as HTMLInputElement)}
                onBlur={(e) => blurStyle(e.target as HTMLInputElement)}
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

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass}
              style={inputStyle}
              onFocus={(e) => focusStyle(e.target as HTMLInputElement)}
              onBlur={(e) => blurStyle(e.target as HTMLInputElement)}
              required
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 pt-1">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-0.5 rounded accent-brand-primary-600"
              required
            />
            <label htmlFor="agreeToTerms" className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
              I agree to the{" "}
              <Link href="#" className="font-medium underline underline-offset-2" style={{ color: "var(--color-brand-primary-600)" }}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-medium underline underline-offset-2" style={{ color: "var(--color-brand-primary-600)" }}>
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, var(--color-brand-primary-600) 0%, var(--color-brand-primary-700) 100%)",
              boxShadow: "0 2px 8px rgba(0,17,70,0.25)",
            }}
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold transition-colors"
            style={{ color: "var(--color-brand-primary-600)" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div
          className="w-full max-w-md h-[520px] rounded-2xl skeleton"
          style={{ border: "1px solid var(--color-border)" }}
        />
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
