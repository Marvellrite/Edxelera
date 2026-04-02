'use client';

import { mock_data } from '../(home)/continue_learning_mock_data';
import { mock_data as mock_data_al } from '../(home)/also_like_mock_data';
import Video_card from './course-card';
import Continue_learning_mobile from './continue_learning_mobile';
import SeeAllButton from '@/components/ui/see-all-btn';
import StreakDisplay from '@/components/features/streak-display';
import { BookOpen, TrendingUp, Star } from 'lucide-react';

function QuickStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
   return (
      <div className="flex flex-col items-center gap-1 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 min-w-[68px]">
         <span className="text-[var(--primary-500)]">{icon}</span>
         <span className="text-lg font-bold leading-none text-[var(--text-strong)]">{value}</span>
         <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">{label}</span>
      </div>
   );
}

function DashboardHero() {
   return (
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-featured)] bg-[var(--surface-featured)] px-5 py-6 sm:px-7 sm:py-7">
         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_80%_at_100%_0%,var(--surface-tint-blue),transparent)]" />
         <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
               <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-100)] border border-[var(--primary-200)] text-[var(--primary-500)] font-bold text-xl select-none">
                  NJ
               </div>
               <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Welcome back</p>
                  <h1 className="mt-0.5 text-xl font-bold leading-tight text-[var(--text-strong)] sm:text-2xl">Nkechi Johnson</h1>
                  <p className="mt-0.5 text-sm text-[var(--text-muted)]">Keep building momentum — your next lesson awaits.</p>
               </div>
            </div>
            <div className="flex items-center gap-3 sm:shrink-0">
               <QuickStat icon={<BookOpen className="size-4" strokeWidth={2} />} label="Enrolled" value="3" />
               <QuickStat icon={<TrendingUp className="size-4" strokeWidth={2} />} label="In Progress" value="2" />
               <QuickStat icon={<Star className="size-4" strokeWidth={2} />} label="Completed" value="1" />
            </div>
         </div>
      </div>
   );
}

function SectionHeader({
   eyebrow,
   title,
   subtitle,
   href,
}: {
   eyebrow?: string;
   title: string;
   subtitle?: string;
   href?: string;
}) {
   return (
      <div className="mb-5 flex items-end justify-between gap-3">
         <div>
            {eyebrow && (
               <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--primary-500)]">
                  {eyebrow}
               </p>
            )}
            <h2 className="text-lg font-bold leading-tight text-[var(--text-strong)] sm:text-xl">{title}</h2>
            {subtitle && (
               <p className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed">{subtitle}</p>
            )}
         </div>
         {href ? <SeeAllButton href={href} /> : <SeeAllButton />}
      </div>
   );
}

export default function HomeDashboard() {
   const data = mock_data;

   return (
      <section className="px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10 space-y-8">

         <DashboardHero />

         <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card)] sm:p-6">
            <SectionHeader
               eyebrow="Keep the momentum"
               title="Continue your learning journey"
               subtitle="Pick up right where you left off."
            />
            <div className="flex flex-col gap-5 lg:flex-row">
               <div className="lg:w-72 shrink-0">
                  <StreakDisplay />
               </div>
               <div className="flex-1 min-w-0">
                  <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                     Current courses
                  </p>
                  <Continue_learning_mobile data={data} />
               </div>
            </div>
         </div>

         <div className="rounded-2xl border border-[var(--border-discovery)] bg-[var(--surface-discovery)] p-5 shadow-[var(--shadow-card)] sm:p-6">
            <SectionHeader
               eyebrow="Curated for you"
               title="You may also like"
               subtitle="Handpicked based on your learning activity and interests."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
               {mock_data_al.map((item, index) => (
                  <Video_card key={index} hideCta {...item} />
               ))}
            </div>
         </div>

         <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-subtle)] p-5 shadow-[var(--shadow-soft)] sm:p-6">
            <SectionHeader
               title="Recently viewed"
               subtitle="Jump back into courses you explored before."
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
               {mock_data_al.map((item, index) => (
                  <Video_card key={index} hideCta variant="compact" {...item} />
               ))}
            </div>
         </div>

      </section>
   );
}
