'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Sparkles, TrendingUp } from 'lucide-react';
import { mock_data } from '../mock_data';
import CourseCard from '@/app/home/components/course-card';

const categories = ['All', 'Design', 'Marketing', 'Business', 'Development', 'AI'];

const Page: React.FC = () => {
   const [activeCategory, setActiveCategory] = useState('All');

   return (
      <section className="space-y-6 px-4 pb-12 pt-8 sm:px-6 lg:space-y-8 lg:px-8 lg:pt-10">
         <header className="rounded-3xl border border-[var(--border-featured)] bg-[linear-gradient(150deg,var(--surface-featured),var(--surface-overlay))] p-5 shadow-[var(--shadow-card)] lg:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
               <div className="max-w-2xl space-y-3">
                  <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border-featured)] bg-[var(--accent-discovery-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-discovery)]">
                     <Sparkles className="size-3.5" /> Discovery hub
                  </p>
                  <h1 className="text-2xl font-semibold text-[var(--text-strong)] sm:text-3xl">Explore new courses</h1>
                  <p className="text-sm text-[var(--text-muted)] sm:text-base">Discover fresh paths, trending cohorts, and curated tracks matched to your growth goals.</p>
               </div>
               <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-soft)]">Trending now</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-[var(--text-strong)]"><TrendingUp className="size-4 text-[var(--secondary)]" /> UX Strategy • 3,104 learners</p>
               </div>
            </div>
         </header>

         <section className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4 shadow-[var(--shadow-card)] sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row">
               <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-subtle)] px-4 focus-within:ring-2 focus-within:ring-[var(--ring)]">
                  <Search className="size-4 text-[var(--text-soft)]" />
                  <input className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-soft)]" placeholder="Search for a skill, topic, or instructor" />
               </div>
               <select className="h-11 rounded-full border border-[var(--border-soft)] bg-[var(--surface-subtle)] px-4 text-sm text-[var(--text-default)] outline-none focus:ring-2 focus:ring-[var(--ring)]">
                  <option>Most relevant</option>
                  <option>Highest rated</option>
                  <option>Price: Low to high</option>
                  <option>Newest</option>
               </select>
               <Button variant="outline" className="h-11 rounded-full px-4"><SlidersHorizontal className="size-4" /> Filters</Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
               {categories.map((item) => (
                  <button
                     key={item}
                     onClick={() => setActiveCategory(item)}
                     className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                        activeCategory === item
                           ? 'border-[var(--accent-discovery)] bg-[var(--accent-discovery-soft)] text-[var(--accent-discovery)]'
                           : 'border-[var(--border-soft)] bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:bg-[var(--surface-featured)]'
                     }`}
                  >
                     {item}
                  </button>
               ))}
            </div>
         </section>

         <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mock_data.map((course, idx) => (
               <CourseCard key={`${course.title}-${idx}`} {...course} hideCta variant="default" />
            ))}
         </section>

         <section className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-overlay)] p-3 shadow-[var(--shadow-soft)]">
            {['Prev', '1', '2', '3', '4', '5', 'Next'].map((item, idx) => (
               <button
                  key={item}
                  className={`h-9 rounded-full px-3 text-sm ${
                     idx === 3
                        ? 'bg-[var(--primary)] text-white'
                        : 'border border-[var(--border-soft)] bg-[var(--surface-raised)] text-[var(--text-muted)] hover:bg-[var(--surface-subtle)]'
                  }`}
               >
                  {item}
               </button>
            ))}
         </section>
      </section>
   );
};

export default Page;
