import type { ReactNode } from 'react';

import SeeAllButton from '@/components/ui/see-all-btn';

import AchievementBadgeCard, {
   type AchievementBadgeCardProps,
} from './achievement-badge-card';

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
   '-mx-1 flex gap-3 overflow-x-auto px-1 pb-3 smooth snap-x snap-proximity [scrollbar-width:thin] [scrollbar-color:var(--color-neutral-500)_var(--color-surface)] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-surface [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-600';

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
            <div className={railClassName}>
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
