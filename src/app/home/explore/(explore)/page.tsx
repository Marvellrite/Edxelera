'use client';

import { useState } from 'react';
import CourseList from './components/course-list';
import IsSearching from './components/is-searching';
import CourseNotFound from './components/search-not-found';
import SearchIsFound from './components/search-is-found';
import { Pagination } from '@/components/common';

const Page: React.FC = () => {
   const [isSearching] = useState(false);
   const [isNotFound] = useState(false);
   const [isFound] = useState(false);

   return (
      <div className="px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10 space-y-8">

         {/* Discovery hero banner */}
         <div className="relative overflow-hidden rounded-2xl border border-[var(--border-discovery)] bg-[var(--surface-discovery)] px-5 py-6 sm:px-7 sm:py-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_80%_at_0%_100%,var(--accent-discovery-soft),transparent)]" />
            <div className="relative">
               <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-discovery)]">
                  Browse all courses
               </p>
               <h1 className="mt-1 text-2xl font-bold text-[var(--text-strong)] sm:text-3xl">
                  Explore Courses
               </h1>
               <p className="mt-2 text-sm text-[var(--text-muted)] max-w-lg leading-relaxed">
                  Discover a wide range of courses tailored to expand your skills. Find the perfect course to advance your learning goals.
               </p>
            </div>
         </div>

         {/* Content area */}
         {isSearching ? (
            <IsSearching />
         ) : isFound ? (
            <SearchIsFound />
         ) : isNotFound ? (
            <CourseNotFound />
         ) : (
            <div className="space-y-6">
               <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card)] sm:p-6">
                  <CourseList />
               </div>
               <div className="flex justify-center">
                  <Pagination />
               </div>
            </div>
         )}
      </div>
   );
};

export default Page;
