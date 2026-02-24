'use client';
import Link from 'next/link';
import formatMoney from '@/utils/formatMoney';
import { Button } from '@/components/ui/button';
import CourseMetaBar from '@/components/features/course/courseMetaBar';
import Image from 'next/image';
import { CourseMode } from '@/types/course';

interface CourseHeroContentProps {
   mode: CourseMode
}


function CourseHeroContent({mode}:CourseHeroContentProps) {
   return (
      <div className=" w-full grow max-md:px-5 @[1014px]:basis-1/2 ">
         <h1 className=" text-[40px] font-medium @max-sm:text-[24px] leading-[120%]">
            Product Design (UI/UX)
         </h1>

         <div className='text-primary font-semibold text-[20px] lg:text-[28px] mt-3 '>₦150,000.00 </div>

         <p className='mt-2.5'>
            This course is a hands-on introduction to the full spectrum of
            product design, combining UX strategy with UI execution.
         </p>
         {
            mode === 'marketing'?
         <Button className=" w-73 hidden lg:inline-flex mt-7" >
               <span>Add to Cart</span> <span>(&#8358;{formatMoney(150000)})</span>
         </Button>:
            mode=== 'waiting'?
          <Button
              
               className="  mt-7 bg-neutral-100 hover:bg-neutral-100 text-neutral font-medium flex items-center justify-center rounded-[500px] px-2.5  w-[292px] max-md:hidden"
            >
               <span>Course Starts in <span>36:48:32</span></span>
            </Button>:
            mode==='live'?
            <Button className=" w-73 hidden lg:inline-flex mt-7" >
               Go to Course
         </Button>:
            <Button
              
               className="  mt-7 bg-neutral-100 hover:bg-neutral-100 text-neutral font-medium flex items-center justify-center rounded-[500px] px-2.5 w-[292px] max-md:hidden"
            >
               <span>Cohort has ended</span>
            </Button>
         }
      </div>
   );
}

function CourseHeroMedia() {
   return (
      <div className="relative order-first w-full overflow-hidden rounded-none aspect-430/198 @[1014px]:order-0 @[1014px]:basis-1/2 @[1014px]:aspect-533/301 @[1014px]:rounded-lg">
         <Image
            src="/assets/poster3.jpg"
            alt="Course Poster"
            className="object-cover"
            fill
            sizes="(min-width: 1014px) 50vw, 100vw"
         />
      </div>
   );
}

export default function CourseHeroSection({mode}:{mode: CourseMode}) {
   return (
      <div>
         <div className="flex gap-x-5 gap-y-4 py-10 grow items-center flex-col @[1014px]:flex-row max-md:pt-0 pt-0">
            <CourseHeroContent mode={mode} />
            <CourseHeroMedia />
         </div>
         <div className=" w-full">
            <CourseMetaBar className=" mx-auto" />
         </div>
      </div>
   );
}
