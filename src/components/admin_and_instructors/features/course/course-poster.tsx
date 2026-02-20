'use client';
import Link from 'next/link';
import StarRating from '@/components/features/course/ratings';
import { ReactSVG } from 'react-svg';
import formatMoney from '@/lib/utils/formatMoney';
import { Button } from '@/components/ui/button';
import { Teacher, UserTag, VideoSquare } from '@/components/icons/modified';
import Image from 'next/image';

const Video_poster = () => {
   return (
      <div className="flex gap-x-5 gap-y-4 pt-10 pb-3 grow items-center max-md:flex-col ">

         {/* This Component is for when the course is yet to be bought */}
         <div className=" w-full grow max-md:px-5 md:basis-1/2 ">
            <h1 className=" text-[40px] font-medium mb-2.5 max-sm:text-[24px] leading-[120%]">
               Product Design (UI/UX)
            </h1>
            <div className=" text-[28px] font-medium mb-1">
               &#8358;{formatMoney(150000)}
            </div>
            <div className=" mb-1 flex items-center gap-1">
               <span>5.0</span>
               <span className=' -mt-1'>
                  <StarRating value={3} max={5} readOnly />
               </span>
            </div>
            <div className="grid grid-cols-[repeat(2,auto)] grid-rows-2 gap-x-5 gap-y-3 *:items-center *:gap-2.5">
               <div className=" flex">
                  <UserTag/> 
                  <span>Utange Kevin</span>
               </div>
               <div className=" flex ">
                  <VideoSquare className='text-neutral-800'/>{' '}
                  <span>Starts August 15th</span>
               </div>
               <div className=" flex">
                  <VideoSquare className='text-neutral-800'/>{' '}
                  <span>8 Weeks</span>
               </div>

               <div className=" flex">
                  <Teacher className=' text-neutral-800'/>{' '}
                  <span className='-mx-1'>137 students enrolled</span>
               </div>
            </div>

            <Button asChild className=" mt-7 w-[292px] h-[45px] max-md:hidden">
            <Link
               href={'#'}
             
            >
               <span>Purchase Course</span>
            </Link>
            </Button>
         </div>
         <div className="grow max-md:order-first basis-1/2 relative h-full aspect-[560/371]">
            <Image
               fill
               src="/assets/poster3.jpg"
               alt="Course Poster"
               className="  max-md:aspect-430/198  h-full object-cover w-full rounded-lg max-md:rounded-none"
            />
         </div>
      </div>
   );
};

export default Video_poster;
