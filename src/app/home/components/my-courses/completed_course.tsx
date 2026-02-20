import React from 'react';
import { Button } from '@/components/ui/button';

interface VideoCardProps {
   // Define any props if needed in the future
   posterSrc?: string;
   title: string;
   completion_date: string;
}

const Completed_course: React.FC<VideoCardProps> = ({
   posterSrc,
   title,
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
            <span className=" font-normal">Completed on {completion_date}</span>
         </div>
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
      </div>
   );
};

export default Completed_course;
