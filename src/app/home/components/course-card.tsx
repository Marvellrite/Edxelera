'use client';

import { useRef, useState } from 'react';
import formatMoney from '@/utils/formatMoney';
import { Rating } from '@/components/common';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowUpRight } from 'lucide-react';

interface VideoCardProps {
   posterSrc: string;
   title: string;
   price: string;
   duration: string;
   rating: number;
   _id: string;
   hideCta?: boolean;
   variant?: 'default' | 'compact' | 'featured';
}

const CourseCard: React.FC<VideoCardProps> = ({
   posterSrc,
   title,
   price,
   duration,
   rating,
   hideCta = false,
   _id = '3',
   variant = 'default',
}) => {
   const [ratingVal, setRatingVal] = useState<number>(rating);
   const [isInfoOpen, setIsInfoOpen] = useState(false);
   const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
   const isCompact = variant === 'compact';
   const isFeatured = variant === 'featured';

   const openInfo = () => {
      if (closeTimerRef.current) {
         clearTimeout(closeTimerRef.current);
         closeTimerRef.current = null;
      }
      setIsInfoOpen(true);
   };

   const closeInfo = () => {
      closeTimerRef.current = setTimeout(() => setIsInfoOpen(false), 120);
   };

   return (
      <Popover open={isInfoOpen} onOpenChange={setIsInfoOpen}>
         <PopoverTrigger asChild>
            <Link
               href={`/home/explore/overview/${_id}`}
               className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
            >
               <article
                  className={cn(
                     'group relative overflow-hidden border transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-elevated)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(255,255,255,0.15),transparent_35%)] before:opacity-70',
                     isCompact
                        ? 'rounded-xl border-[var(--border-soft)] bg-[var(--surface-raised)] p-2.5'
                        : isFeatured
                          ? 'rounded-2xl border-[var(--border-subtle)] bg-[linear-gradient(170deg,var(--surface-overlay),var(--surface-elevated-2))] p-3.5'
                          : 'rounded-2xl border-[var(--border-soft)] bg-[linear-gradient(180deg,var(--surface-raised),var(--surface-subtle))] p-3'
                  )}
               >
                  <div className={cn('relative overflow-hidden', isCompact ? 'aspect-[4/3] rounded-lg' : 'aspect-[16/9] rounded-xl')}>
                     <Image className="object-cover transition-transform duration-500 group-hover:scale-105" src={posterSrc} alt={title} fill />
                     <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                     <span className="absolute left-2 top-2 rounded-full bg-[var(--surface-overlay)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-strong)]">
                        {isFeatured ? 'Continue' : 'Course'}
                     </span>
                     <span className={cn('absolute right-2 top-2 rounded-full bg-black/60 text-xs font-medium text-white backdrop-blur-sm', isCompact ? 'px-2 py-0.5' : 'px-2.5 py-1')}>
                        {duration}
                     </span>
                  </div>

                  <div className={cn(isCompact ? 'mt-2.5 space-y-2' : 'mt-3.5 space-y-2.5')}>
                     <span className={cn('line-clamp-2 font-semibold leading-snug text-[var(--text-strong)]', isCompact ? 'text-sm' : 'text-base')}>
                        {title}
                     </span>

                     <div className="flex items-end justify-between gap-2">
                        <span className={cn('font-bold text-[var(--text-strong)]', isCompact ? 'text-base' : 'text-xl')}>
                           &#8358;{formatMoney(price)}
                        </span>
                        <div className="rounded-full bg-[var(--surface-subtle)] px-2.5 py-1">
                           <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium text-[var(--text-muted)]">{ratingVal.toFixed(1)}</span>
                              <Rating onChange={setRatingVal} value={ratingVal} size={9} gap={2} />
                           </div>
                        </div>
                     </div>
                  </div>

                  {!hideCta && (
                     <div className="mt-3 flex items-center justify-between rounded-xl border border-[var(--border-soft)] bg-[var(--surface-subtle)] px-3 py-2 text-xs">
                        <span className="text-[var(--text-muted)]">Next lesson available</span>
                        <span className="inline-flex items-center gap-1 font-medium text-[var(--primary)]">
                           Resume <ArrowUpRight className="size-3.5" />
                        </span>
                     </div>
                  )}
               </article>
            </Link>
         </PopoverTrigger>

         <PopoverContent
            align="center"
            sideOffset={10}
            className="hidden w-[20rem] rounded-xl border-[var(--border-subtle)] bg-[var(--surface-overlay)] p-4 shadow-[var(--shadow-elevated)] backdrop-blur-sm md:block"
            onMouseEnter={openInfo}
            onMouseLeave={closeInfo}
         >
            <div className="space-y-3">
               <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Course Details</p>
               <div className="space-y-2 text-sm text-[var(--text-default)]">
                  <div className="grid grid-cols-[6rem_1fr] gap-2"><span className="text-[var(--text-soft)]">Course</span><span className="font-semibold">{title}</span></div>
                  <div className="grid grid-cols-[6rem_1fr] gap-2"><span className="text-[var(--text-soft)]">Price</span><span className="font-semibold">&#8358;{formatMoney(price)}</span></div>
                  <div className="grid grid-cols-[6rem_1fr] gap-2"><span className="text-[var(--text-soft)]">Duration</span><span>{duration}</span></div>
               </div>
            </div>
         </PopoverContent>
      </Popover>
   );
};

export default CourseCard;
