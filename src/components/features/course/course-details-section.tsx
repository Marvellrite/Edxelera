'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Review from '@/components/features/course/review';
import CourseModulesAccordion from '@/components/features/course/course_modules_accordion';
import COURSE_MODULE_ITEMS from '@/mockdata/course/details-mockdata';
import RelatedChips from '@/components/features/course/related-chips';
import WhatYouWillLearn from '@/components/features/course/what-you-will-learn';


export default function CourseDetailsSections() {
   const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
   const descriptionRef = useRef<HTMLDivElement | null>(null);
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
      <div className=" space-y-7 max-md:px-4 relative mt-6 ">
         <div>
            <div ref={descriptionRef}>
               <p className=" text-primary mb-3">Description</p>
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

            <div className='mt-10'>
               <RelatedChips
                  items={["Graphic Design", "Product Design", "Branding", "Data Analytics", "Corporate Design"]}
                  selected="Branding"
                  onSelect={(v) => console.log(v)}
                  />
            </div>
            <div ref={modulesRef} className=" mt-10 ">
               <p className=" text-primary mb-3">Modules</p>
               {/* To contain the accordion */}
               <CourseModulesAccordion items={COURSE_MODULE_ITEMS} />
            </div>
            <div className='mt-10'>
               <WhatYouWillLearn/>
            </div>
            <div className=" mt-10 ">
               <p className=" text-primary">Reviews</p>

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
