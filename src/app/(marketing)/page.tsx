"use client";

import Link from "next/link";
import { Logo } from "@/components/branding/Logo";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div className="space-y-6">
              <div>
                <Logo variant="dark" size="lg" className="mb-8" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-balance leading-tight text-foreground">
                Learn Together, Grow Faster
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Join structured cohort-based programs with live sessions, community feedback, and personalized learning paths.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white hover:bg-primary/90 transition-colors"
                >
                  Explore Programs
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-8 py-3 text-base font-semibold text-primary hover:bg-primary/5 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Right column - Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  number: "500+",
                  label: "Active Learners",
                },
                {
                  number: "50+",
                  label: "Programs",
                },
                {
                  number: "95%",
                  label: "Completion Rate",
                },
                {
                  number: "40h",
                  label: "Avg. Learning Time",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg bg-muted-background border border-border"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground text-balance">
              Why Choose EdXelera?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive learning platform designed for structured, community-driven education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Structured Cohorts",
                description:
                  "Learn with a cohort on a fixed schedule with clear start and end dates, creating accountability and community.",
              },
              {
                title: "Live Sessions",
                description:
                  "Connect with instructors and peers in real-time. Ask questions, get feedback, and build relationships.",
              },
              {
                title: "Weekly Progression",
                description:
                  "Content releases week by week, keeping you on track and preventing overwhelm.",
              },
              {
                title: "Assignments & Projects",
                description:
                  "Apply what you learn with hands-on assignments aligned to real-world scenarios.",
              },
              {
                title: "Discussion Forums",
                description:
                  "Collaborate with peers, share insights, and get mentorship from instructors.",
              },
              {
                title: "Certificates",
                description:
                  "Earn verifiable certificates for individual courses and complete programs.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg bg-background border border-border hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-accent text-white flex items-center justify-center mb-4 text-xl font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-primary rounded-2xl p-16 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 text-white/90">
            Join thousands of learners in our next cohort. Limited spots available.
          </p>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-primary hover:bg-white/90 transition-colors"
          >
            Browse Programs
          </Link>
        </div>
      </section>
    </div>
  );
}
