import React from 'react';
import { Button } from '@/components/ui/button';
import formatMoney from '@/utils/formatMoney';
import Ratings from './ratings';

interface VideoCardProps {
   // Define any props if needed in the future
   posterSrc?: string;
   title: string;
   price: string;
   duration: string;
   rating: number;
}

const Video_card: React.FC<VideoCardProps> = ({
   posterSrc,
   title,
   price,
   duration,
   rating,
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
            <span className=" font-bold text-md">
               &#8358;{formatMoney(price)}
            </span>
            <span>{duration}</span>
            <div className="  mt-2 flex items-center">
               <span className="font-normal text-[14px]">{rating}</span>
               <span className=" grow">
                  <Ratings></Ratings>
               </span>
            </div>
         </div>
         <div className=" hidden md:block">
            <Button className=" hover:cursor-pointer w-full rounded-[500] h-[45px] text-[14px] font-medium ">
               Get Course
            </Button>
         </div>
      </div>
   );
};

export default Video_card;
