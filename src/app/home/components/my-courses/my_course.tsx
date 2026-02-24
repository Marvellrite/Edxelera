import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Course_status } from '../../my-courses/types';

interface VideoCardProps {
   // Define any props if needed in the future
   posterSrc?: string;
   title: string;
   starting_date?: string;
   current_duration?: string;
   progress?: number;
   completion_date?: string;
   status: Course_status;
}

const My_course: React.FC<VideoCardProps> = ({
   posterSrc,
   title,
   starting_date,
   current_duration,
   progress,
   status,
   completion_date,
}) => {
   return (
      <div className="grow border border-neutral-200 rounded-xl p-4 shadow-premium-sm hover:shadow-premium-md hover:-translate-y-1 transition-all duration-200 ease-out">
         {/* The Video Info Card */}
         <div className="h-[150px] rounded-lg overflow-hidden mb-4">
            <img
               className="w-full h-full object-cover"
               src={posterSrc}
               alt="Video Poster Image"
            />
         </div>
         <div className="flex flex-col gap-2 mb-3">
            <span className="text-lg font-semibold text-neutral-900 line-clamp-2">{title}</span>
            {status === 'Ongoing' ? (
               <span className="text-sm text-neutral-600">Started on {starting_date}</span>
            ) : (
               <span className="text-sm text-neutral-600">
                  Completed on {completion_date}
               </span>
            )}
         </div>
         {status === 'Ongoing' ? (
            <>
               <div className="mb-3">
                  <Progress value={progress} />
               </div>
               <div className="text-xs font-medium text-neutral-700 mb-4">
                  {current_duration}
               </div>
               <div>
                  <Button className="w-full rounded-lg h-11 text-sm font-medium shadow-premium-sm hover:shadow-premium-md transition-all">
                     Continue Learning
                  </Button>
               </div>
            </>
         ) : (
            <div className="flex gap-2">
               <Button
                  className='grow rounded-lg h-10 text-sm font-medium'
                  variant={'secondary'}
                  >
                  Revisit Course
               </Button>
               <Button
                  className='grow rounded-lg h-10 text-sm font-medium shadow-premium-sm hover:shadow-premium-md transition-all'>
                  Get Certificate
               </Button>
            </div>
         )}
      </div>
   );
};

export default My_course;
