'use client';
import Link from 'next/link';
import formatMoney from '@/utils/formatMoney';
import { Button } from '@/components/ui/button';
import CourseMetaBar from '@/components/features/course/courseMetaBar';
import Image from 'next/image';

interface Props  {
   mode: 
}

function CourseHeroContent() {
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
         <Button className=" w-73 hidden lg:inline-flex mt-7" >
               <span>Add to Cart</span> <span>(&#8358;{formatMoney(150000)})</span>
         </Button>

         }
      </div>
   );
}

function CourseHeroMedia() {
   return (
      <div className="relative order-first w-full overflow-hidden rounded-none aspect-430/198 @[1014px]:order-0 @[1014px]:basis-1/2 @[1014px]:aspect-533/301 @[1014px]:rounded-lg">
         <Image
            src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340434/repo-images/public/assets/poster3.jpg"
            alt="Course Poster"
            className="object-cover"
            fill
            sizes="(min-width: 1014px) 50vw, 100vw"
         />
      </div>
   );
}

export default function CourseHeroSection() {
   return (
      <div>
         <div className="flex gap-x-5 gap-y-4 py-10 grow items-center flex-col @[1014px]:flex-row max-md:pt-0 pt-0">
            <CourseHeroContent />
            <CourseHeroMedia />
         </div>
         <div className=" w-full">
            <CourseMetaBar className=" mx-auto" />
         </div>
      </div>
   );
}
