'use client';

import { StarRating } from '@/components/common';
import { ReactSVG } from 'react-svg';
import formatMoney from '@/utils/formatMoney';
import { Button } from '@/components/ui/button';
import VideoPlayer from './video-player';

const Course_poster_bought = () => {



   return (
      <div className="flex gap-x-5 gap-y-4 py-10  grow items-center max-md:flex-col max-md:pt-0 pt-0 ">
        {/* This Component is for when the course has been bought but yet to start */}
         <div className=" w-full grow max-md:px-5 md:basis-1/2 ">
            <h1 className=" text-[40px] font-medium mb-2.5 max-sm:text-[24px] leading-[120%] ">
               Product Design (UI/UX)
            </h1>
            <div className=" text-[28px] font-medium mb-1">
               &#8358;{formatMoney(150000)}
            </div>
            <div className=" mb-1 flex items-center gap-1">
               <span>5.0</span>
               <span className='-mt-0.5'>
                  <StarRating value={3} max={5} readOnly />
               </span>
            </div>
            <div className="grid grid-cols-[repeat(2,auto)] grid-rows-2 gap-x-5 gap-y-3">
               <div className=" flex">
                  <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340613/repo-images/public/icons/user-tag.svg" />{' '}
                  <span>Utange Kevin</span>
               </div>
               <div className=" flex ">
                  <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340626/repo-images/public/icons/video-square.svg" />{' '}
                  <span>Starts August 15th</span>
               </div>
               <div className=" flex">
                  <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340626/repo-images/public/icons/video-square.svg" />{' '}
                  <span>8 Weeks</span>
               </div>

               <div className=" flex">
                  <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340596/repo-images/public/icons/students-enrolled.svg" />{' '}
                  <span>137 students enrolled</span>
               </div>
            </div>
            <Button
              
               className="  mt-7 bg-neutral-100 hover:bg-neutral-100 text-neutral font-medium flex items-center justify-center rounded-[500px] px-2.5 py-3 w-[292px] h-[45px] max-md:hidden"
            >
               <span>Course Starts in <span>36:48:32</span></span>
            </Button>
         </div>
         <div className="grow max-md:order-first basis-1/2 max-md:px-4 max-md:py-5">
         <div className=' flex justify-between md:hidden h-[30px] max-md:mb-[11px] items-center'>
            <ReactSVG src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340455/repo-images/public/icons/back-arrow.svg'/>
            <div className=' text-[24px] font-medium'>Product Design (UI/UX)</div>
            <ReactSVG src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340537/repo-images/public/icons/message.svg'/>
         </div>
         <div className=' relative'>
         <VideoPlayer src='/videos/video1.mp4'/>
           
         </div>
         </div>
      </div>
   );
};



export default Course_poster_bought;
