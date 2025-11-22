'use client';

import { useState, useEffect, FC } from 'react';
import VideoPoster from './video_poster';
import { mock_data } from '../continue_learning_mock_data';

interface ContinueLearningProps {
   data: {
      posterSrc: string;
      title: string;
      duration: string;
   }[];
}

const Continue_learning_desktop: FC<ContinueLearningProps> = ({ data }) => {
   return (
      <div className="hidden md:block">
         <p className=" text-md font-normal mb-3">Continue learning</p>
         <div className=" flex h-[252px] gap-3">
            {data.map((data, index) => (
               <VideoPoster key={index} {...data} />
            ))}
         </div>
      </div>
   );
};

export default Continue_learning_desktop;
