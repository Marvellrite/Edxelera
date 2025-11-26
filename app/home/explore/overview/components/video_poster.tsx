'use client';
import Link from 'next/link';
import StarRating from '@/app/home/components/ratings';
import React from 'react';
import { ReactSVG } from 'react-svg';
import formatMoney from '@/utils/formatMoney';

const Video_poster = () => {
   return (
      <div className="flex gap-x-5 gap-y-4 py-10 md:h-[371px]  grow items-center max-md:flex-col max-md:pt-0">
         <div className=" w-full grow max-md:px-5 md:basis-1/2 ">
            <h1 className=" text-[40px] font-medium mb-2.5 max-sm:text-[24px] leading-[120%]">
               Product Design (UI/UX)
            </h1>
            <div className=" text-[28px] font-medium mb-1">
               &#8358;{formatMoney(150000)}
            </div>
            <div className=" mb-1 flex items-center gap-1">
               <span>5.0</span>
               <span>
                  <StarRating value={3} max={5} readOnly />
               </span>
            </div>
            <div className="grid grid-cols-[repeat(2,auto)] grid-rows-2 gap-x-5 gap-y-3">
               <div className=" flex">
                  <ReactSVG src="/icons/user-tag.svg" />{' '}
                  <span>Utange Kevin</span>
               </div>
               <div className=" flex ">
                  <ReactSVG src="/icons/video-square.svg" />{' '}
                  <span>Starts August 15th</span>
               </div>
               <div className=" flex">
                  <ReactSVG src="/icons/video-square.svg" />{' '}
                  <span>8 Weeks</span>
               </div>

               <div className=" flex">
                  <ReactSVG src="/icons/students-enrolled.svg" />{' '}
                  <span>137 students enrolled</span>
               </div>
            </div>
            <Link
               href={'#'}
               className=" mt-7 bg-primary text-accent-foreground flex items-center justify-center rounded-[500px] px-2.5 py-3 w-[292px] h-[45px] max-md:hidden"
            >
               <span>Purchase Course</span>
            </Link>
         </div>
         <div className="grow max-md:order-first basis-1/2 ">
            <img
               src="/assets/poster3.jpg"
               alt="Course Poster"
               className="  max-md:aspect-430/198  max-[1050]:aspect-560/500 aspect-560/371 object-cover w-full rounded-lg "
            />
         </div>
      </div>
   );
};

export default Video_poster;
