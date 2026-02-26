const issued = new Set<string>();

export async function issueCourseCertificate(userId: string, courseId: string) {
  issued.add(`${userId}:course:${courseId}`);
}

export async function issueProgramCertificate(userId: string, cohortId: string) {
  issued.add(`${userId}:program:${cohortId}`);
}

export function hasIssued(userId: string, kind: "course" | "program", id: string) {
  return issued.has(`${userId}:${kind}:${id}`);
}
