"use client";

import Link from "next/link";

const mockCertificates = [
  {
    id: "cert-1",
    type: "course",
    title: "HTML & CSS Fundamentals",
    issuedAtUtc: "2026-02-15",
    courseSlug: "html-css",
  },
  {
    id: "cert-2",
    type: "course",
    title: "JavaScript Essentials",
    issuedAtUtc: "2026-03-15",
    courseSlug: "javascript",
  },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Your Certificates
        </h1>
        <p className="text-muted-foreground">
          Certificates you've earned by completing courses and programs
        </p>
      </div>

      {mockCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCertificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-lg border border-border bg-background p-8 hover:shadow-lg transition-all"
            >
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {cert.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Issued on {new Date(cert.issuedAtUtc).toLocaleDateString()}
              </p>

              <div className="flex gap-3">
                <button className="flex-1 rounded-lg bg-primary text-white px-4 py-2 font-medium hover:bg-primary/90 transition-colors text-sm">
                  View
                </button>
                <button className="flex-1 rounded-lg border border-border text-foreground px-4 py-2 font-medium hover:bg-muted-background transition-colors text-sm">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
          <p className="text-2xl font-bold text-foreground mb-2">
            No certificates yet
          </p>
          <p className="text-muted-foreground mb-6">
            Complete courses to earn your certificates
          </p>
          <Link
            href="/app/programs"
            className="inline-block rounded-lg bg-primary text-white px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
          >
            Continue Learning
          </Link>
        </div>
      )}
    </div>
  );
}
