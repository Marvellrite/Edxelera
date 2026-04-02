import Video_card from '@/app/home/components/course-card';
import React from 'react';
import { mock_data as mock_data_al } from '../../mock_data';

const CourseList = () => {
   return (
      <section className="space-y-5">
         <div className="flex items-center justify-between gap-3">
            <div>
               <h2 className="text-base font-bold text-[var(--text-strong)] sm:text-lg">
                  All Courses
               </h2>
               <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                  {mock_data_al.length} courses available
               </p>
            </div>
         </div>

         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {mock_data_al.map((data, index) => (
               <Video_card key={index} hideCta={true} {...data} variant="compact" />
            ))}
         </div>
      </section>
   );
};

export default CourseList;
