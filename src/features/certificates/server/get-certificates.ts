import type { CertificateSummary } from "@/features/_shared/types";

export async function getCertificates(): Promise<CertificateSummary[]> {
  return [{ id: "cert-1", type: "course", title: "JavaScript Fundamentals", issuedAtUtc: new Date().toISOString(), courseSlug: "javascript" }];
}
