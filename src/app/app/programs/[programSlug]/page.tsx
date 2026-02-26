"use client";

import Link from "next/link";
import { Lock, CheckCircle2, ChevronRight, CalendarClock, FileText, Video } from "lucide-react";

interface ProgramPageProps {
  params: Promise<{ programSlug: string }>;
}

const mockProgramHome = {
  "web-dev-101": {
    title: "Web Development Bootcamp",
    instructor: { name: "Sarah Chen", initials: "SC" },
    currentWeek: 6,
    enrollmentStatus: "active",
    progressPercent: 45,
    cohortStatus: "Cohort 3 — Active",
    courses: [
      { courseSlug: "html-css", title: "HTML & CSS Fundamentals", percentComplete: 100, completedLessons: 6, totalLessons: 6 },
      { courseSlug: "javascript", title: "JavaScript Essentials", percentComplete: 85, completedLessons: 17, totalLessons: 20 },
      { courseSlug: "react", title: "React & Components", percentComplete: 10, completedLessons: 1, totalLessons: 12 },
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
      { type: "assignment", weekNumber: 6, title: "Build a JavaScript Calculator", atUtc: "2026-04-12" },
      { type: "live_session", weekNumber: 7, title: "React Concepts Q&A", atUtc: "2026-04-19" },
    ],
  },
};

export default async function StudentProgramPage({ params }: ProgramPageProps) {
  const { programSlug } = await params;
  const program = mockProgramHome[programSlug as keyof typeof mockProgramHome] || mockProgramHome["web-dev-101"];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{
          background: "linear-gradient(135deg, var(--color-brand-primary-700) 0%, var(--color-brand-primary-800) 100%)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {program.cohortStatus}
              </span>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
              >
                Week {program.currentWeek} / {program.weeks.length}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white text-balance mb-3">
              {program.title}
            </h1>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                {program.instructor.initials}
              </div>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                {program.instructor.name}
              </span>
            </div>
          </div>

          {/* Progress circle area */}
          <div className="flex flex-col items-center shrink-0">
            <span className="text-5xl font-bold text-white">{program.progressPercent}%</span>
            <span className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>Overall Progress</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <div
              className="h-full rounded-full progress-fill"
              style={{
                width: `${program.progressPercent}%`,
                backgroundColor: "#fff",
              }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-bold text-foreground mb-4">Program Timeline</h2>

          <div className="space-y-2">
            {program.weeks.map((week) => {
              const isCurrent = week.weekNumber === program.currentWeek;
              const isCompleted = week.unlockState === "completed";
              const isLocked = week.unlockState === "locked";

              return (
                <Link
                  key={week.weekNumber}
                  href={isLocked ? "#" : `/app/programs/${programSlug}/week/${week.weekNumber}`}
                  className={isLocked ? "block pointer-events-none" : "block"}
                >
                  <div
                    className={[
                      "relative flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200",
                      isLocked ? "locked-overlay" : "card-hover",
                    ].join(" ")}
                    style={{
                      backgroundColor: isCurrent
                        ? "var(--color-brand-primary-50)"
                        : "var(--color-surface-raised)",
                      border: isCurrent
                        ? "1.5px solid var(--color-brand-primary-200)"
                        : isCompleted
                          ? "1px solid var(--color-success-100)"
                          : "1px solid var(--color-border)",
                    }}
                  >
                    {/* Week number / status icon */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={
                        isCurrent
                          ? { backgroundColor: "var(--color-brand-primary-600)", color: "#fff" }
                          : isCompleted
                            ? { backgroundColor: "var(--color-success-100)", color: "var(--color-success-500)" }
                            : { backgroundColor: "var(--color-surface)", color: "var(--color-muted-foreground)", border: "1px solid var(--color-border)" }
                      }
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={16} />
                      ) : isLocked ? (
                        <Lock size={14} />
                      ) : (
                        week.weekNumber
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-sm leading-snug"
                        style={{ color: isLocked ? "var(--color-muted-foreground)" : "var(--color-foreground)" }}
                      >
                        Week {week.weekNumber}: {week.title}
                      </h3>
                      {isLocked && (
                        <p className="text-xs mt-0.5" style={{ color: "var(--color-subtle-foreground)" }}>
                          Unlocks {new Date(week.releaseAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      )}
                    </div>

                    {isCurrent && (
                      <span
                        className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: "var(--color-brand-primary-600)",
                          color: "#fff",
                        }}
                      >
                        Current
                      </span>
                    )}
                    {!isLocked && !isCurrent && (
                      <ChevronRight size={14} style={{ color: "var(--color-subtle-foreground)" }} className="shrink-0" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: course progress + deadlines */}
        <div className="space-y-6">
          {/* Course Progress */}
          <div>
            <h3 className="text-base font-bold text-foreground mb-3">Course Progress</h3>
            <div className="space-y-3">
              {program.courses.map((course) => (
                <Link key={course.courseSlug} href={`/app/courses/${course.courseSlug}`} className="block">
                  <div
                    className="rounded-xl p-4 card-hover"
                    style={{
                      backgroundColor: "var(--color-surface-raised)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground truncate mr-2">{course.title}</span>
                      <span
                        className="text-xs font-bold shrink-0"
                        style={{
                          color: course.percentComplete === 100
                            ? "var(--color-success-500)"
                            : "var(--color-brand-primary-600)",
                        }}
                      >
                        {course.percentComplete}%
                      </span>
                    </div>
                    <div
                      className="w-full h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: "var(--color-surface)" }}
                    >
                      <div
                        className="h-full rounded-full progress-fill"
                        style={{
                          width: `${course.percentComplete}%`,
                          backgroundColor: course.percentComplete === 100
                            ? "var(--color-success-500)"
                            : "var(--color-brand-primary-600)",
                        }}
                      />
                    </div>
                    <p className="text-xs mt-1.5" style={{ color: "var(--color-muted-foreground)" }}>
                      {course.completedLessons} of {course.totalLessons} lessons
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Deadlines */}
          <div>
            <h3 className="text-base font-bold text-foreground mb-3">Upcoming Deadlines</h3>
            <div className="space-y-2.5">
              {program.upcomingDeadlines.map((d, i) => {
                const Icon = d.type === "assignment" ? FileText : Video;
                return (
                  <div
                    key={i}
                    className="rounded-xl p-3.5 flex items-start gap-3"
                    style={{
                      backgroundColor: "var(--color-surface-raised)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: "var(--color-brand-secondary-50)",
                        color: "var(--color-brand-secondary-500)",
                      }}
                    >
                      <Icon size={13} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-snug">{d.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
                        Week {d.weekNumber}
                      </p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <CalendarClock size={10} style={{ color: "var(--color-brand-secondary-500)" }} />
                        <span className="text-xs font-semibold" style={{ color: "var(--color-brand-secondary-500)" }}>
                          {new Date(d.atUtc).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
