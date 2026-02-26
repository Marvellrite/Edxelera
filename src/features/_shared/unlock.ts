export function isWeekUnlocked({ opensAt, now }: { opensAt: string; now: Date }) {
  const openDate = new Date(opensAt);
  if (now >= openDate) return { unlocked: true };
  return { unlocked: false, reason: "Week not released yet", opensAt };
}

export function isLessonUnlocked({ prerequisiteSlugs, completedLessonSlugs, weekUnlocked }: { prerequisiteSlugs: string[]; completedLessonSlugs: string[]; weekUnlocked: boolean }) {
  if (!weekUnlocked) return { unlocked: false, reason: "Week locked" };
  const missing = prerequisiteSlugs.filter((slug) => !completedLessonSlugs.includes(slug));
  if (missing.length) return { unlocked: false, reason: `Complete prerequisites: ${missing.join(", ")}` };
  return { unlocked: true };
}
