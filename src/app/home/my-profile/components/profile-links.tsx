import { cn } from '@/lib/utils';

export type ProfileLinkItem = {
   label: string;
   value: string;
   href?: string;
};

type ProfileLinksProps = {
   title?: string;
   items?: ProfileLinkItem[];
   className?: string;
};

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
      <section className={cn('w-full space-y-2', className)}>
         <p className="text-md font-normal text-primary">{title}</p>

         <div className="flex w-full flex-col gap-4">
            {items.map((item) => {
               const content = (
                  <>
                     <p className="text-sm font-normal text-neutral-700">
                        {item.label}
                     </p>
                     <p className="text-md font-normal text-neutral-900 break-words">
                        {item.value}
                     </p>
                  </>
               );

               return (
                  <div
                     key={`${item.label}-${item.value}`}
                     className="flex w-full flex-col items-start justify-center gap-0.5 rounded-lg"
                  >
                     {item.href ? (
                        <a
                           href={item.href}
                           target="_blank"
                           rel="noreferrer"
                           className="group w-full rounded-lg transition-colors duration-200"
                        >
                           <div className="space-y-0.5 group-hover:opacity-90">
                              {content}
                           </div>
                        </a>
                     ) : (
                        <div className="w-full space-y-0.5">
                           {content}
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </section>
   );
};

export default ProfileLinks;
