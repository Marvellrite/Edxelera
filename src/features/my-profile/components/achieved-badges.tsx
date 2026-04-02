'use client';

import type { ReactNode } from 'react';

import SeeAllButton from '@/components/ui/see-all-btn';
import useDragScroll from '@/hooks/useDragScroll';
import { cn } from '@/lib/utils';

import AchievementBadgeCard from './achievement-badge-card';
import type { AchievementBadgeCardProps } from '../types/achievements';

type AchievedBadgesProps = {
   badges: AchievementBadgeCardProps[];
   title?: string;
   subtitle?: string;
   totalCount?: number;
   previewLimit?: number;
   seeAllHref?: string;
   seeAllLabel?: ReactNode;
   showSeeAll?: boolean;
   variant?: 'preview' | 'full';
};

const railClassName =
   '-mx-1 flex gap-3 overflow-x-auto px-1 pb-3 smooth snap-x snap-proximity [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

const AchievedBadges = ({
   badges,
   title = 'Achievements',
   subtitle,
   totalCount = badges.length,
   previewLimit = 5,
   seeAllHref,
   seeAllLabel = 'See all',
   showSeeAll = true,
   variant = 'preview',
}: AchievedBadgesProps) => {
   const { dragScrollProps, isDragging, scrollRef } =
      useDragScroll<HTMLDivElement>({ axis: 'x' });

   const visibleBadges =
      variant === 'preview' ? badges.slice(0, previewLimit) : badges;

   const heading = `${title} (${totalCount})`;
   const resolvedSubtitle =
      subtitle ?? (variant === 'preview' ? 'Recently earned' : undefined);

   return (
      <section className="space-y-3.5">
         <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
               <p className="text-md font-normal text-primary">{heading}</p>
               {resolvedSubtitle ? (
                  <p className="text-sm font-normal text-neutral-600">
                     {resolvedSubtitle}
                  </p>
               ) : null}
            </div>

            {showSeeAll && seeAllHref ? (
               <SeeAllButton href={seeAllHref} className="shrink-0">
                  {seeAllLabel}
               </SeeAllButton>
            ) : null}
         </div>

         {visibleBadges.length > 0 ? (
            <div
               ref={scrollRef}
               {...dragScrollProps}
               className={cn(
                  railClassName,
                  isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
               )}
            >
               {visibleBadges.map((badge) => (
                  <AchievementBadgeCard
                     key={badge.id ?? `${badge.title}-${badge.earnedAt ?? badge.unlockedOn}`}
                     {...badge}
                     className={[
                        'shrink-0 snap-start',
                        variant === 'preview'
                           ? 'w-[250px] sm:w-[278px]'
                           : '',
                        badge.className ?? '',
                     ]
                        .filter(Boolean)
                        .join(' ')}
                  />
               ))}
            </div>
         ) : (
            <div className="rounded-lg bg-surface p-4 text-sm font-normal text-neutral-700">
               No achievements yet.
            </div>
         )}
      </section>
   );
};

export default AchievedBadges;
