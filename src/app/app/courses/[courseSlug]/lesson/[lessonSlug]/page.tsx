"use client";

import { useState } from "react";
import Link from "next/link";

interface LessonPageProps {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}

const mockLessonData = {
  "javascript-js-objects": {
    courseSlug: "javascript",
    lessonSlug: "js-objects",
    title: "Objects & Arrays",
    description: "Learn how to work with objects and arrays in JavaScript",
    videoUrl: "https://example.com/video",
    durationSeconds: 1800,
    transcriptUrl: "https://example.com/transcript",
    resources: [
      {
        title: "MDN: Objects",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects",
      },
      {
        title: "JavaScript.info: Objects",
        url: "https://javascript.info/object",
      },
    ],
    nextLesson: {
      slug: "js-destructuring",
      title: "Destructuring",
    },
  },
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, lessonSlug } = await params;
  const mockKey = `${courseSlug}-${lessonSlug}`;
  const lesson = mockLessonData[mockKey as keyof typeof mockLessonData] ||
    mockLessonData["javascript-js-objects"];

  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4 text-sm">
        <Link
          href={`/app/courses/${courseSlug}`}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          ← Back to Course
        </Link>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Video player */}
        <div className="lg:col-span-2">
          {/* Video placeholder */}
          <div className="rounded-lg overflow-hidden bg-black aspect-video mb-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">▶</div>
              <p className="text-white/70">Video Player</p>
              <p className="text-white/50 text-sm mt-2">
                {Math.floor(lesson.durationSeconds / 60)} min video
              </p>
            </div>
          </div>

          {/* Lesson info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {lesson.title}
            </h1>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-6">
            <div className="flex gap-6">
              {["Overview", "Transcript", "Resources"].map((tab) => (
                <button
                  key={tab}
                  className="px-2 py-4 border-b-2 border-transparent text-foreground font-medium hover:text-primary transition-colors"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Overview content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-foreground">
                <li>• Creating and manipulating objects in JavaScript</li>
                <li>• Working with arrays and array methods</li>
                <li>• Understanding object-oriented programming basics</li>
                <li>• Practical examples and use cases</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-6">
          {/* Lesson progress */}
          <div className="rounded-lg border border-border bg-background p-6">
            <h3 className="font-semibold text-foreground mb-4">
              Lesson Progress
            </h3>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Watched</span>
                <span className="text-sm font-bold text-primary">0%</span>
              </div>
              <div className="w-full bg-muted-background rounded-full h-2">
                <div className="bg-primary h-full rounded-full" style={{ width: "0%" }} />
              </div>
            </div>

            <button
              onClick={() => setIsCompleted(!isCompleted)}
              className={`w-full rounded-lg px-4 py-3 font-medium transition-colors ${
                isCompleted
                  ? "bg-accent text-white hover:bg-accent/90"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              {isCompleted ? "✓ Completed" : "Mark as Complete"}
            </button>
          </div>

          {/* Resources */}
          {lesson.resources.length > 0 && (
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <div className="space-y-2">
                {lesson.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg bg-muted-background hover:bg-border transition-colors text-sm font-medium text-primary"
                  >
                    {resource.title} →
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {lesson.nextLesson && (
            <div className="rounded-lg border-2 border-primary bg-primary/5 p-6">
              <p className="text-xs text-muted-foreground mb-2">Next Lesson</p>
              <h4 className="font-semibold text-foreground mb-4">
                {lesson.nextLesson.title}
              </h4>
              <Link
                href={`/app/courses/${courseSlug}/lesson/${lesson.nextLesson.slug}`}
                className="inline-block rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Continue →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
