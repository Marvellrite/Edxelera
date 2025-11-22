import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface VideoCardProps {
   // Define any props if needed in the future
   posterSrc?: string;
   title: string;
   starting_date: string;
   current_duration: string;
   progress: number;
}

const Ongoing_course: React.FC<VideoCardProps> = ({
   posterSrc,
   title,
   starting_date,
   current_duration,
   progress,
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
            <span className=" font-normal">Started on {starting_date}</span>
         </div>
         <div className=" mb-2">
            <Progress value={progress} />
         </div>
         <div className=" text-xs font-normal mb-4">{current_duration}</div>
         <div className=" ">
            <Button className=" w-full hover:cursor-pointer grow rounded-[500] h-[45px] text-[14px] font-medium ">
               Continue Learning
            </Button>
         </div>
      </div>
   );
};

export default Ongoing_course;
