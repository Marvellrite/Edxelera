"use client";

import Link from "next/link";

// Mock data for dashboard
const mockDashboard = {
  enrolledPrograms: [
    {
      slug: "web-dev-101",
      title: "Web Development Bootcamp",
      progress: 45,
      currentWeek: 6,
      totalWeeks: 12,
      nextDeadline: "2026-03-15",
      image: "📚",
    },
    {
      slug: "product-design",
      title: "Product Design Masterclass",
      progress: 25,
      currentWeek: 3,
      totalWeeks: 12,
      nextDeadline: "2026-03-18",
      image: "🎨",
    },
  ],
  upcomingDeadlines: [
    {
      type: "assignment",
      title: "Web Dev: Build a Todo App",
      dueAt: "2026-03-15",
      program: "Web Development Bootcamp",
    },
    {
      type: "live_session",
      title: "Design: Live Critique Session",
      dueAt: "2026-03-18",
      program: "Product Design Masterclass",
    },
  ],
  stats: [
    { label: "Programs Enrolled", value: "2" },
    { label: "Lessons Completed", value: "24" },
    { label: "Hours Learned", value: "36h" },
    { label: "Certificates", value: "0" },
  ],
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, Alex!
        </h1>
        <p className="text-muted-foreground">
          You're making great progress. Keep up the momentum!
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockDashboard.stats.map((stat, idx) => (
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
        {/* Left column - Programs */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">
                Your Programs
              </h2>
              <Link
                href="/app/programs"
                className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-4">
              {mockDashboard.enrolledPrograms.map((program) => (
                <Link
                  key={program.slug}
                  href={`/app/programs/${program.slug}`}
                  className="block"
                >
                  <div className="rounded-lg border border-border bg-background p-6 hover:border-primary hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{program.image}</div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">
                            {program.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Week {program.currentWeek} of {program.totalWeeks}
                          </p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        {program.progress}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-muted-background rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${program.progress}%` }}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Next deadline:{" "}
                        {new Date(program.nextDeadline).toLocaleDateString()}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        Continue →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Deadlines */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Upcoming Deadlines
          </h2>
          <div className="space-y-3">
            {mockDashboard.upcomingDeadlines.map((deadline, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`text-lg ${
                      deadline.type === "assignment" ? "text-secondary" : "text-accent"
                    }`}
                  >
                    {deadline.type === "assignment" ? "📝" : "🎥"}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">
                      {deadline.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {deadline.program}
                    </p>
                    <p className="text-xs font-semibold text-primary mt-2">
                      {new Date(deadline.dueAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Browse programs button */}
          <Link
            href="/programs"
            className="block w-full mt-6 rounded-lg border-2 border-border text-center px-4 py-3 font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            Browse More Programs
          </Link>
        </div>
      </div>
    </div>
  );
}
