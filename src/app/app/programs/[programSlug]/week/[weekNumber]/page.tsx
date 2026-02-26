"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  PlayCircle,
  Lock,
  CalendarClock,
  ChevronLeft,
  BookOpen,
  FileText,
  MessageSquare,
  Video,
  LayoutList,
} from "lucide-react";

interface WeekPageProps {
  params: Promise<{ programSlug: string; weekNumber: string }>;
}

const mockWeekHubs: Record<string, any> = {
  "web-dev-101-6": {
    programSlug: "web-dev-101",
    weekNumber: 6,
    title: "ES6 & Advanced JavaScript",
    released: true,
    releaseAt: "2026-04-05",
    lessons: [
      { courseSlug: "javascript", lessonSlug: "arrow-functions", title: "Arrow Functions", durationSeconds: 1200, unlockState: "completed", hasVideo: true },
      { courseSlug: "javascript", lessonSlug: "destructuring", title: "Destructuring & Spread Operator", durationSeconds: 1500, unlockState: "unlocked", hasVideo: true },
      { courseSlug: "javascript", lessonSlug: "async-await", title: "Async/Await Patterns", durationSeconds: 2100, unlockState: "unlocked", hasVideo: true },
    ],
    assignment: {
      title: "Build a JavaScript Calculator",
      instructions: "Create a calculator app using ES6 classes and modern JavaScript features. Should support basic operations and display results.",
      deadlineUtc: "2026-04-12",
      unlockState: "unlocked",
    },
    liveSession: {
      title: "ES6 Concepts Q&A",
      startUtc: "2026-04-11T18:00:00Z",
      endUtc: "2026-04-11T19:00:00Z",
      joinUrl: "https://meet.edxelera.com/web-dev-week6",
    },
    discussionThreadId: "thread-web-dev-6",
  },
};

type TabType = "overview" | "lessons" | "assignment" | "discussion" | "live";

const TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutList },
  { id: "lessons", label: "Lessons", icon: BookOpen },
  { id: "assignment", label: "Assignment", icon: FileText },
  { id: "discussion", label: "Discussion", icon: MessageSquare },
  { id: "live", label: "Live Session", icon: Video },
];

