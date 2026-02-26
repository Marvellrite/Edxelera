"use client";

const mockApplicants = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    experience: "5 years software development",
    bio: "Passionate about teaching web development",
    status: "pending",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    experience: "8 years design experience",
    bio: "Specialized in UX/UI design",
    status: "pending",
  },
  {
    id: "3",
    name: "David Lee",
    email: "david@example.com",
    experience: "12 years data science",
    bio: "Former tech lead at major companies",
    status: "approved",
  },
];

export default function ApplicantsPage() {
  const pendingApplicants = mockApplicants.filter(
    (a) => a.status === "pending"
  );
  const approvedApplicants = mockApplicants.filter(
    (a) => a.status === "approved"
  );

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Instructor Applicants
        </h1>
        <p className="text-muted-foreground">
          Review and manage instructor applications
        </p>
      </div>

      {pendingApplicants.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Pending Review ({pendingApplicants.length})
          </h2>
          <div className="space-y-4">
            {pendingApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="rounded-lg border border-border bg-background p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {applicant.email}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-warning/10 text-warning text-xs font-bold">
                    Pending
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-foreground mb-2">
                    <span className="font-semibold">Experience:</span>{" "}
                    {applicant.experience}
                  </p>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Bio:</span> {applicant.bio}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 rounded-lg bg-accent text-white px-4 py-2 font-medium hover:bg-accent/90 transition-colors text-sm">
                    Approve
                  </button>
                  <button className="flex-1 rounded-lg border border-border text-foreground px-4 py-2 font-medium hover:bg-muted-background transition-colors text-sm">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {approvedApplicants.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Approved Instructors ({approvedApplicants.length})
          </h2>
          <div className="space-y-4">
            {approvedApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="rounded-lg border border-accent/50 bg-accent/5 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {applicant.email}
                    </p>
                    <p className="text-sm text-foreground mt-2">
                      {applicant.experience}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold">
                    Approved
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
