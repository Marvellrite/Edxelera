"use client";

import Link from "next/link";

interface ProgramPageProps {
  params: Promise<{ programSlug: string }>;
}

const mockProgramHome = {
  "web-dev-101": {
    title: "Web Development Bootcamp",
    timezone: "UTC",
    currentWeek: 6,
    enrollmentStatus: "active",
    progressPercent: 45,
    image: "📚",
    courses: [
      {
        courseSlug: "html-css",
        title: "HTML & CSS Fundamentals",
        percentComplete: 100,
        completedLessons: 6,
        totalLessons: 6,
      },
      {
        courseSlug: "javascript",
        title: "JavaScript Essentials",
        percentComplete: 85,
        completedLessons: 17,
        totalLessons: 20,
      },
      {
        courseSlug: "react",
        title: "React & Components",
        percentComplete: 10,
        completedLessons: 1,
        totalLessons: 12,
      },
    ],
    weeks: [
      { weekNumber: 1, title: "Intro & Setup", unlockState: "completed", releaseAt: "2026-03-01" },
      { weekNumber: 2, title: "HTML Foundations", unlockState: "completed", releaseAt: "2026-03-08" },
      { weekNumber: 3, title: "CSS Styling", unlockState: "completed", releaseAt: "2026-03-15" },
      { weekNumber: 4, title: "JavaScript Basics", unlockState: "completed", releaseAt: "2026-03-22" },
      { weekNumber: 5, title: "DOM Manipulation", unlockState: "completed", releaseAt: "2026-03-29" },
      { weekNumber: 6, title: "ES6 & Advanced JS", unlockState: "unlocked", releaseAt: "2026-04-05" },
      { weekNumber: 7, title: "React Intro", unlockState: "locked", releaseAt: "2026-04-12" },
      { weekNumber: 8, title: "Components & Props", unlockState: "locked", releaseAt: "2026-04-19" },
    ],
    upcomingDeadlines: [
      {
        type: "assignment",
        weekNumber: 6,
        title: "Build a JavaScript Calculator",
        atUtc: "2026-04-12",
      },
      {
        type: "live_session",
        weekNumber: 7,
        title: "React Concepts Q&A",
        atUtc: "2026-04-19",
      },
    ],
  },
};

export default async function StudentProgramPage({
  params,
}: ProgramPageProps) {
  const { programSlug } = await params;
  const program = mockProgramHome[programSlug as keyof typeof mockProgramHome] ||
    mockProgramHome["web-dev-101"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{program.image}</div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {program.title}
              </h1>
              <p className="text-muted-foreground">
                Currently on Week {program.currentWeek}
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-primary mb-2">
            {program.progressPercent}%
          </div>
          <p className="text-sm text-muted-foreground">Overall Progress</p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="w-full bg-muted-background rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-accent h-full transition-all"
            style={{ width: `${program.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Week timeline */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Program Timeline
          </h2>

          <div className="space-y-3">
            {program.weeks.map((week, idx) => {
              const isCurrentWeek = week.weekNumber === program.currentWeek;
              return (
                <Link
                  key={week.weekNumber}
                  href={`/app/programs/${programSlug}/week/${week.weekNumber}`}
                  className="block"
                >
                  <div
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isCurrentWeek
                        ? "border-primary bg-primary/5"
                        : week.unlockState === "completed"
                          ? "border-accent bg-accent/5 hover:border-primary"
                          : week.unlockState === "unlocked"
                            ? "border-border bg-background hover:border-primary"
                            : "border-border bg-muted-background opacity-75"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            isCurrentWeek
                              ? "bg-primary text-white"
                              : week.unlockState === "completed"
                                ? "bg-accent text-white"
                                : "bg-muted-foreground/20 text-muted-foreground"
                          }`}
                        >
                          {week.unlockState === "completed" ? "✓" : week.weekNumber}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Week {week.weekNumber}: {week.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {new Date(week.releaseAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {isCurrentWeek && (
                        <span className="text-xs font-bold px-2 py-1 rounded bg-primary text-white">
                          Current
                        </span>
                      )}
                      {week.unlockState === "locked" && (
                        <span className="text-lg">🔒</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right column - Courses and deadlines */}
        <div className="space-y-6">
          {/* Course Progress */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Course Progress
            </h3>
            <div className="space-y-4">
              {program.courses.map((course) => (
                <Link
                  key={course.courseSlug}
                  href={`/app/courses/${course.courseSlug}`}
                  className="block"
                >
                  <div className="rounded-lg border border-border bg-background p-4 hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground text-sm">
                        {course.title}
                      </h4>
                      <span className="text-sm font-bold text-primary">
                        {course.percentComplete}%
                      </span>
                    </div>
                    <div className="w-full bg-muted-background rounded-full h-1.5">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${course.percentComplete}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {course.completedLessons} of {course.totalLessons} lessons
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Upcoming Deadlines
            </h3>
            <div className="space-y-3">
              {program.upcomingDeadlines.map((deadline, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-background p-3"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">
                      {deadline.type === "assignment" ? "📝" : "🎥"}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {deadline.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Week {deadline.weekNumber}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-primary">
                    {new Date(deadline.atUtc).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
