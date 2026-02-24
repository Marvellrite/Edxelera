"use client"

import { useState } from 'react';
import formatMoney from '@/utils/formatMoney';
import Rating from '@/components/common/rating';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
      <div className="grow border border-neutral-200 rounded-xl p-4 shadow-premium-sm hover:shadow-premium-md hover:-translate-y-1 transition-all duration-200 ease-out">
         {/* The Video Info Card */}
         <div className="h-[150px] relative rounded-lg overflow-hidden">
            <Image
               className="object-cover"
               src={posterSrc}
               alt="Video Poster Image"
               fill
            />
         </div>
         <div className={cn("flex flex-col mt-4 gap-1", !hideCta && "mb-3")}>
            <span className="text-lg font-semibold text-neutral-900 line-clamp-2">{title}</span>
            <span className="font-bold text-base text-primary">
               &#8358;{formatMoney(price)}
            </span>
            <span className="text-sm text-neutral-600">{duration}</span>
            <div className="mt-2 flex items-center gap-1">
               <span className="font-semibold text-sm text-neutral-700">{ratingVal.toFixed(1)}</span>
               <span className="-mt-0.5">
                  <Rating onChange={setRatingVal} value={ratingVal} />
               </span>
            </div>
         </div>

         {
         !hideCta &&
         <div className="hidden md:block pt-2">
            <Link
               href={`/home/explore/overview/${_id}`}
               className="hover:cursor-pointer w-full rounded-lg h-11 text-sm font-medium text-center bg-primary text-white flex items-center justify-center shadow-premium-sm hover:shadow-premium-md hover:bg-primary-700 transition-all duration-200"
            >
               Get Course
            </Link>
         </div>
         }
      </div>
   );
};

export default Video_card;
