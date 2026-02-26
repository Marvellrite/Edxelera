'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Users, Award, Rocket } from 'lucide-react';
import { Logo } from '@/components/branding/Logo';

const stats = [
  { number: '5K+', label: 'Active Learners', color: '#2f4fff' },
  { number: '120+', label: 'Programs', color: '#0ea5e9' },
  { number: '94%', label: 'Completion Rate', color: '#16a34a' },
  { number: '15K+', label: 'Certificates Issued', color: '#ED1C24' },
];

const features = [
  {
    icon: Rocket,
    title: 'Structured Cohorts',
    description: 'Learn on a fixed schedule with peers. Clear milestones, accountability, and real deadlines drive results.',
    accent: false,
  },
  {
    icon: Users,
    title: 'Live Sessions',
    description: 'Connect with expert instructors and your cohort in real-time. Get answers instantly, not tomorrow.',
    accent: false,
  },
  {
    icon: Award,
    title: 'Recognized Credentials',
    description: 'Earn shareable certificates that prove your skills. Built for employers, respected in your field.',
    accent: false,
  },
  {
    icon: Zap,
    title: 'Community-Driven',
    description: 'Learn from peers facing the same challenges. Peer feedback accelerates growth and builds lasting networks.',
    accent: false,
  },
  {
    icon: Users,
    title: 'Personalized Learning',
    description: 'Adaptive pathways that adjust to your pace. Master concepts before moving on — no rushing.',
    accent: true, // Red accent dot
  },
  {
    icon: Award,
    title: 'Career Support',
    description: 'Job board, resume reviews, and alumni network. Your education leads directly to opportunities.',
    accent: false,
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ────── Hero Section ────── */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-5"
            style={{ background: 'var(--gradient-primary)' }}
          />
          <div
            className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full opacity-5"
            style={{ background: 'var(--gradient-primary)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <Logo variant="dark" size="lg" className="mb-8" />
              </div>

              <h1 className="text-5xl lg:text-6xl font-[900] text-balance leading-tight text-foreground">
                Learn Together,
                <br />
                <span className="text-gradient-primary">Grow Faster</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Join cohort-based programs with structured learning, live sessions, peer support, and career guidance. Master skills with accountability.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary-600 text-white font-[600] px-8 py-4 transition-all duration-200 hover:shadow-lg hover:shadow-brand-primary-500/40 hover:bg-primary-active"
                >
                  Explore Programs
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border px-8 py-4 text-foreground font-[600] transition-colors hover:bg-surface"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[--radius-lg] border border-brand-primary-50 bg-white card-hover"
                >
                  <div
                    className="text-4xl font-[800] mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-[500]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────── Features Section ────── */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-[800] text-balance text-foreground">
              Why Choose EdXelera?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We combine structure, community, and expert instruction to accelerate your growth in ways traditional learning can't match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="relative p-8 rounded-[--radius-lg] bg-white border border-brand-primary-50 card-hover overflow-hidden"
                >
                  {/* Red accent dot */}
                  {feature.accent && (
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-brand-secondary-500/10" />
                  )}

                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'var(--gradient-card)' }}
                    >
                      <Icon size={24} className="text-brand-primary-600" />
                    </div>
                    <h3 className="text-lg font-[700] text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────── CTA Banner ────── */}
      <section className="py-16 px-4 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-[800]">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-base lg:text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of learners who've accelerated their careers with EdXelera's cohort-based programs.
          </p>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-brand-primary-600 font-[700] px-8 py-4 transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            Explore Programs
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
