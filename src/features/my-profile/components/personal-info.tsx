import { User } from "@/components/icons/modified";
import ProfileLinks from "./profile-links";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProfileSummaryProps, PersonalInfoProps } from "../types/profile";
import { MapPin, Calendar, Mail } from "lucide-react";

export function ProfileSummary({
  name,
  email,
  dateOfBirth,
  location,
  dateJoined,
  bio,
}: ProfileSummaryProps) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card)] sm:p-6">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        Personal Information
      </p>

      {/* Avatar + name + edit row */}
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-100)] border border-[var(--primary-200)]">
            <User />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-strong)]">{name}</h1>
            <span className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] mt-0.5">
              <Mail className="size-3.5 shrink-0" strokeWidth={2} />
              {email}
            </span>
          </div>
        </div>

        <Button
          className="h-10 rounded-xl border border-[var(--border-strong)] bg-transparent px-5 text-sm font-semibold text-[var(--text-strong)] hover:bg-[var(--surface-subtle)] transition-colors"
          asChild
          variant="outline"
        >
          <Link href="/home/my-profile/edit-profile">Edit Profile</Link>
        </Button>
      </div>

      {/* Meta details */}
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--border-soft)] pt-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-[var(--text-muted)] shrink-0" strokeWidth={1.75} />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">Date of Birth</p>
            <p className="text-sm font-medium text-[var(--text-strong)]">{dateOfBirth}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-[var(--text-muted)] shrink-0" strokeWidth={1.75} />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">Location</p>
            <p className="text-sm font-medium text-[var(--text-strong)]">{location}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-[var(--text-muted)] shrink-0" strokeWidth={1.75} />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">Member Since</p>
            <p className="text-sm font-medium text-[var(--text-strong)]">{dateJoined}</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      {bio && (
        <div className="mt-5 border-t border-[var(--border-soft)] pt-5">
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">Bio</p>
          <p className="text-sm leading-relaxed text-[var(--text-base)]">{bio}</p>
        </div>
      )}
    </div>
  );
}

export default function PersonalInfo({
  linksTitle,
  links,
  ...profileSummary
}: PersonalInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-[1fr_300px] lg:gap-x-5 lg:gap-y-0 lg:items-start">
      <ProfileSummary {...profileSummary} />
      <ProfileLinks title={linksTitle} items={links} />
    </div>
  );
}
