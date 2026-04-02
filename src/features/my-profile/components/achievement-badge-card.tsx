import { CalendarDays, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AchievementBadgeCardProps } from '../types/achievements';
import Image from 'next/image';

const defaultBadgeImage = 'https://www.figma.com/api/mcp/asset/498b3f44-d47b-42ad-aff5-36c7f0851a4b';

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
            'flex w-full max-w-[300px] min-w-[260px] flex-col gap-4 rounded-2xl border border-[var(--border-soft)] bg-[linear-gradient(150deg,var(--surface-raised),var(--accent-achievement-soft))] p-4 shadow-[var(--shadow-card)]',
            className
         )}
      >
         <div className="flex h-[138px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-overlay)]">
            <Image src={imageSrc} alt={title} width={112} height={112} className="h-[112px] w-[112px] object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.14)]" />
         </div>

         <div className="space-y-2">
            <p className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-achievement-soft)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-achievement)]">
               <Trophy className="size-3.5" /> Achievement
            </p>
            <h3 className="text-lg font-semibold leading-snug text-[var(--text-strong)]">{title}</h3>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
         </div>

         <div className="inline-flex items-center gap-1.5 text-xs text-[var(--text-soft)]">
            <CalendarDays className="size-4.5 shrink-0" strokeWidth={1.7} />
            <span>{unlockedOn}</span>
         </div>
      </article>
   );
};

export default AchievementBadgeCard;
