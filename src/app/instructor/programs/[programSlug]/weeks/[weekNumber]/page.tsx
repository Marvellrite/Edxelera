import Link from "next/link";

interface WeekDetailPageProps {
  params: Promise<{ programSlug: string; weekNumber: string }>;
}

const mockWeekDetail = {
  "web-dev-101-3": {
    title: "CSS Styling",
    lessons: [
      { title: "CSS Selectors", duration: 1200, instructor: "Sarah Chen" },
      {
        title: "Box Model & Layout",
        duration: 1500,
        instructor: "Sarah Chen",
      },
      { title: "Flexbox Basics", duration: 1800, instructor: "Sarah Chen" },
      {
        title: "Grid & Responsive",
        duration: 2100,
        instructor: "Sarah Chen",
      },
      { title: "CSS Best Practices", duration: 900, instructor: "Sarah Chen" },
    ],
    assignment: {
      title: "Build a Responsive Portfolio",
      submissions: 12,
      pending: 8,
    },
    liveSession: {
      title: "CSS Q&A",
      startUtc: "2026-03-15T18:00:00Z",
      attendees: 38,
    },
  },
};

export default async function InstructorWeekDetailPage({
  params,
}: WeekDetailPageProps) {
  const { programSlug, weekNumber } = await params;
  const mockKey = `${programSlug}-${weekNumber}`;
  const week = mockWeekDetail[mockKey as keyof typeof mockWeekDetail] ||
    mockWeekDetail["web-dev-101-3"];

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/instructor/programs/${programSlug}`}
          className="text-primary font-medium text-sm mb-2 inline-block hover:text-primary/80 transition-colors"
        >
          ← Back to Program
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Week {weekNumber}: {week.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-foreground mb-6">Lessons</h2>
          <div className="space-y-2">
            {week.lessons.map((lesson, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(lesson.duration / 60)} min
                    </p>
                  </div>
                  <button className="text-primary font-medium text-sm hover:text-primary/80 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-background p-6">
            <h3 className="font-bold text-foreground mb-4">Assignment</h3>
            <h4 className="font-semibold text-foreground text-sm mb-2">
              {week.assignment.title}
            </h4>
            <div className="mb-3 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">Graded</span>
                <span className="font-bold text-primary">
                  {week.assignment.submissions - week.assignment.pending}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-bold text-secondary">
                  {week.assignment.pending}
                </span>
              </div>
            </div>
            <button className="w-full rounded-lg bg-primary text-white px-4 py-2 font-medium hover:bg-primary/90 transition-colors text-sm">
              Review Submissions
            </button>
          </div>

          <div className="rounded-lg border border-border bg-background p-6">
            <h3 className="font-bold text-foreground mb-4">Live Session</h3>
            <h4 className="font-semibold text-foreground text-sm mb-2">
              {week.liveSession.title}
            </h4>
            <div className="mb-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected</span>
                <span className="font-bold text-primary">
                  {week.liveSession.attendees} attendees
                </span>
              </div>
            </div>
            <button className="w-full rounded-lg bg-primary text-white px-4 py-2 font-medium hover:bg-primary/90 transition-colors text-sm">
              Prepare Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
