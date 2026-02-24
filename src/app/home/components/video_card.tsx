"use client"

import { useState } from 'react';
import formatMoney from '@/utils/formatMoney';
import Rating from '@/components/common/rating';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface VideoCardProps {
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
      <div className="grow border border-neutral-200 rounded-2xl p-3.5 bg-white hover:shadow-[0_16px_32px_rgba(4,5,6,0.08)] hover:-translate-y-1 transition-all duration-200 ease-out">
         <div className="h-[168px] relative">
            <Image
               className="object-cover rounded-xl"
               src={posterSrc}
               alt="Video Poster Image"
               fill
            />
         </div>
         <div className={cn("flex flex-col mt-3 space-y-1.5", !hideCta && "mb-3")}>
            <span className="text-lg font-medium line-clamp-2 min-h-[56px]">{title}</span>
            <div className="flex items-center gap-2 text-xs text-neutral-700">
               <span className="rounded-full bg-primary/8 text-primary px-2.5 py-1">{duration}</span>
               <span className="rounded-full bg-neutral-100 px-2.5 py-1">Beginner friendly</span>
            </div>
            <span className="font-bold text-md text-primary">
               &#8358;{formatMoney(price)}
            </span>
            <div className="mt-2 flex items-center gap-1">
               <span className="font-normal text-[14px]">{ratingVal.toFixed(1)}</span>
               <span className="-mt-0.5">
                  <Rating onChange={setRatingVal} value={ratingVal} />
               </span>
            </div>
         </div>

         {
         !hideCta &&
         <div className="hidden md:block">
            <Link
               href={`/home/explore/overview/${_id}`}
               className="hover:cursor-pointer w-full rounded-full h-[45px] text-[14px] font-medium text-center bg-primary text-accent-foreground flex items-center justify-center shadow-[0_8px_20px_rgba(0,17,70,0.2)]"
            >
               <span>Get Course</span>
            </Link>
         </div>
         }
      </div>
   );
};

export default Video_card;