export default function WeekHubPage({ params }: { params: Promise<{ programSlug: string; weekNumber: string }> }) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [resolvedParams, setResolvedParams] = useState<{ programSlug: string; weekNumber: string } | null>(null);

  // Resolve params on first render via a pattern that works in client components
  if (!resolvedParams) {
    params.then((p) => setResolvedParams(p));
    // Use defaults while loading
  }

  const programSlug = resolvedParams?.programSlug ?? "web-dev-101";
  const weekNumber = resolvedParams?.weekNumber ?? "6";
  const mockKey = `${programSlug}-${weekNumber}`;
  const week = mockWeekHubs[mockKey] || mockWeekHubs["web-dev-101-6"];

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href={`/app/programs/${programSlug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: "var(--color-brand-primary-600)" }}
      >
        <ChevronLeft size={14} />
        Back to Program
      </Link>

      {/* Week banner */}
      <div
        className="rounded-2xl p-6"
        style={{
          backgroundColor: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 2px 12px rgba(0,17,70,0.06)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
              style={{
                backgroundColor: "var(--color-brand-primary-50)",
                color: "var(--color-brand-primary-600)",
                border: "1px solid var(--color-brand-primary-100)",
              }}
            >
              Week {week.weekNumber}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground text-balance">
              {week.title}
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
              {week.released
                ? "Content is now available"
                : `Unlocks on ${new Date(week.releaseAt).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`}
            </p>
          </div>

          {/* Deadline badge */}
          {week.assignment?.deadlineUtc && (
            <div
              className="shrink-0 flex items-center gap-2 rounded-xl px-3.5 py-2.5"
              style={{
                backgroundColor: "var(--color-brand-secondary-50)",
                border: "1px solid var(--color-brand-secondary-200)",
              }}
            >
              <CalendarClock size={14} style={{ color: "var(--color-brand-secondary-500)" }} />
              <div>
                <p className="text-xs font-medium" style={{ color: "var(--color-brand-secondary-600)" }}>Due</p>
                <p className="text-xs font-bold" style={{ color: "var(--color-brand-secondary-500)" }}>
                  {new Date(week.assignment.deadlineUtc).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Summary row */}
        <div
          className="mt-5 pt-4 flex items-center gap-6"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-2">
            <BookOpen size={14} style={{ color: "var(--color-muted-foreground)" }} />
            <span className="text-sm font-medium text-foreground">{week.lessons.length} Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={14} style={{ color: "var(--color-muted-foreground)" }} />
            <span className="text-sm font-medium text-foreground">1 Assignment</span>
          </div>
          <div className="flex items-center gap-2">
            <Video size={14} style={{ color: "var(--color-muted-foreground)" }} />
            <span className="text-sm font-medium text-foreground">1 Live Session</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200"
                style={{
                  borderBottom: isActive
                    ? "2px solid var(--color-brand-primary-600)"
                    : "2px solid transparent",
                  color: isActive
                    ? "var(--color-brand-primary-600)"
                    : "var(--color-muted-foreground)",
                }}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Lessons", value: week.lessons.length, color: "var(--color-brand-primary-600)", bg: "var(--color-brand-primary-50)" },
                { label: "Assignment Due", value: new Date(week.assignment?.deadlineUtc).toLocaleDateString("en-US", { month: "short", day: "numeric" }), color: "var(--color-brand-secondary-500)", bg: "var(--color-brand-secondary-50)" },
                { label: "Live Session", value: "Apr 11 · 6 PM", color: "var(--color-info-500)", bg: "var(--color-info-50)" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: item.bg, border: `1px solid ${item.bg}` }}
                >
                  <p className="text-xs font-semibold mb-2" style={{ color: "var(--color-muted-foreground)" }}>
                    {item.label}
                  </p>
                  <p className="text-xl font-bold" style={{ color: item.color }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h3 className="text-base font-bold text-foreground mb-4">Week Goals</h3>
              <ul className="space-y-2.5">
                {[
                  "Master ES6 arrow functions and modern syntax",
                  "Understand destructuring and spread operators",
                  "Learn async/await for handling asynchronous code",
                  "Apply concepts in a practical project",
                ].map((goal) => (
                  <li key={goal} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5"
                      style={{
                        backgroundColor: "var(--color-brand-primary-50)",
                        color: "var(--color-brand-primary-600)",
                        border: "1px solid var(--color-brand-primary-100)",
                      }}
                    >
                      ✓
                    </span>
                    <span className="text-sm text-foreground">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Lessons */}
        {activeTab === "lessons" && (
          <div className="space-y-3">
            {week.lessons.map((lesson: any, idx: number) => {
              const isCompleted = lesson.unlockState === "completed";
              const isUnlocked = lesson.unlockState === "unlocked";
              const isLocked = lesson.unlockState === "locked";

              return (
                <Link
                  key={lesson.lessonSlug}
                  href={isLocked ? "#" : `/app/courses/${lesson.courseSlug}/lesson/${lesson.lessonSlug}`}
                  className={isLocked ? "block pointer-events-none" : "block"}
                >
                  <div
                    className={["rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-200", isLocked ? "locked-overlay" : "card-hover"].join(" ")}
                    style={{
                      backgroundColor: "var(--color-surface-raised)",
                      border: isUnlocked
                        ? "1.5px solid var(--color-brand-primary-200)"
                        : "1px solid var(--color-border)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={
                        isCompleted
                          ? { backgroundColor: "var(--color-success-100)", color: "var(--color-success-500)" }
                          : isUnlocked
                            ? { backgroundColor: "var(--color-brand-primary-600)", color: "#fff" }
                            : { backgroundColor: "var(--color-surface)", color: "var(--color-muted-foreground)", border: "1px solid var(--color-border)" }
                      }
                    >
                      {isCompleted ? <CheckCircle2 size={18} /> : isUnlocked ? <PlayCircle size={18} /> : <Lock size={14} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{lesson.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
                        {Math.floor(lesson.durationSeconds / 60)} min
                      </p>
                    </div>

                    {isUnlocked && (
                      <button
                        className="shrink-0 rounded-lg px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200"
                        style={{ backgroundColor: "var(--color-brand-primary-600)" }}
                      >
                        Start
                      </button>
                    )}
                    {isCompleted && (
                      <span className="shrink-0 text-xs font-semibold" style={{ color: "var(--color-success-500)" }}>
                        Done
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Assignment */}
        {activeTab === "assignment" && (
          <div className="max-w-2xl space-y-4">
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 2px 12px rgba(0,17,70,0.06)",
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <h2 className="text-lg font-bold text-foreground">{week.assignment?.title}</h2>
                <span
                  className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg"
                  style={{
                    backgroundColor: "var(--color-brand-secondary-50)",
                    color: "var(--color-brand-secondary-500)",
                    border: "1px solid var(--color-brand-secondary-200)",
                  }}
                >
                  <CalendarClock size={12} />
                  Due {new Date(week.assignment?.deadlineUtc).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>

              <p className="text-sm text-foreground leading-relaxed mb-6" style={{ color: "var(--color-muted-foreground)" }}>
                {week.assignment?.instructions}
              </p>

              <button
                className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, var(--color-brand-primary-600) 0%, var(--color-brand-primary-700) 100%)",
                  boxShadow: "0 2px 8px rgba(0,17,70,0.2)",
                }}
              >
                Submit Assignment
              </button>
            </div>
          </div>
        )}

        {/* Discussion */}
        {activeTab === "discussion" && (
          <div className="max-w-2xl space-y-4">
            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
                  style={{ backgroundColor: "var(--color-brand-primary-600)" }}
                >
                  SC
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">Sarah Chen</span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "var(--color-brand-primary-50)",
                        color: "var(--color-brand-primary-600)",
                      }}
                    >
                      Instructor
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-subtle-foreground)" }}>2 days ago</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    This week we&apos;re diving deep into ES6 features. Feel free to ask questions about arrow functions, destructuring, or async/await!
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
              }}
            >
              <textarea
                placeholder="Share your thoughts or ask a question..."
                rows={4}
                className="w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-subtle-foreground outline-none transition-all duration-200 resize-none"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--color-brand-primary-600)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(0,17,70,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--color-border)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <div className="mt-3 flex justify-end">
                <button
                  className="rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all duration-200"
                  style={{ backgroundColor: "var(--color-brand-primary-600)" }}
                >
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Session */}
        {activeTab === "live" && (
          <div className="max-w-2xl">
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 2px 12px rgba(0,17,70,0.06)",
              }}
            >
              <div
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold mb-5"
                style={{
                  backgroundColor: "var(--color-info-50)",
                  color: "var(--color-info-500)",
                  border: "1px solid var(--color-info-100)",
                }}
              >
                <Video size={14} />
                Live Session
              </div>

              <h2 className="text-xl font-bold text-foreground mb-6">{week.liveSession?.title}</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    label: "Date & Time",
                    value: `${new Date(week.liveSession?.startUtc).toLocaleDateString("en-US", { month: "long", day: "numeric" })} at ${new Date(week.liveSession?.startUtc).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
                  },
                  { label: "Duration", value: "1 hour" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-4"
                    style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted-foreground)" }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              <a
                href={week.liveSession?.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, var(--color-brand-primary-600) 0%, var(--color-brand-primary-700) 100%)",
                  boxShadow: "0 2px 8px rgba(0,17,70,0.2)",
                }}
              >
                <Video size={14} />
                Join Live Session
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
