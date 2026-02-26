"use client";

import Link from "next/link";
import { Users, TrendingUp, BarChart2, DollarSign, ArrowRight, AlertCircle, MessageSquare, ChevronRight } from "lucide-react";

const mockInstructorDashboard = {
  stats: [
    { label: "Enrolled Students", value: "312", delta: "+12 this week", icon: Users, color: "var(--color-brand-primary-600)", bg: "var(--color-brand-primary-50)" },
    { label: "Active Learners", value: "145", delta: "Last 7 days", icon: TrendingUp, color: "var(--color-success-500)", bg: "var(--color-success-50)" },
    { label: "Completion Rate", value: "68%", delta: "+3% from last cohort", icon: BarChart2, color: "var(--color-info-500)", bg: "var(--color-info-50)" },
    { label: "Revenue Share", value: "$4,230", delta: "This month", icon: DollarSign, color: "var(--color-warning-500)", bg: "var(--color-warning-50)" },
  ],
  programs: [
    {
      slug: "web-dev-101",
      title: "Web Development Bootcamp",
      status: "active",
      enrollments: 45,
      averageProgress: 45,
      nextLiveSession: "2026-03-15",
      cohort: "Cohort 3",
    },
    {
      slug: "product-design",
      title: "Product Design Masterclass",
      status: "active",
      enrollments: 32,
      averageProgress: 28,
      nextLiveSession: "2026-03-18",
      cohort: "Cohort 2",
    },
  ],
  pendingWork: [
    { type: "assignment_review", title: "5 assignments pending review", program: "Web Dev Bootcamp", dueAt: "2026-03-12", urgent: true },
    { type: "discussion", title: "3 new discussion posts", program: "Product Design", dueAt: "2026-03-11", urgent: false },
    { type: "assignment_review", title: "2 late submissions", program: "Web Dev Bootcamp", dueAt: "2026-03-10", urgent: true },
  ],
};

export default function InstructorDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back, Sarah</h1>
        <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          Here&apos;s an overview of your teaching activity
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockInstructorDashboard.stats.map((stat) => {
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
                  style={{ backgroundColor: stat.bg }}
                >
                  <Icon size={17} style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground mb-0.5">{stat.value}</p>
              <p className="text-xs font-medium" style={{ color: "var(--color-muted-foreground)" }}>
                {stat.label}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--color-subtle-foreground)" }}>
                {stat.delta}
              </p>
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Programs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Your Programs</h2>
            <Link
              href="/instructor/programs"
              className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: "var(--color-brand-primary-600)" }}
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {mockInstructorDashboard.programs.map((program) => (
            <Link key={program.slug} href={`/instructor/programs/${program.slug}`} className="block">
              <div
                className="rounded-xl p-5 card-hover"
                style={{
                  backgroundColor: "var(--color-surface-raised)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "var(--color-success-50)",
                          color: "var(--color-success-500)",
                          border: "1px solid var(--color-success-100)",
                        }}
                      >
                        Active
                      </span>
                      <span className="text-xs" style={{ color: "var(--color-subtle-foreground)" }}>
                        {program.cohort}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground">{program.title}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
                      {program.enrollments} students enrolled
                    </p>
                  </div>
                  <ChevronRight size={16} className="shrink-0 mt-1" style={{ color: "var(--color-subtle-foreground)" }} />
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>Avg. Progress</span>
                    <span className="text-xs font-bold" style={{ color: "var(--color-brand-primary-600)" }}>
                      {program.averageProgress}%
                    </span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--color-surface)" }}
                  >
                    <div
                      className="h-full rounded-full progress-fill"
                      style={{
                        width: `${program.averageProgress}%`,
                        backgroundColor: "var(--color-brand-primary-600)",
                      }}
                    />
                  </div>
                </div>

                <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                  Next live session:{" "}
                  <span className="font-medium text-foreground">
                    {new Date(program.nextLiveSession).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pending Work */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-foreground">Action Required</h2>
          <div className="space-y-2.5">
            {mockInstructorDashboard.pendingWork.map((item, idx) => {
              const Icon = item.type === "assignment_review" ? AlertCircle : MessageSquare;
              return (
                <div
                  key={idx}
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "var(--color-surface-raised)",
                    border: item.urgent
                      ? "1px solid var(--color-brand-secondary-200)"
                      : "1px solid var(--color-border)",
                    backgroundColor: item.urgent
                      ? "var(--color-brand-secondary-50)"
                      : "var(--color-surface-raised)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: item.urgent
                          ? "var(--color-brand-secondary-100)"
                          : "var(--color-brand-primary-50)",
                        color: item.urgent
                          ? "var(--color-brand-secondary-500)"
                          : "var(--color-brand-primary-600)",
                      }}
                    >
                      <Icon size={13} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "var(--color-muted-foreground)" }}>
                        {item.program}
                      </p>
                      <p className="text-xs mt-1 font-medium" style={{ color: "var(--color-brand-secondary-500)" }}>
                        Due {new Date(item.dueAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
