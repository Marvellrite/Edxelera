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
  `min-h-0 w-full flex-1 min-w-0`;
