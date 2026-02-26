"use client";

const mockContent = [
  {
    id: "1",
    type: "course",
    title: "HTML & CSS Fundamentals",
    program: "Web Development Bootcamp",
    lessons: 6,
    status: "published",
  },
  {
    id: "2",
    type: "course",
    title: "JavaScript Essentials",
    program: "Web Development Bootcamp",
    lessons: 20,
    status: "published",
  },
  {
    id: "3",
    type: "course",
    title: "React Basics",
    program: "Web Development Bootcamp",
    lessons: 0,
    status: "draft",
  },
  {
    id: "4",
    type: "course",
    title: "Design Systems",
    program: "Product Design Masterclass",
    lessons: 12,
    status: "published",
  },
];

export default function AdminContentPage() {
  const publishedCourses = mockContent.filter((c) => c.status === "published");
  const draftCourses = mockContent.filter((c) => c.status === "draft");

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Content</h1>
          <p className="text-muted-foreground">
            Manage courses, modules, and lessons
          </p>
        </div>
        <button className="rounded-lg bg-primary text-white px-6 py-2 font-medium hover:bg-primary/90 transition-colors">
          Create Course
        </button>
      </div>

      {/* Published Courses */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Published Courses ({publishedCourses.length})
        </h2>
        <div className="rounded-lg border border-border bg-background overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted-background border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Course
                </th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Program
                </th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Lessons
                </th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Status
                </th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {publishedCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-border hover:bg-muted-background transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {course.program}
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {course.lessons}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">
                        Edit
                      </button>
                      <button className="text-secondary text-sm font-medium hover:text-secondary/80 transition-colors">
                        Unpublish
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Draft Courses */}
      {draftCourses.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Draft Courses ({draftCourses.length})
          </h2>
          <div className="rounded-lg border border-border bg-background overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted-background border-b border-border">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">
                    Course
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">
                    Program
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">
                    Lessons
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {draftCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-border hover:bg-muted-background transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      {course.program}
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      {course.lessons}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-warning/10 text-warning text-xs font-bold">
                        Draft
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">
                          Edit
                        </button>
                        <button className="text-accent text-sm font-medium hover:text-accent/80 transition-colors">
                          Publish
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
