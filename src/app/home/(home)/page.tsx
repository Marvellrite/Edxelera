'use client';

import { Button } from '@/components/ui/button';
import { mock_data as continueLearningData } from './continue_learning_mock_data';
import { mock_data as recommendations } from './also_like_mock_data';
import { mock_data as recentlyViewed } from './recently_viewed_mock_data';
import CourseCard from '../components/course-card';
import StreakDisplay from '@/components/features/streak-display';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import Image from 'next/image';

const momentumStats = [
   { label: 'Hours this week', value: '11.5h' },
   { label: 'Lessons completed', value: '16' },
   { label: 'Current streak', value: '2 days' },
];

const Page: React.FC = () => {
   return (
      <section className="relative space-y-8 overflow-hidden px-4 pb-12 pt-8 sm:px-6 lg:space-y-10 lg:px-8 lg:pt-10">
         <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(65%_48%_at_4%_0%,color-mix(in_srgb,var(--primary)_22%,transparent),transparent),radial-gradient(52%_42%_at_95%_4%,color-mix(in_srgb,var(--secondary)_18%,transparent),transparent)]" />

         <header className="grid gap-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-overlay)] p-5 shadow-[var(--shadow-elevated)] backdrop-blur-sm lg:grid-cols-[1.2fr_1fr] lg:items-end lg:p-7">
            <div className="space-y-4">
               <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-subtle)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  <Sparkles className="size-3.5 text-[var(--secondary)]" /> Momentum dashboard
               </p>
               <div>
                  <h1 className="text-2xl font-semibold leading-tight text-[var(--text-strong)] sm:text-3xl">
                     Welcome back, Nkechi 👋
                  </h1>
                  <p className="mt-2 max-w-xl text-sm text-[var(--text-muted)] sm:text-base">
                     You&apos;re making strong progress in Product Design. Keep your streak alive and finish your current module today.
                  </p>
               </div>
               <div className="flex flex-wrap gap-2.5">
                  <Button className="h-11 rounded-full px-5 text-sm font-medium">
                     Continue learning <ArrowRight className="size-4" />
                  </Button>
                  <Button variant="outline" className="h-11 rounded-full border-[var(--secondary-300)] px-5 text-[var(--secondary-700)] hover:bg-[var(--surface-tint-red)] dark:text-[var(--secondary-800)]">
                     Review weekly goals
                  </Button>
               </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
               {momentumStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4 shadow-[var(--shadow-card)]">
                     <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-soft)]">{stat.label}</p>
                     <p className="mt-1 text-2xl font-semibold text-[var(--text-strong)]">{stat.value}</p>
                  </div>
               ))}
            </div>
         </header>

         <section className="grid gap-4 lg:grid-cols-[1.1fr_1.5fr]">
            <StreakDisplay />
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4 shadow-[var(--shadow-card)] sm:p-5">
               <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                     <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary-500)]">High Priority</p>
                     <h2 className="text-xl font-semibold text-[var(--text-strong)]">Continue learning</h2>
                     <p className="text-sm text-[var(--text-muted)]">Pick up where you left off and complete the next lesson.</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface-tint-red)] px-3 py-1 text-xs font-medium text-[var(--secondary-700)]">
                     <Flame className="size-3.5" /> Action now
                  </span>
               </div>
               <div className="grid gap-4 sm:grid-cols-2">
                  {continueLearningData.map((course, index) => (
                     <CourseCard
                        key={`${course.title}-${index}`}
                        _id={`continue-${index}`}
                        posterSrc={course.posterSrc}
                        title={course.title}
                        duration={course.duration}
                        price="150000"
                        rating={4.7 - index * 0.3}
                        variant="featured"
                     />
                  ))}
               </div>
            </div>
         </section>

         <section className="rounded-3xl border border-[var(--border-featured)] bg-[var(--surface-featured)] p-4 shadow-[var(--shadow-card)] sm:p-6">
            <div className="mb-5 flex items-end justify-between gap-3">
               <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-discovery)]">Curated for you</p>
                  <h3 className="text-xl font-semibold text-[var(--text-strong)]">You may also like</h3>
               </div>
               <Button variant="ghost" className="rounded-full border border-[var(--border-featured)] px-4 text-[var(--accent-discovery)] hover:bg-[var(--accent-discovery-soft)]">
                  See all
               </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
               {recommendations.map((course, index) => (
                  <CourseCard key={`${course.title}-${index}`} {...course} hideCta variant="default" />
               ))}
            </div>
         </section>

         <section className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4 shadow-[var(--shadow-card)] sm:p-6">
            <div className="mb-5 flex items-end justify-between gap-3">
               <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--secondary-600)]">Editorial history</p>
                  <h3 className="text-xl font-semibold text-[var(--text-strong)]">Recently viewed</h3>
               </div>
               <Button variant="ghost" className="rounded-full border border-[var(--border-soft)] px-4 text-[var(--text-muted)] hover:bg-[var(--surface-subtle)]">
                  View archive
               </Button>
            </div>
            <div className="grid gap-3">
               {recentlyViewed.map((course, index) => (
                  <div key={`${course.title}-${index}`} className="flex items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-subtle)] p-3">
                     <div className="h-16 w-24 overflow-hidden rounded-lg">
                        <Image src={course.posterSrc} alt={course.title} width={96} height={64} className="h-full w-full object-cover" />
                     </div>
                     <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-semibold text-[var(--text-strong)]">{course.title}</p>
                        <p className="text-xs text-[var(--text-muted)]">{course.duration} • Last viewed 2 days ago</p>
                     </div>
                     <Button variant="outline" className="h-9 rounded-full px-3 text-xs">Resume</Button>
                  </div>
               ))}
            </div>
         </section>
      </section>
   );
};

export default Page;
