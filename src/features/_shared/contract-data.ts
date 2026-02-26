export const demoProgram = {
  id: "prog-1",
  slug: "web-dev-101",
  title: "Web Development Cohort",
  timezone: "UTC",
  startDate: "2026-04-01T00:00:00.000Z",
  endDate: "2026-06-30T00:00:00.000Z",
  enrollmentCloseHours: 48,
  lateJoinEnabled: true,
  lateJoinDays: 7,
  amountMinor: 150000,
  currency: "NGN",
};

export const demoWeeks = [1,2,3].map((n)=>({weekNumber:n,title:`Week ${n}`,opensAt:`2026-04-0${n}T00:00:00.000Z`}));
export const demoCourses = [
  { id: "c1", slug: "javascript", title: "JavaScript Fundamentals" },
  { id: "c2", slug: "react", title: "React Fundamentals" },
];

export const demoLessons = [
  { id: "l1", courseSlug: "javascript", weekNumber: 1, slug: "js-basics", title: "JS Basics", durationSeconds: 600, prerequisites: [] },
  { id: "l2", courseSlug: "javascript", weekNumber: 1, slug: "js-functions", title: "Functions", durationSeconds: 700, prerequisites: ["js-basics"] },
  { id: "l3", courseSlug: "react", weekNumber: 2, slug: "react-intro", title: "React Intro", durationSeconds: 800, prerequisites: [] },
];
