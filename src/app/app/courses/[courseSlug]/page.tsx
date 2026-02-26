import Link from "next/link";

interface CoursePageProps {
  params: Promise<{ courseSlug: string }>;
}

const mockCourseProgress = {
  javascript: {
    courseSlug: "javascript",
    title: "JavaScript Essentials",
    percentComplete: 85,
    completedLessons: 17,
    totalLessons: 20,
    completedAtUtc: null,
    lessons: [
      {
        lessonSlug: "js-intro",
        title: "Introduction to JavaScript",
        completed: true,
        unlockState: "completed",
      },
      {
        lessonSlug: "js-variables",
        title: "Variables & Data Types",
        completed: true,
        unlockState: "completed",
      },
      {
        lessonSlug: "js-operators",
        title: "Operators & Expressions",
        completed: true,
        unlockState: "completed",
      },
      {
        lessonSlug: "js-control-flow",
        title: "Control Flow",
        completed: true,
        unlockState: "completed",
      },
      {
        lessonSlug: "js-functions",
        title: "Functions & Scope",
        completed: true,
        unlockState: "completed",
      },
      {
        lessonSlug: "js-objects",
        title: "Objects & Arrays",
        completed: false,
        unlockState: "unlocked",
      },
      {
        lessonSlug: "js-destructuring",
        title: "Destructuring",
        completed: false,
        unlockState: "unlocked",
      },
      {
        lessonSlug: "js-callbacks",
        title: "Callbacks & Promises",
        completed: false,
        unlockState: "unlocked",
      },
      {
        lessonSlug: "js-async-await",
        title: "Async/Await",
        completed: false,
        unlockState: "locked",
      },
    ],
  },
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseSlug } = await params;
  const course = mockCourseProgress[courseSlug as keyof typeof mockCourseProgress] ||
    mockCourseProgress.javascript;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/app"
          className="text-primary font-medium text-sm mb-2 inline-block hover:text-primary/80 transition-colors"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {course.title}
        </h1>

        {/* Progress summary */}
        <div className="flex items-center gap-8">
          <div>
            <div className="text-5xl font-bold text-primary">
              {course.percentComplete}%
            </div>
            <p className="text-sm text-muted-foreground">Complete</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">
              {course.completedLessons} of {course.totalLessons} lessons
            </p>
            <div className="w-full bg-muted-background rounded-full h-3">
              <div
                className="bg-primary h-full rounded-full transition-all"
                style={{ width: `${course.percentComplete}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Lessons</h2>
        <div className="space-y-2">
          {course.lessons.map((lesson, idx) => (
            <Link
              key={lesson.lessonSlug}
              href={`/app/courses/${courseSlug}/lesson/${lesson.lessonSlug}`}
              className="block"
            >
              <div
                className={`rounded-lg border p-4 transition-all ${
                  lesson.unlockState === "locked"
                    ? "border-border bg-muted-background opacity-75 cursor-not-allowed"
                    : "border-border bg-background hover:border-primary hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                      lesson.completed
                        ? "bg-accent text-white"
                        : lesson.unlockState === "unlocked"
                          ? "bg-primary text-white"
                          : "bg-muted-foreground/20 text-muted-foreground"
                    }`}
                  >
                    {lesson.completed ? "✓" : idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {lesson.title}
                    </h3>
                  </div>
                  {lesson.unlockState === "locked" && (
                    <span className="text-lg">🔒</span>
                  )}
                  {lesson.unlockState === "unlocked" && (
                    <span className="text-primary font-medium text-sm">
                      Continue →
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
