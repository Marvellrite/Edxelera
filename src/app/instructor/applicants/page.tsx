"use client";

import { CheckCircle2, XCircle, Clock, Briefcase } from "lucide-react";

const mockApplicants = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    experience: "5 years software development",
    bio: "Passionate about teaching web development to beginners.",
    status: "pending",
    initials: "AJ",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    experience: "8 years UX/UI design",
    bio: "Specialized in product design with enterprise clients.",
    status: "pending",
    initials: "MG",
  },
  {
    id: "3",
    name: "David Lee",
    email: "david@example.com",
    experience: "12 years data science",
    bio: "Former tech lead at several major companies.",
    status: "approved",
    initials: "DL",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { label: string; bg: string; color: string; border: string }> = {
    pending: {
      label: "Pending Review",
      bg: "var(--color-warning-50)",
      color: "var(--color-warning-500)",
      border: "var(--color-warning-100)",
    },
    approved: {
      label: "Approved",
      bg: "var(--color-success-50)",
      color: "var(--color-success-500)",
      border: "var(--color-success-100)",
    },
    declined: {
      label: "Declined",
      bg: "var(--color-brand-secondary-50)",
      color: "var(--color-brand-secondary-500)",
      border: "var(--color-brand-secondary-200)",
    },
  };
  const c = config[status] ?? config.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: c.bg, color: c.color, border: `1px solid ${c.border}` }}
    >
      {status === "pending" && <Clock size={11} />}
      {status === "approved" && <CheckCircle2 size={11} />}
      {status === "declined" && <XCircle size={11} />}
      {c.label}
    </span>
  );
};

export default function ApplicantsPage() {
  const pending = mockApplicants.filter((a) => a.status === "pending");
  const approved = mockApplicants.filter((a) => a.status === "approved");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Instructor Applicants</h1>
        <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          Review and manage instructor applications
        </p>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-foreground">Pending Review</h2>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--color-warning-50)",
                color: "var(--color-warning-500)",
                border: "1px solid var(--color-warning-100)",
              }}
            >
              {pending.length}
            </span>
          </div>

          <div className="space-y-3">
            {pending.map((applicant) => (
              <div
                key={applicant.id}
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "var(--color-surface-raised)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: "var(--color-brand-primary-600)" }}
                  >
                    {applicant.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{applicant.name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
                          {applicant.email}
                        </p>
                      </div>
                      <StatusBadge status={applicant.status} />
                    </div>

                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2">
                        <Briefcase size={12} style={{ color: "var(--color-muted-foreground)" }} />
                        <span className="text-sm text-foreground">{applicant.experience}</span>
                      </div>
                      <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                        {applicant.bio}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-200"
                        style={{ backgroundColor: "var(--color-success-500)" }}
                      >
                        <CheckCircle2 size={13} />
                        Approve
                      </button>
                      <button
                        className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
                        style={{
                          border: "1px solid var(--color-border)",
                          color: "var(--color-muted-foreground)",
                          backgroundColor: "var(--color-surface-raised)",
                        }}
                      >
                        <XCircle size={13} />
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Approved */}
      {approved.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-foreground">Approved Instructors</h2>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--color-success-50)",
                color: "var(--color-success-500)",
                border: "1px solid var(--color-success-100)",
              }}
            >
              {approved.length}
            </span>
          </div>

          <div className="space-y-3">
            {approved.map((applicant) => (
              <div
                key={applicant.id}
                className="rounded-xl p-5 flex items-center gap-4"
                style={{
                  backgroundColor: "var(--color-success-50)",
                  border: "1px solid var(--color-success-100)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: "var(--color-success-500)" }}
                >
                  {applicant.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{applicant.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
                    {applicant.experience}
                  </p>
                </div>
                <StatusBadge status={applicant.status} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
