"use client";

import Link from "next/link";

interface ProgramDetailPageProps {
  params: Promise<{ programSlug: string }>;
}

// Mock program detail data
const mockProgramDetails: Record<string, any> = {
  "web-dev-101": {
    title: "Web Development Bootcamp",
    description:
      "Master modern web development with Next.js, React, and TypeScript.",
    longDescription:
      "This comprehensive 12-week bootcamp covers everything you need to become a professional web developer. You'll build real projects, get feedback from industry professionals, and join a community of learners.",
    startDate: "2026-03-01",
    endDate: "2026-06-01",
    price: 999,
    weeks: 12,
    lessons: 48,
    instructor: "Sarah Chen",
    category: "Development",
    image: "📚",
    timezone: "UTC",
    enrollmentCutoff: "2026-02-16",
    curriculum: [
      "Fundamentals & Setup",
      "HTML & CSS Mastery",
      "JavaScript Core Concepts",
      "React Basics",
      "State Management",
      "API Integration",
      "Authentication",
      "Deployment",
      "Performance Optimization",
      "Advanced React Patterns",
      "Project Build Sprint",
      "Capstone & Celebration",
    ],
  },
};

export default async function ProgramDetailPage({
  params,
}: ProgramDetailPageProps) {
  const { programSlug } = await params;
  const program = mockProgramDetails[programSlug] || mockProgramDetails["web-dev-101"];

  const weeks = Array.from({ length: program.weeks }, (_, i) => ({
    week: i + 1,
    title: program.curriculum[i] || `Week ${i + 1}`,
    status: i < 3 ? "completed" : i < 6 ? "current" : "locked",
  }));

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with image and CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="text-6xl mb-4">{program.image}</div>
              <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
                {program.category}
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground text-balance">
              {program.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {program.longDescription}
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Instructor</span>
                <div className="font-semibold text-foreground">
                  {program.instructor}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Duration</span>
                <div className="font-semibold text-foreground">
                  {program.weeks} weeks
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Lessons</span>
                <div className="font-semibold text-foreground">
                  {program.lessons}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Timezone</span>
                <div className="font-semibold text-foreground">
                  {program.timezone}
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment Card */}
          <div className="rounded-xl border border-border bg-background p-8 h-fit sticky top-4">
            <div className="text-5xl font-bold text-primary mb-4">
              ${program.price}
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Limited spots available in this cohort
            </p>

            <Link
              href={`/auth/register?program=${programSlug}`}
              className="block w-full rounded-lg bg-primary text-white px-6 py-3 text-center font-semibold hover:bg-primary/90 transition-colors mb-3"
            >
              Enroll Now
            </Link>

            <button className="w-full rounded-lg border border-border px-6 py-3 text-center font-semibold hover:bg-muted-background transition-colors mb-4">
              Learn More
            </button>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                Enrollment closes
              </p>
              <p className="font-semibold text-foreground">
                {new Date(program.enrollmentCutoff).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>✓</span>
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>✓</span>
                <span>Lifetime access to materials</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>✓</span>
                <span>Certificate upon completion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Program Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weeks.map((week) => (
              <div
                key={week.week}
                className={`p-6 rounded-lg border transition-all ${
                  week.status === "completed"
                    ? "border-accent bg-accent/5"
                    : week.status === "current"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted-background"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">
                    Week {week.week}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      week.status === "completed"
                        ? "bg-accent text-white"
                        : week.status === "current"
                          ? "bg-primary text-white"
                          : "bg-muted-foreground/20 text-muted-foreground"
                    }`}
                  >
                    {week.status === "locked" ? "🔒 Locked" : week.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{week.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Build production-ready web applications",
              "Master React and Next.js frameworks",
              "Implement authentication and security",
              "Deploy to production with confidence",
              "Collaborate with real-world teams",
              "Build your portfolio with real projects",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1 text-primary font-bold">✓</div>
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prerequisites */}
        <section className="bg-muted-background p-8 rounded-xl mb-16">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Prerequisites
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Basic understanding of HTML & CSS</li>
            <li>• Familiarity with JavaScript concepts</li>
            <li>• A willingness to learn and practice daily</li>
            <li>• 10-15 hours per week commitment</li>
          </ul>
        </section>

        {/* CTA at bottom */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground text-balance">
            Ready to join this cohort?
          </h2>
          <Link
            href={`/auth/register?program=${programSlug}`}
            className="inline-block rounded-lg bg-primary text-white px-8 py-4 text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}
