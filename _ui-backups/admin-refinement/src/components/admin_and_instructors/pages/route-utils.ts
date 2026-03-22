export type DashboardSegment = "admin" | "instructor";

export const getDashboardRoutePrefix = (segment: DashboardSegment) => `/${segment}`;

export const getCourseRoutes = (segment: DashboardSegment) => {
  const prefix = `${getDashboardRoutePrefix(segment)}/courses`;

  return {
    list: prefix,
    add: `${prefix}/add-course`,
    preview: `${prefix}/add-course/preview`,
    view: `${prefix}/view`,
  };
};

export const getDashboardMainPaneClass = (toggle: boolean) =>
  `${toggle ? "md:col-span-9" : "md:col-span-8"} col-span-1 w-full min-h-0`;
