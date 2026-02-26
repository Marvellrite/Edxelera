"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type LessonItem = {
  courseSlug: string;
  lessonSlug: string;
  title: string;
  durationSeconds: number;
  unlockState: "locked" | "unlocked" | "completed";
  hasVideo: boolean;
};

type WeekHubMock = {
  programSlug: string;
  weekNumber: number;
  title: string;
  released: boolean;
  releaseAt: string;
  lessons: LessonItem[];
  assignment?: {
    title: string;
    instructions: string;
    deadlineUtc: string;
    unlockState: "locked" | "unlocked" | "completed";
  };
  liveSession?: {
    title: string;
    startUtc: string;
    endUtc: string;
    joinUrl: string;
  };
  discussionThreadId?: string;
};

const mockWeekHubs: Record<string, WeekHubMock> = {
  "web-dev-101-6": {
    programSlug: "web-dev-101",
    weekNumber: 6,
    title: "ES6 & Advanced JavaScript",
    released: true,
    releaseAt: "2026-04-05",
    lessons: [
      {
        courseSlug: "javascript",
        lessonSlug: "arrow-functions",
        title: "Arrow Functions",
        durationSeconds: 1200,
        unlockState: "completed",
        hasVideo: true,
      },
      {
        courseSlug: "javascript",
        lessonSlug: "destructuring",
        title: "Destructuring & Spread Operator",
        durationSeconds: 1500,
        unlockState: "unlocked",
        hasVideo: true,
      },
      {
        courseSlug: "javascript",
        lessonSlug: "async-await",
        title: "Async/Await Patterns",
        durationSeconds: 2100,
        unlockState: "unlocked",
        hasVideo: true,
      },
    ],
    assignment: {
      title: "Build a JavaScript Calculator",
      instructions:
        "Create a calculator app using ES6 classes and modern JavaScript features. Should support basic operations and display results.",
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

export default function WeekHubPage() {
  const params = useParams<{ programSlug: string; weekNumber: string }>();
  const programSlug = params.programSlug ?? "web-dev-101";
  const weekNumber = params.weekNumber ?? "6";
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const mockKey = `${programSlug}-${weekNumber}`;
  const week = mockWeekHubs[mockKey] || mockWeekHubs["web-dev-101-6"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href={`/app/programs/${programSlug}`}
            className="text-primary font-medium text-sm mb-2 inline-block hover:text-primary/80 transition-colors"
          >
            ← Back to Program
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Week {week.weekNumber}: {week.title}
          </h1>
          <p className="text-muted-foreground">
            {week.released
              ? "This week's content is now available"
              : `Unlocks on ${new Date(week.releaseAt).toLocaleDateString()}`}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {[
          { id: "overview", label: "Overview", icon: "📋" },
          { id: "lessons", label: "Lessons", icon: "📚" },
          { id: "assignment", label: "Assignment", icon: "📝" },
          { id: "discussion", label: "Discussion", icon: "💬" },
          { id: "live", label: "Live Session", icon: "🎥" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border border-border bg-background p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  Lessons
                </div>
                <div className="text-3xl font-bold text-primary">
                  {week.lessons.length}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-background p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  Assignment
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {week.assignment?.title}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-background p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  Live Session
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {week.liveSession?.title}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted-background p-8">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Week Goals
              </h3>
              <ul className="space-y-2 text-foreground">
                <li>• Master ES6 arrow functions and modern syntax</li>
                <li>• Understand destructuring and spread operators</li>
                <li>• Learn async/await for handling asynchronous code</li>
                <li>• Apply concepts in a practical project</li>
              </ul>
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === "lessons" && (
          <div className="space-y-3">
            {week.lessons.map((lesson, idx) => (
              <Link
                key={lesson.lessonSlug}
                href={`/app/courses/${lesson.courseSlug}/lesson/${lesson.lessonSlug}`}
                className="block"
              >
                <div className="rounded-lg border border-border bg-background p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                        lesson.unlockState === "completed"
                          ? "bg-accent text-white"
                          : lesson.unlockState === "unlocked"
                            ? "bg-primary text-white"
                            : "bg-muted-foreground/20 text-muted-foreground"
                      }`}
                    >
                      {lesson.unlockState === "completed"
                        ? "✓"
                        : lesson.unlockState === "unlocked"
                          ? "▶"
                          : "🔒"}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {Math.floor(lesson.durationSeconds / 60)} minutes
                      </p>
                    </div>
                    {lesson.unlockState === "unlocked" && (
                      <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                        Start →
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Assignment Tab */}
        {activeTab === "assignment" && (
          <div className="max-w-3xl">
            <div className="rounded-lg border border-border bg-background p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {week.assignment?.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {week.assignment?.instructions}
              </p>

              <div className="bg-muted-background rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Deadline
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {week.assignment?.deadlineUtc
                    ? new Date(week.assignment.deadlineUtc).toLocaleDateString()
                    : "No deadline"}
                </p>
              </div>

              <button className="rounded-lg bg-primary text-white px-6 py-3 font-medium hover:bg-primary/90 transition-colors">
                Submit Assignment
              </button>
            </div>
          </div>
        )}

        {/* Discussion Tab */}
        {activeTab === "discussion" && (
          <div className="max-w-3xl">
            <div className="rounded-lg border border-border bg-background p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Week Discussion
              </h2>

              <div className="space-y-4 mb-8">
                <div className="rounded-lg border border-border bg-muted-background p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      S
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        Sarah Chen
                        <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded">
                          Instructor
                        </span>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Posted 2 days ago
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground">
                    This week we're diving deep into ES6 features. Feel free to ask questions about arrow functions, destructuring, or async/await!
                  </p>
                </div>
              </div>

              <div>
                <textarea
                  placeholder="Share your thoughts or ask a question..."
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors mb-3"
                  rows={4}
                />
                <button className="rounded-lg bg-primary text-white px-6 py-2 font-medium hover:bg-primary/90 transition-colors">
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Session Tab */}
        {activeTab === "live" && (
          <div className="max-w-3xl">
            <div className="rounded-lg border border-border bg-background p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {week.liveSession?.title}
                </h2>
              </div>

              <div className="bg-muted-background rounded-lg p-6 mb-6 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                  <p className="text-lg font-semibold text-foreground">
                    {new Date(
                      week.liveSession?.startUtc
                    ).toLocaleDateString()} at{" "}
                    {new Date(
                      week.liveSession?.startUtc
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Duration
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    1 hour
                  </p>
                </div>
              </div>

              <a
                href={week.liveSession?.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-primary text-white px-8 py-3 font-medium hover:bg-primary/90 transition-colors"
              >
                Join Live Session →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
