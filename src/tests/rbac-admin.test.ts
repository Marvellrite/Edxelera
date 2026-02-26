import { describe, expect, it } from "vitest";
import { hasRole } from "@/lib/server/authz";
import { createProgram, listPrograms, setProgramPricing } from "@/features/admin/server/admin-service";

describe("rbac smoke", () => {
  it("allows role match", () => {
    expect(hasRole(["admin"], "admin")).toBe(true);
    expect(hasRole(["student"], "admin")).toBe(false);
  });
});

describe("admin program service smoke", () => {
  it("creates and updates pricing", async () => {
    const created = await createProgram({ programSlug: "qa-program", title: "QA Program" });
    expect(created.programSlug).toBe("qa-program");
    const updated = await setProgramPricing("qa-program", 200000, "NGN");
    expect(updated?.amountMinor).toBe(200000);
    const listed = await listPrograms(1, 50);
    expect(listed.items.some((entry) => entry.programSlug === "qa-program")).toBe(true);
  });
});
