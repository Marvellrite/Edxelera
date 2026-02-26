import { describe, expect, it } from "vitest";
import { isLessonUnlocked, isWeekUnlocked } from "@/features/_shared/unlock";

describe("unlock logic", () => {
  it("locks a week before opensAt", () => {
    const res = isWeekUnlocked({ opensAt: "2099-01-01T00:00:00.000Z", now: new Date("2098-12-31T23:00:00.000Z") });
    expect(res.unlocked).toBe(false);
  });

  it("locks lesson when prerequisite missing", () => {
    const res = isLessonUnlocked({ prerequisiteSlugs: ["a"], completedLessonSlugs: [], weekUnlocked: true });
    expect(res.unlocked).toBe(false);
  });
});
