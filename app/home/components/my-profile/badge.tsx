import React from 'react';

const Badge = () => {
   return (
      <div className="flex flex-col gap-y-4 border border-neutral-50 rounded-[1px] max-w-[373px] p-3.5 pt-4 max-[860px]:flex-none max-[860px]:basis-[278px] ">
         <div>
            <img
               className=" w-[133px] block mx-auto"
               src="/assets/badge.png"
               alt="badge"
            />
         </div>
         <div>
            <div className=" font-normal text-lg">Bookworm</div>
            <div className=" leading-[150%]">
               For completing an entire module within 24 hours
            </div>
         </div>
      </div>
   );
};

export default Badge;
