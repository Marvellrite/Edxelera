'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Review from '../../../app/home/explore/overview/[_id]/components/review';
import CourseModulesAccordion, {
   type CourseModulesAccordionItem,
} from '../../../app/home/explore/overview/[_id]/components/course_modules_accordion';

const DEFAULT_MODULE_LESSON = {
   title: 'What is UX design? What is UI design? How do they work?',
   contentType: 'Video Lesson',
   iconSrc: '/icons/video-square.svg',
} as const;

const createLessons = (count: number) =>
   Array.from({ length: count }, () => ({ ...DEFAULT_MODULE_LESSON }));

const COURSE_MODULE_ITEMS: CourseModulesAccordionItem[] = [
   {
      value: 'item-1',
      title: 'WEEK 1 - Introduction & Foundations',
      iconVariant: 'note',
      lessons: createLessons(5),
   },
   {
      value: 'item-2',
      title: 'WEEK 2 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-3',
      title: 'WEEK 3 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-4',
      title: 'WEEK 4 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-5',
      title: 'WEEK 5 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-6',
      title: 'WEEK 6 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-7',
      title: 'WEEK 7 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
   {
      value: 'item-8',
      title: 'WEEK 8 - Introduction & Foundations',
      iconVariant: 'svg-note',
      lessons: createLessons(5),
   },
];

export default function CourseDetailsSections() {
   const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
   const overviewRef = useRef<HTMLDivElement | null>(null);
   const modulesRef = useRef<HTMLDivElement | null>(null);
   const reviewsRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const syncOverviewExpansionForViewport = () => {
         const isDesktop = window.matchMedia('(min-width: 769px)').matches;
         setIsOverviewExpanded(isDesktop);
      };

      syncOverviewExpansionForViewport();
      window.addEventListener('resize', syncOverviewExpansionForViewport);

      return () => {
         window.removeEventListener('resize', syncOverviewExpansionForViewport);
      };
   }, []);

   return (
      <div className=" space-y-7 max-md:px-4 relative max-md:mt-10">
         <div>
            <div ref={overviewRef}>
               <p className="md:hidden text-neutral-800 mb-3">Overview</p>
               <p
                  className={` text-md font-normal animate-in ${isOverviewExpanded ? '' : 'line-clamp-3'}`}
               >
                  This course is a hands-on introduction to the full spectrum of
                  product design, combining UX strategy with UI execution. You
                  will learn how to research user needs, define problems, design
                  intuitive user flows, and bring ideas to life with stunning
                  interfaces using Figma. By the end of the course, you will
                  have the skills to create user-centered digital products and a
                  portfolio to showcase your work.{' '}
                  <Button
                     onClick={() => setIsOverviewExpanded(false)}
                     variant="link"
                     className=" hover:no-underline p-0 md:hidden"
                  >
                     read less
                  </Button>
               </p>
               {!isOverviewExpanded && (
                  <Button
                     onClick={() => setIsOverviewExpanded(true)}
                     variant="link"
                     className=" hover:no-underline p-0"
                  >
                     read more
                  </Button>
               )}
            </div>
            <div ref={modulesRef} className=" mt-3.5 ">
               <p className="md:hidden text-neutral-800 mb-1">Modules</p>
               {/* To contain the accordion */}
               <CourseModulesAccordion items={COURSE_MODULE_ITEMS} />
            </div>
            <div className=" mt-10 ">
               <p className="md:hidden text-neutral-800">Reviews</p>

               <div
                  ref={reviewsRef}
                  className=" flex gap-x-3 overflow-x-auto scroll-smooth mt-3.5"
               >
                  <Review />
                  <Review />
                  <Review />
                  <Review />
                  <Review />
                  <Review />
               </div>
            </div>
         </div>
      </div>
   );
}
