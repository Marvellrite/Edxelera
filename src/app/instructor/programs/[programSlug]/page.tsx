"use client";

import Link from "next/link";

interface InstructorProgramPageProps {
  params: Promise<{ programSlug: string }>;
}

const mockInstructorProgram = {
  "web-dev-101": {
    title: "Web Development Bootcamp",
    weeks: [
      {
        weekNumber: 1,
        title: "Intro & Setup",
        status: "completed",
        lessons: 3,
      },
      {
        weekNumber: 2,
        title: "HTML Foundations",
        status: "completed",
        lessons: 4,
      },
      { weekNumber: 3, title: "CSS Styling", status: "current", lessons: 5 },
      {
        weekNumber: 4,
        title: "JavaScript Basics",
        status: "upcoming",
        lessons: 4,
      },
    ],
    discussionPinnedPost: {
      postId: "post-1",
      title: "CSS Best Practices",
      author: "John (Student)",
      content: "Great tips on responsive design!",
      replies: 8,
    },
  },
};

export default async function InstructorProgramPage({
  params,
}: InstructorProgramPageProps) {
  const { programSlug } = await params;
  const program = mockInstructorProgram[programSlug as keyof typeof mockInstructorProgram] ||
    mockInstructorProgram["web-dev-101"];

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/instructor/programs"
          className="text-primary font-medium text-sm mb-2 inline-block hover:text-primary/80 transition-colors"
        >
          ← Back to Programs
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {program.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Week Schedule
          </h2>
          <div className="space-y-4">
            {program.weeks.map((week) => (
              <Link
                key={week.weekNumber}
                href={`/instructor/programs/${programSlug}/weeks/${week.weekNumber}`}
                className="block"
              >
                <div className="rounded-lg border border-border bg-background p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                          week.status === "completed"
                            ? "bg-accent text-white"
                            : week.status === "current"
                              ? "bg-primary text-white"
                              : "bg-muted-background text-muted-foreground"
                        }`}
                      >
                        {week.weekNumber}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">
                          Week {week.weekNumber}: {week.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {week.lessons} lessons
                        </p>
                      </div>
                    </div>
                    <button className="text-primary font-medium text-sm">
                      Manage →
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Pinned Discussion
          </h2>
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-start gap-2 mb-3">
              <span className="text-lg">📌</span>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm">
                  {program.discussionPinnedPost.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  by {program.discussionPinnedPost.author}
                </p>
              </div>
            </div>
            <p className="text-sm text-foreground mb-3">
              {program.discussionPinnedPost.content}
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              {program.discussionPinnedPost.replies} replies
            </p>
            <button className="text-primary text-xs font-medium hover:text-primary/80 transition-colors">
              View Thread →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
