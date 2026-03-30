'use client';

import {
   siFacebook,
   siInstagram,
   siLinkerd,
   siX,
   type SimpleIcon,
} from 'simple-icons';

import type IconProp from '@/components/icons/generated/IconType';

function createSimpleBrandIcon(icon: SimpleIcon) {
   return function SimpleBrandIcon({
      className,
      size = 20,
      ...props
   }: IconProp) {
      return (
         <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={className ?? 'size-5 text-neutral-800'}
            aria-hidden="true"
            fill="currentColor"
            {...props}
         >
            <path d={icon.path} />
         </svg>
      );
   };
}

export const SimpleFacebookIcon = createSimpleBrandIcon(siFacebook);
export const SimpleXIcon = createSimpleBrandIcon(siX);
export const SimpleLinkedInIcon = createSimpleBrandIcon(siLinkerd);
export const SimpleInstagramIcon = createSimpleBrandIcon(siInstagram);
