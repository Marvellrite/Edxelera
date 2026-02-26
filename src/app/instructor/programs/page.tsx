"use client";

import Link from "next/link";

const mockInstructorPrograms = [
  {
    slug: "web-dev-101",
    title: "Web Development Bootcamp",
    status: "active",
    enrollments: 45,
    weeks: 12,
    nextLiveSession: "2026-03-15",
  },
  {
    slug: "product-design",
    title: "Product Design Masterclass",
    status: "active",
    enrollments: 32,
    weeks: 12,
    nextLiveSession: "2026-03-18",
  },
  {
    slug: "coming-soon-program",
    title: "Advanced React Patterns",
    status: "draft",
    enrollments: 0,
    weeks: 10,
    nextLiveSession: null,
  },
];

export default function InstructorProgramsPage() {
  const activePrograms = mockInstructorPrograms.filter(
    (p) => p.status === "active"
  );
  const draftPrograms = mockInstructorPrograms.filter(
    (p) => p.status === "draft"
  );

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground">Your Programs</h1>
          <button className="rounded-lg bg-primary text-white px-6 py-2 font-medium hover:bg-primary/90 transition-colors">
            Create Program
          </button>
        </div>
        <p className="text-muted-foreground">
          Manage your teaching programs and student progress
        </p>
      </div>

      {activePrograms.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Active Programs
          </h2>
          <div className="space-y-4">
            {activePrograms.map((program) => (
              <Link
                key={program.slug}
                href={`/instructor/programs/${program.slug}`}
                className="block"
              >
                <div className="rounded-lg border border-border bg-background p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {program.title}
                      </h3>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <div>
                          <span className="text-primary font-bold">
                            {program.enrollments}
                          </span>{" "}
                          students
                        </div>
                        <div>
                          <span className="text-primary font-bold">
                            {program.weeks}
                          </span>{" "}
                          weeks
                        </div>
                      </div>
                    </div>
                    <button className="rounded-lg bg-primary text-white px-4 py-2 font-medium hover:bg-primary/90 transition-colors text-sm">
                      Manage →
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {draftPrograms.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Draft Programs
          </h2>
          <div className="space-y-4">
            {draftPrograms.map((program) => (
              <div
                key={program.slug}
                className="rounded-lg border border-border bg-muted-background p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {program.weeks} weeks • Draft
                    </p>
                  </div>
                  <button className="rounded-lg border border-border text-foreground px-4 py-2 font-medium hover:bg-background transition-colors text-sm">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
