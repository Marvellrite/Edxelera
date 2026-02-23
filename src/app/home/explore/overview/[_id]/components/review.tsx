import StarRating from '@/components/common/rating';

import React from 'react';

const Review = () => {
   return (
      <div className=" min-w-78 p-4 rounded-sm border border-neutral-50 flex-0 bg-foreground">
         <div className="flex gap-2">
            <img
               className=" size-10 rounded-full"
               src="/assets/person_1.png"
               alt="Student Image"
            />
            <div className="flex flex-col gap-0.5">
               <div>David Leebari</div>
               <div className=" flex items-center gap-x-2">
                  <span>5.0</span>
                  <div className=" -mt-1">
                     <StarRating max={5} value={3} />{' '}
                  </div>
               </div>
            </div>
         </div>
         <p className=" text-neutral-800 text-balance">
            “I wasn’t expecting the community to be so active! Sharing my
            designs and getting constructive feedback from other learners helped
            me grow faster than I thought possible”
         </p>
      </div>
   );
};

export default Review;
