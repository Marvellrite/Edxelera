export const cacheKeys = {
  billingStatus: (userId: string, programSlug: string) => `billing:${userId}:${programSlug}`,
  studentProgramHome: (userId: string, programSlug: string) => `program-home:${userId}:${programSlug}`,
  weekHub: (userId: string, programSlug: string, weekNumber: number) => `week-hub:${userId}:${programSlug}:${weekNumber}`,
};