"use client";

import Link from "next/link";
import { Award, Download, ExternalLink, Trophy } from "lucide-react";

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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Your Certificates</h1>
        <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          Certificates you&apos;ve earned by completing courses and programs
        </p>
      </div>

      {mockCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mockCertificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl p-6 card-hover group"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* Icon + status */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, var(--color-brand-primary-600) 0%, var(--color-brand-primary-700) 100%)",
                  }}
                >
                  <Award size={22} color="#fff" />
                </div>
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "var(--color-success-50)",
                    color: "var(--color-success-500)",
                    border: "1px solid var(--color-success-100)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
                  Earned
                </span>
              </div>

              {/* Certificate info */}
              <h3 className="text-base font-bold text-foreground mb-1">{cert.title}</h3>
              <p className="text-xs mb-5" style={{ color: "var(--color-muted-foreground)" }}>
                Issued on{" "}
                {new Date(cert.issuedAtUtc).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, var(--color-brand-primary-600) 0%, var(--color-brand-primary-700) 100%)",
                    boxShadow: "0 2px 8px rgba(0,17,70,0.2)",
                  }}
                >
                  <Download size={13} />
                  Download
                </button>
                <button
                  className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
                  style={{
                    border: "1px solid var(--color-border)",
                    color: "var(--color-foreground)",
                    backgroundColor: "var(--color-surface-raised)",
                  }}
                >
                  <ExternalLink size={13} />
                  LinkedIn
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl p-12 text-center"
          style={{
            border: "2px dashed var(--color-border)",
            backgroundColor: "var(--color-surface-raised)",
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "var(--color-brand-primary-50)" }}
          >
            <Trophy size={28} style={{ color: "var(--color-brand-primary-600)" }} />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1.5">No certificates yet</h3>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted-foreground)" }}>
            Complete courses to earn your first certificate
          </p>
          <Link
            href="/app/programs"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, var(--color-brand-primary-600) 0%, var(--color-brand-primary-700) 100%)",
              boxShadow: "0 2px 8px rgba(0,17,70,0.2)",
            }}
          >
            Continue Learning
          </Link>
        </div>
      )}
    </div>
  );
}
