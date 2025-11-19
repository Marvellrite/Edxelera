'use client';

import React from 'react';
import { ReactSVG } from 'react-svg';
import { Button } from '@/components/ui/button';

type VideoPosterProps = {
   posterSrc: string;
   title: string;
   week: number;
};

const VideoPoster: React.FC<VideoPosterProps> = ({
   posterSrc,
   title,
   week,
}) => {
   return (
      <div className=" relative max-w-[374px] grow aspect-video rounded-lg overflow-hidden">
         <img
            src={posterSrc}
            className="h-full w-full object-cover "
            alt="Video Poster"
         />
         <div className=" absolute bg-black/30 w-full h-full left-0 top-0 flex flex-col justify-end p-4 px-3 ">
            <div className=" flex flex-col -space-y-1">
               <p className=" text-white text-xl font-medium leading-[150%]">
                  {title}
               </p>
               <p className=" font-normal text-md text-white">Week {week}</p>
            </div>
         </div>

         <Button
            className=" hover:cursor-pointer rounded-[500px] size-[58px] bg-white absolute top-1/2 left-1/2 -translate-1/2 flex justify-center items-center hover:bg-white"
            variant="ghost"
         >
            <ReactSVG src="/icons/play.svg" />
         </Button>
      </div>
   );
};

export default VideoPoster;
