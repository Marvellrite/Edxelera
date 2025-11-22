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
      <div className=" grow  border border-neutral-400 rounded-lg p-3.5 hover:shadow-lg transition-shadow duration-300 ease-in-out">
         {/* The Video Info Card */}
         <div className=" h-[150px]">
            <img
               className=" w-full h-full object-cover rounded-lg "
               src={posterSrc}
               alt="Video Poster Image"
            />
         </div>
         <div className=" flex flex-col  mt-2 mb-3">
            <span className=" text-lg">{title}</span>
            {status === 'Ongoing' ? (
               <span className=" font-normal">Started on {starting_date}</span>
            ) : (
               <span className=" font-normal">
                  Completed on {completion_date}
               </span>
            )}
         </div>
         {status === 'Ongoing' ? (
            <>
               <div className=" mb-2">
                  <Progress value={progress} />
               </div>
               <div className=" text-xs font-normal mb-4">
                  {current_duration}
               </div>
               <div className=" ">
                  <Button className=" w-full hover:cursor-pointer grow rounded-[500] h-[45px] text-[14px] font-medium ">
                     Continue Learning
                  </Button>
               </div>
            </>
         ) : (
            <div className=" flex gap-2">
               <Button
                  variant={'outline'}
                  className=" hover:cursor-pointer grow rounded-[500] h-[45px] text-[14px] font-medium text-primary border-primary"
               >
                  Revisit Course
               </Button>
               <Button className=" hover:cursor-pointer grow rounded-[500] h-[45px] text-[14px] font-medium ">
                  Get Certificate
               </Button>
            </div>
         )}
      </div>
   );
};

export default My_course;
