import React from 'react';
import { Button } from '@/components/ui/button';
import { CertificateCardProps } from '../types/achievements';
import { ArrowUpRight, Medal } from 'lucide-react';
import Image from 'next/image';

const Cerificates: React.FC<CertificateCardProps> = ({ posterSrc, title, reception_date }) => {
   const safePoster = posterSrc ?? 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340414/repo-images/public/assets/certificate_adjusted.jpg';
   return (
      <article className="w-full max-w-[360px] rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-3.5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
         <div className="overflow-hidden rounded-xl border border-[var(--border-soft)]">
            <Image className="w-full object-cover transition duration-300 hover:scale-[1.02]" src={safePoster} alt={title} width={332} height={204} />
         </div>

         <div className="mt-3 space-y-1.5">
            <p className="inline-flex items-center gap-1 rounded-full bg-[var(--surface-featured-alt)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-achievement)]">
               <Medal className="size-3.5" /> Certificate
            </p>
            <h3 className="text-base font-semibold text-[var(--text-strong)]">{title}</h3>
            <p className="text-sm text-[var(--text-muted)]">Received on {reception_date}</p>
         </div>

         <div className="mt-3 flex gap-2">
            <Button variant={'outline'} className="h-10 grow rounded-full text-xs">
               Revisit course
            </Button>
            <Button className="h-10 grow rounded-full text-xs">
               View <ArrowUpRight className="size-3.5" />
            </Button>
         </div>
      </article>
   );
};

export default Cerificates;
