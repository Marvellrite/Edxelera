import { CalendarDays } from 'lucide-react';

import { cn } from '@/lib/utils';

export type AchievementBadgeCardProps = {
   title?: string;
   description?: string;
   unlockedOn?: string;
   imageSrc?: string;
   className?: string;
};

const defaultBadgeImage =
   'https://www.figma.com/api/mcp/asset/498b3f44-d47b-42ad-aff5-36c7f0851a4b';

const AchievementBadgeCard = ({
   title = 'Skill Mastery',
   description = 'For achieving high scores in assessments and demonstrating strong understanding.',
   unlockedOn = 'Unlocked on Jan 25, 2026',
   imageSrc = defaultBadgeImage,
   className = '',
}: AchievementBadgeCardProps) => {
   return (
      <article
         className={cn(
            'flex w-full max-w-[278px] min-w-[250px] flex-col gap-4 rounded-[4px] border border-neutral-50 bg-white p-3.5',
            className
         )}
      >
         <div className="flex h-[138px] w-full items-center justify-center overflow-hidden rounded-[4px] bg-white">
            <img
               src={imageSrc}
               alt={title}
               className="h-[112px] w-[112px] object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.08)]"
            />
         </div>

         <div className="space-y-2">
            <h3 className="text-[18px] font-medium leading-[150%] text-neutral-900">
               {title}
            </h3>
            <p className="text-sm font-normal leading-[150%] text-neutral-800">
               {description}
            </p>
         </div>

         <div className="inline-flex items-center gap-1 text-xs font-normal leading-[150%] text-neutral-800">
            <CalendarDays className="size-5 shrink-0" strokeWidth={1.7} />
            <span>{unlockedOn}</span>
         </div>
      </article>
   );
};

export default AchievementBadgeCard;
