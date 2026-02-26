"use client";

import Link from "next/link";

const mockEnrolledPrograms = [
  {
    slug: "web-dev-101",
    title: "Web Development Bootcamp",
    instructor: "Sarah Chen",
    progress: 45,
    startDate: "2026-03-01",
    endDate: "2026-06-01",
    status: "active",
    image: "📚",
    nextDeadline: "2026-03-15",
    completedLessons: 24,
    totalLessons: 48,
  },
  {
    slug: "product-design",
    title: "Product Design Masterclass",
    instructor: "Mike Johnson",
    progress: 25,
    startDate: "2026-03-15",
    endDate: "2026-06-15",
    status: "active",
    image: "🎨",
    nextDeadline: "2026-03-18",
    completedLessons: 12,
    totalLessons: 36,
  },
  {
    slug: "data-science-101",
    title: "Data Science Fundamentals",
    instructor: "Dr. Lisa Wang",
    progress: 0,
    startDate: "2026-04-01",
    endDate: "2026-07-01",
    status: "coming_soon",
    image: "📊",
    nextDeadline: "2026-04-01",
    completedLessons: 0,
    totalLessons: 64,
  },
];

export default function MyProgramsPage() {
  const activePrograms = mockEnrolledPrograms.filter(
    (p) => p.status === "active"
  );
  const upcomingPrograms = mockEnrolledPrograms.filter(
    (p) => p.status === "coming_soon"
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Programs</h1>
        <p className="text-muted-foreground">
          Track your progress across all enrolled programs
        </p>
      </div>

      {/* Active Programs */}
      {activePrograms.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Active Programs
          </h2>
          <div className="space-y-4">
            {activePrograms.map((program) => (
              <Link
                key={program.slug}
                href={`/app/programs/${program.slug}`}
                className="block"
              >
                <div className="rounded-lg border border-border bg-background p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    {/* Left */}
                    <div className="md:col-span-2 flex gap-4">
                      <div className="text-4xl flex-shrink-0">{program.image}</div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground mb-1">
                          {program.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          with {program.instructor}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {program.completedLessons} of {program.totalLessons} lessons
                        </p>
                      </div>
                    </div>

                    {/* Middle - Progress */}
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">
                        {program.progress}%
                      </div>
                      <div className="w-full bg-muted-background rounded-full h-2">
                        <div
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: `${program.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Right */}
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-2">
                        Next deadline
                      </p>
                      <p className="text-sm font-semibold text-foreground mb-3">
                        {new Date(program.nextDeadline).toLocaleDateString()}
                      </p>
                      <button className="inline-block rounded bg-primary text-white px-4 py-1 text-xs font-medium hover:bg-primary/90 transition-colors">
                        Continue →
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Coming Soon Programs */}
      {upcomingPrograms.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Coming Soon
          </h2>
          <div className="space-y-4">
            {upcomingPrograms.map((program) => (
              <div
                key={program.slug}
                className="rounded-lg border border-border bg-muted-background p-6 opacity-75"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{program.image}</div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">
                        {program.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Starts{" "}
                        {new Date(program.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {mockEnrolledPrograms.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
          <p className="text-2xl font-bold text-foreground mb-2">
            No programs yet
          </p>
          <p className="text-muted-foreground mb-6">
            Explore our programs and join your first cohort
          </p>
          <Link
            href="/programs"
            className="inline-block rounded-lg bg-primary text-white px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
          >
            Browse Programs
          </Link>
        </div>
      )}
    </div>
  );
}
