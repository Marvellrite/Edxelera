"use client"

import { useState } from 'react';
import formatMoney from '@/utils/formatMoney';
import { Rating } from '@/components/common';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MinusCircle } from '@/components/icons/modified';

export interface CartItemData {
   posterSrc: string;
   title: string;
   price: string | number;
   duration: string;
   rating: number;
   _id: string;
}

interface CartItemProps extends CartItemData {
   onRemove?: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
   posterSrc,
   title,
   price,
   duration,
   rating,
   _id = '3',
   onRemove,
}) => {
   const [ratingVal, setRatingVal] = useState<number>(rating);

   return (
      <div className=" grow border border-neutral-400 rounded-xl p-3.5 hover:shadow-lg transition-shadow duration-300 ease-in-out">
         {/* The Video Info Card */}
         <div className=" h-[150px] relative">
            <Image
               className=" object-cover rounded-lg "
               src={posterSrc}
               alt="Video Poster Image"
               fill
            />
         </div>
         <div className={cn(" flex flex-col mb-3")}>
            <span className=" text-lg">{title}</span>
            <span className=" font-bold text-md">
               &#8358;{formatMoney(price)}
            </span>
            <span>{duration}</span>
            <div className="  mt-2 flex items-center gap-1">
               <span className="font-normal text-[14px]">{ratingVal.toFixed(1)}</span>
               <span className=" -mt-0.5">
                  <Rating onChange={setRatingVal} value={ratingVal} />
               </span>
            </div>
         </div>
         <button
            type="button"
            className="p-0 mt-auto"
            onClick={() => onRemove?.(_id)}
            aria-label={`Remove ${title} from cart`}
         >
            <MinusCircle />
         </button>
      </div>
   );
};

export default CartItem;
