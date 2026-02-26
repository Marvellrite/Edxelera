"use client";

import Link from "next/link";

const mockInstructorDashboard = {
  stats: [
    { label: "Programs Teaching", value: "2" },
    { label: "Active Students", value: "145" },
    { label: "Total Enrollments", value: "312" },
    { label: "Avg Rating", value: "4.8" },
  ],
  programs: [
    {
      slug: "web-dev-101",
      title: "Web Development Bootcamp",
      status: "active",
      enrollments: 45,
      averageProgress: 45,
      nextLiveSession: "2026-03-15",
    },
    {
      slug: "product-design",
      title: "Product Design Masterclass",
      status: "active",
      enrollments: 32,
      averageProgress: 28,
      nextLiveSession: "2026-03-18",
    },
  ],
  pendingWork: [
    {
      type: "assignment_review",
      title: "5 assignments pending review",
      dueAt: "2026-03-12",
    },
    {
      type: "discussion",
      title: "3 new discussion posts",
      dueAt: "2026-03-11",
    },
  ],
};

export default function InstructorDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, Sarah!
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your teaching activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockInstructorDashboard.stats.map((stat, idx) => (
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
        {/* Programs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">
              Your Programs
            </h2>
            <Link
              href="/instructor/programs"
              className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="space-y-4">
            {mockInstructorDashboard.programs.map((program) => (
              <Link
                key={program.slug}
                href={`/instructor/programs/${program.slug}`}
                className="block"
              >
                <div className="rounded-lg border border-border bg-background p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">
                        {program.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {program.enrollments} students enrolled
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold">
                      Active
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Average Progress
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {program.averageProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted-background rounded-full h-2">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${program.averageProgress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Next live session:{" "}
                    {new Date(program.nextLiveSession).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pending Work */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Pending Work
          </h2>
          <div className="space-y-3">
            {mockInstructorDashboard.pendingWork.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-background p-4"
              >
                <p className="font-medium text-foreground text-sm mb-2">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  Due {new Date(item.dueAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
