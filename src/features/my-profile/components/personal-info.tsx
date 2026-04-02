import { User } from '@/components/icons/modified';
import { Pencil } from 'lucide-react';
import ProfileLinks from './profile-links';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProfileSummaryProps, PersonalInfoProps } from '../types/profile';

export function ProfileSummary({
   name,
   email,
   dateOfBirth,
   location,
   dateJoined,
   bio,
}: ProfileSummaryProps) {
   const stats = [
      { label: 'Courses completed', value: '12' },
      { label: 'Certificates', value: '4' },
      { label: 'Total learning hours', value: '124h' },
   ];

   return (
      <div className="space-y-5">
         <div className="rounded-3xl border border-[var(--border-subtle)] bg-[linear-gradient(150deg,var(--surface-overlay),var(--surface-tint-blue))] p-5 shadow-[var(--shadow-card)] lg:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
               <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex size-24 items-center justify-center rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-raised)] text-[var(--primary)] shadow-[var(--shadow-soft)]">
                     <User />
                  </div>
                  <div className="space-y-1">
                     <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">Learner profile</p>
                     <h1 className="text-2xl font-semibold text-[var(--text-strong)]">{name}</h1>
                     <p className="text-sm text-[var(--text-muted)]">{email}</p>
                     <Button asChild className="mt-2 h-10 rounded-full px-4 text-sm">
                        <Link href={'/home/my-profile/edit-profile'}><Pencil className="size-4" /> Edit profile</Link>
                     </Button>
                  </div>
               </div>

               <div className="grid grid-cols-3 gap-2">
                  {stats.map((stat) => (
                     <div key={stat.label} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-3 text-center">
                        <p className="text-lg font-semibold text-[var(--text-strong)]">{stat.value}</p>
                        <p className="text-[11px] text-[var(--text-soft)]">{stat.label}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-semibold text-[var(--text-strong)]">Personal information</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
               <Info label="Date of Birth" value={dateOfBirth} />
               <Info label="Location" value={location} />
               <Info label="Date Joined" value={dateJoined} />
            </div>
            <div className="mt-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-subtle)] p-4">
               <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-soft)]">Bio</p>
               <p className="mt-2 text-sm leading-relaxed text-[var(--text-default)]">{bio}</p>
            </div>
         </div>
      </div>
   );
}

const Info = ({ label, value }: { label: string; value: string }) => (
   <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-subtle)] p-3">
      <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-soft)]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[var(--text-strong)]">{value}</p>
   </div>
);

export default function PersonalInfo({ linksTitle, links, ...profileSummary }: PersonalInfoProps) {
   return (
      <div className="grid grid-cols-1 gap-y-6">
         <ProfileSummary {...profileSummary} />
         <ProfileLinks title={linksTitle} items={links} />
      </div>
   );
}
