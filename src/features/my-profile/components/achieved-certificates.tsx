'use client';

import type { ReactNode } from 'react';

import SeeAllButton from '@/components/ui/see-all-btn';
import useDragScroll from '@/hooks/useDragScroll';
import { cn } from '@/lib/utils';

import Certificates from './certificates';
import type {  CertificateCardProps } from '../types/achievements';

type AchievedCertificatesProps = {
   certificates: CertificateCardProps[];
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

const AchievedCertificates = ({
   certificates,
   subtitle,
   totalCount = certificates.length,
   previewLimit = 5,
   seeAllHref,
   seeAllLabel = 'See all',
   showSeeAll = true,
   variant = 'preview',
}: AchievedCertificatesProps) => {
   const { dragScrollProps, isDragging, scrollRef } =
      useDragScroll<HTMLDivElement>({ axis: 'x' });

   const visibleCertificates =
      variant === 'preview' ? certificates.slice(0, previewLimit) : certificates;

   const heading = `Certificates (${totalCount})`;
   const resolvedSubtitle =
      subtitle ?? (variant === 'preview' ? 'Recently earned' : undefined);

   return (
      <section className="space-y-3.5 rounded-3xl border border-[var(--border-subtle)] bg-[linear-gradient(180deg,var(--surface-raised),var(--surface-subtle))] p-5 shadow-[var(--shadow-card)]">
         <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
               <p className="text-lg font-semibold text-[var(--text-strong)]">{heading}</p>
               {resolvedSubtitle ? (
                  <p className="text-sm text-[var(--text-muted)]">
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

         {visibleCertificates.length > 0 ? (
            <div
               ref={scrollRef}
               {...dragScrollProps}
               className={cn(
                  railClassName,
                  isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
               )}
            >
               {visibleCertificates.map((certificate, index) => (
                  <Certificates
                     key={
                        certificate.id ??
                        `${certificate.title}-${certificate.receivedAt ?? certificate.reception_date}-${index}`
                     }
                     {...certificate}
                  />
               ))}
            </div>
         ) : (
            <div className="rounded-lg bg-surface p-4 text-sm font-normal text-neutral-700">
               No certificates yet.
            </div>
         )}
      </section>
   );
};

export default AchievedCertificates;
