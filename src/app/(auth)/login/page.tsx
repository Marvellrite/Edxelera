'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-sm">
      {/* Card */}
      <div
        className="rounded-[--radius-xl] p-8 border"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor: 'var(--color-card-border)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-[700] text-foreground">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-[600] text-foreground">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 border-2"
              style={{
                backgroundColor: 'var(--color-input-bg)',
                borderColor: email ? 'var(--color-input-focus)' : 'var(--color-input-border)',
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = 'var(--color-input-focus)';
                (e.target as HTMLInputElement).style.boxShadow = '0 0 0 4px rgba(47, 79, 255, 0.1)';
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = 'var(--color-input-border)';
                (e.target as HTMLInputElement).style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-[600] text-foreground">Password</label>
              <Link
                href="/forgot-password"
                className="text-xs font-[600] transition-colors hover:text-brand-primary-700"
                style={{ color: 'var(--color-brand-primary-600)' }}
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 border-2"
                style={{
                  backgroundColor: 'var(--color-input-bg)',
                  borderColor: password ? 'var(--color-input-focus)' : 'var(--color-input-border)',
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--color-input-focus)';
                  (e.target as HTMLInputElement).style.boxShadow = '0 0 0 4px rgba(47, 79, 255, 0.1)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--color-input-border)';
                  (e.target as HTMLInputElement).style.boxShadow = 'none';
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-muted-foreground)' }}
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
            className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-[700] text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-brand-primary-500/40"
            style={{
              background: 'var(--gradient-primary)',
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
        <div className="divider-label my-6" />

        {/* OAuth */}
        <div className="grid grid-cols-2 gap-3">
          {['Google', 'GitHub'].map((provider) => (
            <button
              key={provider}
              className="rounded-lg px-4 py-3 text-sm font-[600] text-foreground transition-all duration-200 hover:bg-surface border"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              {provider}
            </button>
          ))}
        </div>

        {/* Sign-up link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-[700] text-brand-primary-600 hover:text-primary-active">
            Sign up
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        By signing in, you agree to our{' '}
        <Link href="#" className="underline underline-offset-2 hover:text-foreground">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
