"use client";

import Link from "next/link";
import { Users, BookOpen, TrendingUp, DollarSign, ArrowRight, UserPlus, CreditCard, CheckCircle2 } from "lucide-react";

const mockAdminDashboard = {
  stats: [
    { label: "Total Users", value: "1,234", delta: "+48 this week", icon: Users, color: "var(--color-brand-primary-600)", bg: "var(--color-brand-primary-50)" },
    { label: "Active Programs", value: "12", delta: "3 launching soon", icon: BookOpen, color: "var(--color-success-500)", bg: "var(--color-success-50)" },
    { label: "Total Enrollments", value: "5,432", delta: "+214 this month", icon: TrendingUp, color: "var(--color-info-500)", bg: "var(--color-info-50)" },
    { label: "Revenue (Month)", value: "$45,230", delta: "+18% vs last month", icon: DollarSign, color: "var(--color-warning-500)", bg: "var(--color-warning-50)" },
  ],
  recentActivity: [
    { type: "enrollment", user: "John Doe", action: "enrolled in", program: "Web Development", timestamp: "2 hours ago", typeColor: "info" },
    { type: "payment", user: "Jane Smith", action: "completed payment for", program: "Product Design", timestamp: "5 hours ago", typeColor: "success" },
    { type: "completion", user: "Mike Chen", action: "completed", program: "JavaScript Essentials", timestamp: "1 day ago", typeColor: "success" },
    { type: "enrollment", user: "Li Wei", action: "enrolled in", program: "Data Science", timestamp: "1 day ago", typeColor: "info" },
  ],
};

const TYPE_CONFIG: Record<string, { bg: string; color: string }> = {
  enrollment: { bg: "var(--color-info-50)", color: "var(--color-info-500)" },
  payment: { bg: "var(--color-success-50)", color: "var(--color-success-500)" },
  completion: { bg: "var(--color-brand-primary-50)", color: "var(--color-brand-primary-600)" },
};

const QUICK_ACTIONS = [
  { label: "Manage Programs", desc: "Create, edit, or archive programs", href: "/admin/programs", icon: BookOpen },
  { label: "Manage Users", desc: "View or modify user accounts", href: "/admin/users", icon: Users },
  { label: "View Payments", desc: "Review transactions and refunds", href: "/admin/payments", icon: CreditCard },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Admin Dashboard</h1>
        <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          Platform overview and key metrics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockAdminDashboard.stats.map((stat) => {
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
        {/* Activity feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Recent Activity</h2>
            <Link
              href="/admin/logs"
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: "var(--color-brand-primary-600)" }}
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
            }}
          >
            {mockAdminDashboard.recentActivity.map((activity, idx) => {
              const cfg = TYPE_CONFIG[activity.type] ?? TYPE_CONFIG.enrollment;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-surface"
                  style={{
                    borderBottom: idx < mockAdminDashboard.recentActivity.length - 1
                      ? "1px solid var(--color-border)"
                      : "none",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{ backgroundColor: "var(--color-brand-primary-100)", color: "var(--color-brand-primary-600)" }}
                  >
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{activity.user}</span>
                      {" "}{activity.action}{" "}
                      <span className="font-semibold">{activity.program}</span>
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-subtle-foreground)" }}>
                      {activity.timestamp}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full capitalize"
                    style={{ backgroundColor: cfg.bg, color: cfg.color }}
                  >
                    {activity.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-foreground">Quick Actions</h2>
          <div className="space-y-2.5">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-xl p-4 card-hover"
                  style={{
                    backgroundColor: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--color-brand-primary-50)",
                      color: "var(--color-brand-primary-600)",
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{action.label}</p>
                    <p className="text-xs truncate" style={{ color: "var(--color-muted-foreground)" }}>
                      {action.desc}
                    </p>
                  </div>
                  <ArrowRight size={14} style={{ color: "var(--color-subtle-foreground)" }} className="shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
