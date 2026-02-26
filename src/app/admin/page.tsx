"use client";

import Link from "next/link";

const mockAdminDashboard = {
  stats: [
    { label: "Total Users", value: "1,234" },
    { label: "Active Programs", value: "12" },
    { label: "Total Enrollments", value: "5,432" },
    { label: "Revenue (This Month)", value: "$45,230" },
  ],
  recentActivity: [
    {
      type: "enrollment",
      user: "John Doe",
      action: "enrolled in",
      program: "Web Development",
      timestamp: "2 hours ago",
    },
    {
      type: "payment",
      user: "Jane Smith",
      action: "completed payment for",
      program: "Product Design",
      timestamp: "5 hours ago",
    },
    {
      type: "completion",
      user: "Mike Chen",
      action: "completed",
      program: "JavaScript Essentials",
      timestamp: "1 day ago",
    },
  ],
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Platform overview and key metrics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockAdminDashboard.stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border bg-background p-6"
          >
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-4xl font-bold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">
              Recent Activity
            </h2>
            <Link
              href="/admin/logs"
              className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="space-y-3">
            {mockAdminDashboard.recentActivity.map((activity, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-foreground">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-semibold">{activity.program}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-semibold">
                    {activity.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/programs"
              className="block rounded-lg border border-border bg-background p-4 hover:border-primary hover:shadow-md transition-all"
            >
              <p className="font-medium text-foreground">Manage Programs</p>
              <p className="text-xs text-muted-foreground mt-1">
                Create, edit, or view programs
              </p>
            </Link>
            <Link
              href="/admin/users"
              className="block rounded-lg border border-border bg-background p-4 hover:border-primary hover:shadow-md transition-all"
            >
              <p className="font-medium text-foreground">Manage Users</p>
              <p className="text-xs text-muted-foreground mt-1">
                View or modify user accounts
              </p>
            </Link>
            <Link
              href="/admin/payments"
              className="block rounded-lg border border-border bg-background p-4 hover:border-primary hover:shadow-md transition-all"
            >
              <p className="font-medium text-foreground">View Payments</p>
              <p className="text-xs text-muted-foreground mt-1">
                Review transactions and refunds
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
