import React from 'react';

const input = () => {
   return (
      <input
         //  {...register('bio')}
         className=" w-full h-[53px] rounded-lg px-3 py-4 border border-neutral-400 ring-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-shadow duration-300 "
         type="text"
         placeholder="Bio"
      />
   );
};

export default input;
