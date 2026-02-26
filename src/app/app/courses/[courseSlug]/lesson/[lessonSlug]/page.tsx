"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, PlayCircle, CheckCircle2, ExternalLink, ArrowRight, BookOpen } from "lucide-react";

interface LessonPageProps {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}

const mockLessonData = {
  "javascript-js-objects": {
    courseSlug: "javascript",
    lessonSlug: "js-objects",
    title: "Objects & Arrays",
    description: "Learn how to work with objects and arrays in JavaScript — the foundation of every real-world app.",
    durationSeconds: 1800,
    resources: [
      { title: "MDN: Working with Objects", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects" },
      { title: "JavaScript.info: Objects", url: "https://javascript.info/object" },
    ],
    nextLesson: { slug: "js-destructuring", title: "Destructuring" },
    courseTitle: "JavaScript Essentials",
    courseProgress: 75,
    allLessons: [
      { slug: "arrow-functions", title: "Arrow Functions", completed: true },
      { slug: "js-objects", title: "Objects & Arrays", completed: false, current: true },
      { slug: "js-destructuring", title: "Destructuring", completed: false },
      { slug: "async-await", title: "Async/Await Patterns", completed: false },
    ],
  },
};

export default function LessonPage({ params }: LessonPageProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "resources">("overview");

  // Use defaults; in production params would be resolved via use()
  const lesson = mockLessonData["javascript-js-objects"];
  const { courseSlug } = lesson;

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <Link
        href={`/app/courses/${courseSlug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: "var(--color-brand-primary-600)" }}
      >
        <ChevronLeft size={14} />
        {lesson.courseTitle}
      </Link>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: video + content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Video card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 4px 20px rgba(0,17,70,0.1)",
            }}
          >
            {/* Video player area */}
            <div
              className="aspect-video flex flex-col items-center justify-center"
              style={{ backgroundColor: "#040506" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3 cursor-pointer transition-all hover:scale-105"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.2)" }}
              >
                <PlayCircle size={32} color="#fff" />
              </div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                {Math.floor(lesson.durationSeconds / 60)} min video
              </p>
            </div>

            {/* Video progress bar */}
            <div
              className="h-1"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <div
                className="h-full w-0 progress-fill"
                style={{ backgroundColor: "var(--color-brand-primary-600)" }}
              />
            </div>
          </div>

          {/* Title + description */}
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1.5">{lesson.title}</h1>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>
              {lesson.description}
            </p>
          </div>

          {/* Sub-tabs */}
          <div style={{ borderBottom: "1px solid var(--color-border)" }}>
            <div className="flex gap-0">
              {(["overview", "resources"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-2.5 text-sm font-medium capitalize transition-colors duration-200"
                  style={{
                    borderBottom: activeTab === tab
                      ? "2px solid var(--color-brand-primary-600)"
                      : "2px solid transparent",
                    color: activeTab === tab
                      ? "var(--color-brand-primary-600)"
                      : "var(--color-muted-foreground)",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "overview" && (
            <div
              className="rounded-xl p-5"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h3 className="text-sm font-bold text-foreground mb-3">What You&apos;ll Learn</h3>
              <ul className="space-y-2">
                {[
                  "Creating and manipulating objects in JavaScript",
                  "Working with arrays and array methods",
                  "Understanding object-oriented programming basics",
                  "Practical examples and use cases",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: "var(--color-brand-primary-600)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-2">
              {lesson.resources.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 card-hover"
                  style={{
                    backgroundColor: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-foreground)",
                  }}
                >
                  {r.title}
                  <ExternalLink size={13} style={{ color: "var(--color-muted-foreground)" }} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right: progress + lesson nav */}
        <div className="space-y-4">
          {/* Mark complete */}
          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3 className="text-sm font-bold text-foreground mb-4">Lesson Progress</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>Watched</span>
                <span className="text-xs font-bold" style={{ color: "var(--color-brand-primary-600)" }}>0%</span>
              </div>
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <div
                  className="h-full rounded-full w-0"
                  style={{ backgroundColor: "var(--color-brand-primary-600)" }}
                />
              </div>
            </div>

            <button
              onClick={() => setIsCompleted((v) => !v)}
              className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200"
              style={{
                backgroundColor: isCompleted
                  ? "var(--color-success-500)"
                  : "var(--color-brand-primary-600)",
                boxShadow: "0 2px 8px rgba(0,17,70,0.2)",
              }}
            >
              {isCompleted ? (
                <><CheckCircle2 size={15} /> Completed</>
              ) : (
                "Mark as Complete"
              )}
            </button>
          </div>

          {/* Lesson list */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <BookOpen size={14} style={{ color: "var(--color-muted-foreground)" }} />
              <span className="text-sm font-bold text-foreground">Course Lessons</span>
            </div>
            <div className="py-1">
              {lesson.allLessons.map((l) => (
                <Link
                  key={l.slug}
                  href={`/app/courses/${courseSlug}/lesson/${l.slug}`}
                  className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-200"
                  style={{
                    backgroundColor: l.current ? "var(--color-brand-primary-50)" : "transparent",
                    borderLeft: l.current
                      ? "3px solid var(--color-brand-primary-600)"
                      : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!l.current)
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-surface)";
                  }}
                  onMouseLeave={(e) => {
                    if (!l.current)
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={
                      l.completed
                        ? { backgroundColor: "var(--color-success-100)", color: "var(--color-success-500)" }
                        : l.current
                          ? { backgroundColor: "var(--color-brand-primary-100)", color: "var(--color-brand-primary-600)" }
                          : { backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-muted-foreground)" }
                    }
                  >
                    {l.completed ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <PlayCircle size={12} />
                    )}
                  </div>
                  <span
                    className="text-xs font-medium flex-1 truncate"
                    style={{
                      color: l.current
                        ? "var(--color-brand-primary-600)"
                        : l.completed
                          ? "var(--color-muted-foreground)"
                          : "var(--color-foreground)",
                    }}
                  >
                    {l.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Next lesson */}
          {lesson.nextLesson && (
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--color-brand-primary-50)",
                border: "1px solid var(--color-brand-primary-100)",
              }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--color-brand-primary-600)" }}>
                Up Next
              </p>
              <p className="text-sm font-semibold text-foreground mb-3">{lesson.nextLesson.title}</p>
              <Link
                href={`/app/courses/${courseSlug}/lesson/${lesson.nextLesson.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: "var(--color-brand-primary-600)" }}
              >
                Continue <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
