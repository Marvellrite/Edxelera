"use client";

import Link from "next/link";
import { BookOpen, Clock, Award, TrendingUp, ArrowRight, CalendarClock, FileText, Video } from "lucide-react";

const mockDashboard = {
  enrolledPrograms: [
    {
      slug: "web-dev-101",
      title: "Web Development Bootcamp",
      progress: 45,
      currentWeek: 6,
      totalWeeks: 12,
      nextDeadline: "2026-03-15",
      instructor: "Sarah Chen",
      status: "Active Cohort",
    },
    {
      slug: "product-design",
      title: "Product Design Masterclass",
      progress: 25,
      currentWeek: 3,
      totalWeeks: 12,
      nextDeadline: "2026-03-18",
      instructor: "James Okafor",
      status: "Active Cohort",
    },
  ],
  upcomingDeadlines: [
    {
      type: "assignment",
      title: "Build a Todo App",
      dueAt: "2026-03-15",
      program: "Web Dev Bootcamp",
    },
    {
      type: "live_session",
      title: "Live Critique Session",
      dueAt: "2026-03-18",
      program: "Product Design",
    },
  ],
  stats: [
    { label: "Enrolled Programs", value: "2", icon: BookOpen, color: "var(--color-brand-primary-600)" },
    { label: "Lessons Completed", value: "24", icon: TrendingUp, color: "var(--color-success-500)" },
    { label: "Hours Learned", value: "36h", icon: Clock, color: "var(--color-info-500)" },
    { label: "Certificates", value: "0", icon: Award, color: "var(--color-warning-500)" },
  ],
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground text-balance mb-1">
          Welcome back, Alex
        </h1>
        <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          You&apos;re making great progress — keep up the momentum.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockDashboard.stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl p-5 card-hover"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}18` }}
                >
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-xs font-medium" style={{ color: "var(--color-muted-foreground)" }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Programs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Your Programs</h2>
            <Link
              href="/app/programs"
              className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: "var(--color-brand-primary-600)" }}
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {mockDashboard.enrolledPrograms.map((program) => (
            <Link key={program.slug} href={`/app/programs/${program.slug}`} className="block">
              <div
                className="rounded-xl p-5 card-hover group"
                style={{
                  backgroundColor: "var(--color-surface-raised)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "var(--color-brand-primary-50)",
                          color: "var(--color-brand-primary-600)",
                          border: "1px solid var(--color-brand-primary-100)",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "var(--color-success-500)" }}
                        />
                        {program.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground text-base leading-snug">
                      {program.title}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
                      with {program.instructor} &middot; Week {program.currentWeek} of {program.totalWeeks}
                    </p>
                  </div>
                  <span
                    className="text-xl font-bold ml-4 shrink-0"
                    style={{ color: "var(--color-brand-primary-600)" }}
                  >
                    {program.progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden mb-3"
                  style={{ backgroundColor: "var(--color-surface)" }}
                >
                  <div
                    className="h-full rounded-full progress-fill"
                    style={{
                      width: `${program.progress}%`,
                      backgroundColor: "var(--color-brand-primary-600)",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                    Next deadline: {new Date(program.nextDeadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold transition-colors group-hover:gap-1.5"
                    style={{ color: "var(--color-brand-primary-600)" }}
                  >
                    Continue <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Deadlines sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Upcoming Deadlines</h2>

          <div className="space-y-3">
            {mockDashboard.upcomingDeadlines.map((deadline, idx) => {
              const Icon = deadline.type === "assignment" ? FileText : Video;
              return (
                <div
                  key={idx}
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor: deadline.type === "assignment"
                          ? "var(--color-brand-secondary-50)"
                          : "var(--color-info-50)",
                        color: deadline.type === "assignment"
                          ? "var(--color-brand-secondary-500)"
                          : "var(--color-info-500)",
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        {deadline.title}
                      </p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "var(--color-muted-foreground)" }}>
                        {deadline.program}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <CalendarClock size={11} style={{ color: "var(--color-brand-secondary-500)" }} />
                        <span
                          className="text-xs font-semibold"
                          style={{ color: "var(--color-brand-secondary-500)" }}
                        >
                          {new Date(deadline.dueAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/programs"
            className="flex items-center justify-center gap-2 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-brand-primary-600)",
              backgroundColor: "var(--color-surface-raised)",
            }}
          >
            Browse More Programs
          </Link>
        </div>
      </div>
    </div>
  );
}
