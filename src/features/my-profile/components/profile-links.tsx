import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { ProfileLinkItem, ProfileLinksProps } from '../types/profile';

const defaultItems: ProfileLinkItem[] = [
   { label: 'Website', value: 'newguildham.com', href: 'https://newguildham.com' },
   { label: 'Facebook', value: 'facebook.com/newguildham', href: 'https://facebook.com/newguildham' },
   { label: 'X', value: 'x.com/newguildham', href: 'https://x.com/newguildham' },
   { label: 'LinkedIn', value: 'linkedin.com/in/newguildham', href: 'https://linkedin.com/in/newguildham' },
   { label: 'Instagram', value: 'instagram.com/newguildham', href: 'https://instagram.com/newguildham' },
];

const ProfileLinks = ({
   title = 'Links',
   items = defaultItems,
   className = '',
}: ProfileLinksProps) => {
   return (
      <section className={cn('rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card)] sm:p-6', className)}>
         <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title ?? 'Links'}
         </p>

         <div className="flex flex-col gap-2">
            {items.map((item) => {
               const inner = (
                  <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-subtle)] px-3.5 py-3 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]">
                     <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                           {item.label}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-medium text-[var(--text-strong)]">
                           {item.value}
                        </p>
                     </div>
                     {item.href && (
                        <ExternalLink className="size-4 shrink-0 text-[var(--text-muted)]" strokeWidth={1.75} />
                     )}
                  </div>
               );

               return item.href ? (
                  <a
                     key={`${item.label}-${item.value}`}
                     href={item.href}
                     target="_blank"
                     rel="noreferrer"
                     className="block w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-500)]/40"
                  >
                     {inner}
                  </a>
               ) : (
                  <div key={`${item.label}-${item.value}`}>{inner}</div>
               );
            })}
         </div>
      </section>
   );
};

export default ProfileLinks;
