import { cn } from '@/lib/utils';
import { ProfileLinkItem, ProfileLinksProps } from '../types/profile';
import { ExternalLink } from 'lucide-react';

const defaultItems: ProfileLinkItem[] = [
   { label: 'Website', value: 'newguildham.com', href: 'https://newguildham.com' },
   { label: 'Facebook', value: 'facebook.com/newguildham', href: 'https://facebook.com/newguildham' },
   { label: 'X', value: 'x.com/newguildham', href: 'https://x.com/newguildham' },
   { label: 'LinkedIn', value: 'linkedin.com/in/newguildham', href: 'https://linkedin.com/in/newguildham' },
   { label: 'Instagram', value: 'instagram.com/newguildham', href: 'https://instagram.com/newguildham' },
];

const ProfileLinks = ({ title = 'Links', items = defaultItems, className = '' }: ProfileLinksProps) => {
   return (
      <section className={cn('w-full space-y-3 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card)]', className)}>
         <p className="text-lg font-semibold text-[var(--text-strong)]">{title}</p>
         <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
               const content = (
                  <>
                     <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-soft)]">{item.label}</p>
                     <p className="line-clamp-1 text-sm font-medium text-[var(--text-strong)]">{item.value}</p>
                  </>
               );

               return item.href ? (
                  <a
                     key={`${item.label}-${item.value}`}
                     href={item.href}
                     target="_blank"
                     rel="noreferrer"
                     className="group rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-subtle)] p-3 transition hover:border-[var(--primary-300)] hover:bg-[var(--surface-tint-blue)]"
                  >
                     <div className="flex items-start justify-between gap-2">
                        <div>{content}</div>
                        <ExternalLink className="size-3.5 text-[var(--text-soft)] group-hover:text-[var(--primary)]" />
                     </div>
                  </a>
               ) : (
                  <div key={`${item.label}-${item.value}`} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-subtle)] p-3">
                     {content}
                  </div>
               );
            })}
         </div>
      </section>
   );
};

export default ProfileLinks;
