import { Rating } from '@/components/common';
import Image from 'next/image';

import React from 'react';

const Review = () => {
   return (
      <div className=" min-w-78 p-4 rounded-sm border border-neutral-50 flex-0 bg-foreground">
         <div className="flex gap-2">
            <Image
               className=" size-10 rounded-full"
               src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340431/repo-images/public/assets/person_1.png"
               alt="Student Image"
               width={40}
               height={40}
            />
            <div className="flex flex-col gap-0.5">
               <div>David Leebari</div>
               <div className=" flex items-center gap-x-2">
                  <span>5.0</span>
                  <div className=" -mt-1">
                     <Rating max={5} value={3} />{' '}
                  </div>
               </div>
            </div>
         </div>
         <p className=" text-neutral-800 text-balance">
            “I wasn&apos;t expecting the community to be so active! Sharing my
            designs and getting constructive feedback from other learners helped
            me grow faster than I thought possible”
         </p>
      </div>
   );
};

export default Review;
