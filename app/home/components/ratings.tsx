'use client';

import React from 'react';
import { FullStar, EmptyStar, HalfStar } from './Stars';

interface StarRatingProps {
   value: number; // e.g. 3.5
   onChange?: (value: number) => void;
   max?: number;
   readOnly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
   value,
   onChange,
   max = 5,
   readOnly = false,
}) => {
   const [hoverValue, setHoverValue] = React.useState<number | null>(null);

   const displayValue = hoverValue ?? value;

   const handleClick = (index: number, half: boolean) => {
      if (readOnly || !onChange) return;
      const newValue = half ? index + 0.5 : index + 1;
      onChange(newValue);
   };

   return (
      <div className="flex gap-1">
         {Array.from({ length: max }).map((_, index) => {
            const starNumber = index + 1;
            const starValue = displayValue;

            const isFull = starValue >= starNumber;
            const isHalf = !isFull && starValue >= starNumber - 0.5;

            return (
               <div
                  key={index}
                  className="relative flex items-center cursor-pointer select-none"
                  onMouseLeave={() => setHoverValue(null)}
               >
                  {/* Left half (0.5) */}
                  {!readOnly && (
                     <div
                        className="absolute left-0 top-0 h-full w-1/2 z-20"
                        onMouseEnter={() => setHoverValue(index + 0.5)}
                        onClick={() => handleClick(index, true)}
                     />
                  )}

                  {/* Right half (1.0) */}
                  {!readOnly && (
                     <div
                        className="absolute right-0 top-0 h-full w-1/2 z-20"
                        onMouseEnter={() => setHoverValue(index + 1)}
                        onClick={() => handleClick(index, false)}
                     />
                  )}

                  {/* Actual star */}
                  {isFull ? (
                     <FullStar />
                  ) : isHalf ? (
                     <HalfStar />
                  ) : (
                     <EmptyStar />
                  )}
               </div>
            );
         })}
      </div>
   );
};

export default StarRating;
