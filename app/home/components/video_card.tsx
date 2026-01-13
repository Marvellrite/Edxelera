"use client"

import { useState } from 'react';
import formatMoney from '@/utils/formatMoney';
import Rating from './ratings';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils/utils';

interface VideoCardProps {
   // Define any props if needed in the future
   posterSrc: string;
   title: string;
   price: string;
   duration: string;
   rating: number;
   _id: string;
   hideCta?: boolean
}

const Video_card: React.FC<VideoCardProps> = ({
   posterSrc,
   title,
   price,
   duration,
   rating,
   hideCta=false,
   _id = '3',
}) => {
   const [ratingVal, setRatingVal] = useState<number>(rating);

   return (
      <div className=" grow  border border-neutral-400 rounded-xl p-3.5 hover:shadow-lg transition-shadow duration-300 ease-in-out">
         {/* The Video Info Card */}
         <div className=" h-[150px] relative">
            <Image
               className=" object-cover rounded-lg "
               src={posterSrc}
               alt="Video Poster Image"
               fill
            />
         </div>
         <div className={cn(" flex flex-col  mt-2 ", !hideCta && "mb-3")}>
            <span className=" text-lg">{title}</span>
            <span className=" font-bold text-md">
               &#8358;{formatMoney(price)}
            </span>
            <span>{duration}</span>
            <div className="  mt-2 flex items-center gap-1">
               <span className="font-normal text-[14px]">{ratingVal.toFixed(1)}</span>
               <span className=" -mt-0.5">
                  <Rating onChange={setRatingVal} value={ratingVal} />
               </span>
            </div>
         </div>

         {
         !hideCta &&
         <div className=" hidden md:block">
            <Link
               href={`/home/explore/overview/${_id}`}
               className=" hover:cursor-pointer w-full rounded-[500] h-[45px] text-[14px] font-medium text-center bg-primary text-accent-foreground flex items-center justify-center"
            >
               <span>Get Course</span>
            </Link>
         </div>
         }
      </div>
   );
};

export default Video_card;
