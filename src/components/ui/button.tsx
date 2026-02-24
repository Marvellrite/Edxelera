import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react'; // or use your own spinner

import { cn } from '@/lib/utils';

const buttonVariants = cva(
   "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-[0.01em] transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-[0.99]", 
   {
      variants: {
         variant: {
            default: 'bg-primary text-primary-foreground hover:bg-hover-primary rounded-full shadow-[0_6px_20px_rgba(0,17,70,0.2)] hover:shadow-[0_10px_24px_rgba(0,17,70,0.24)] disabled:bg-primary',
            destructive:
               'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline:
               'border border-primary/30 text-primary bg-white shadow-[0_2px_8px_rgba(4,5,6,0.06)] hover:bg-primary hover:border-primary hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-hover',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-hover-secondary shadow-[0_6px_20px_rgba(237,28,36,0.2)] disabled:bg-secondary',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline',
         },
         size: {
            default: 'h-[52px] px-4 py-2 has-[>svg]:px-3 rounded-full',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10',
         },
      },
      defaultVariants: {
         variant: 'default',
         size: 'default',
      },
   },
);

function Button({
   className,
   variant,
   size,
   asChild = false,
   loading = false,
   children,
   disabled,
   ...props
}: React.ComponentProps<'button'> &
   VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      loading?: boolean;
   }) {
   const Comp = asChild ? Slot : 'button';

   const content = (
      <>
         {loading && <Loader2 className="animate-spin" />}
         {children}
      </>
   );

   return (
      <Comp
         data-slot="button"
         className={cn(buttonVariants({ variant, size, className }))}
         disabled={disabled || loading}
         {...props}
      >
         {asChild ? children : content}
      </Comp>
   );
}

export { Button, buttonVariants };
