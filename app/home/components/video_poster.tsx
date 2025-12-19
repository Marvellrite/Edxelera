'use client';

import React from 'react';
import { ReactSVG } from 'react-svg';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type VideoPosterProps = {
   posterSrc: string;
   title: string;
   duration: string;
};

const VideoPoster: React.FC<VideoPosterProps> = ({
   posterSrc,
   title,
   duration,
}) => {
   return (
      <div className="  relative max-md:flex-none max-md:basis-full max-md:max-w-none max-w-[374px] grow  rounded-lg ">
         <Image
            src={posterSrc}
            className=" object-cover "
            alt="Video Poster"
            fill
         />
         <div className=" absolute bg-black/30 w-full h-full left-0 top-0 flex flex-col justify-end p-4 px-3 ">
            <div className=" flex flex-col -space-y-1">
               <p className=" text-white text-xl font-medium leading-[150%]">
                  {title}
               </p>
               <p className=" font-normal text-md text-white">{duration}</p>
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

export default VideoPoster