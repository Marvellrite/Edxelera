'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

function RegisterForm() {
  const searchParams = useSearchParams();
  const programSlug = searchParams.get('program');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  // Password strength calc
  const passwordStrength = formData.password
    ? Math.min(
        100,
        Math.max(
          0,
          (formData.password.length - 4) * 10 +
            (formData.password.match(/[A-Z]/) ? 20 : 0) +
            (formData.password.match(/[0-9]/) ? 20 : 0) +
            (formData.password.match(/[^A-Za-z0-9]/) ? 20 : 0)
        )
      )
    : 0;

  const strengthColor =
    passwordStrength < 40 ? '#ef4444' : passwordStrength < 70 ? '#f59e0b' : '#16a34a';

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
          <h1 className="text-3xl font-[700] text-foreground">Get started today</h1>
          <p className="text-sm text-muted-foreground">
            Join thousands learning with EdXelera
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-[600] text-foreground">Full name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 border-2"
              style={{
                backgroundColor: 'var(--color-input-bg)',
                borderColor: formData.fullName ? 'var(--color-input-focus)' : 'var(--color-input-border)',
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

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-[600] text-foreground">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 border-2"
              style={{
                backgroundColor: 'var(--color-input-bg)',
                borderColor: formData.email ? 'var(--color-input-focus)' : 'var(--color-input-border)',
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
            <label className="block text-sm font-[600] text-foreground">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 border-2"
                style={{
                  backgroundColor: 'var(--color-input-bg)',
                  borderColor: formData.password ? 'var(--color-input-focus)' : 'var(--color-input-border)',
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

            {/* Strength indicator */}
            {formData.password && (
              <div className="flex gap-1.5 mt-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-1 h-1 rounded-full transition-colors"
                    style={{
                      backgroundColor: i * 25 < passwordStrength ? strengthColor : '#e4e7ef',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-0.5 rounded border border-border cursor-pointer accent-brand-primary-600"
              required
            />
            <label className="text-sm text-muted-foreground cursor-pointer">
              I agree to the{' '}
              <Link href="#" className="text-brand-primary-600 font-[600] hover:underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="#" className="text-brand-primary-600 font-[600] hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !formData.agreeToTerms}
            className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-[700] text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-brand-primary-500/40"
            style={{
              background: 'var(--gradient-primary)',
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

        {/* Sign-in link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-[700] text-brand-primary-600 hover:text-primary-active">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-surface" />}>
      <RegisterForm />
    </Suspense>
  );
}
