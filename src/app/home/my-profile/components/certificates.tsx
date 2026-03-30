import React from 'react';
import { Button } from '@/components/ui/button';

export interface CertificateCardProps {
   posterSrc?: string;
   title: string;
   reception_date: string;
}

const Cerificates: React.FC<CertificateCardProps> = ({
   posterSrc,
   title,
   reception_date,
}) => {
   return (
      <div className=" grow  border border-neutral-400 rounded-lg p-3.5 hover:shadow-lg transition-shadow duration-300 ease-in-out max-w-[351px] h-fit">
         {/* The Video Info Card */}
         <div className=" h-fit">
            <img
               className=" w-full object-cover rounded-sm "
               src={posterSrc}
               alt="Video Poster Image"
            />
         </div>
         <div className=" flex flex-col  mt-2 mb-3">
            <span className=" text-lg">{title}</span>
            <span className=" font-normal">Received on {reception_date}</span>
         </div>
         <div className=" flex gap-2">
            <Button
               variant={'outline'}
               className=" hover:cursor-pointer grow rounded-[500] h-[45px] text-[14px] font-medium text-primary border-primary"
            >
               Revisit Course
            </Button>
            <Button className=" hover:cursor-pointer grow rounded-[500] h-[45px] text-[14px] font-medium ">
               View Certificate
            </Button>
         </div>
      </div>
   );
};

export default Cerificates;
