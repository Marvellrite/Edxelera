'use client';

import type { TogglePillProps } from '../types';

export default function TogglePill({
   checked,
   onChange,
   label,
}: TogglePillProps) {
   return (
      <button
         type="button"
         role="switch"
         aria-checked={checked}
         aria-label={label}
         onClick={() => onChange(!checked)}
         className={`flex h-10 w-[72px] items-center rounded-full px-4 transition-colors duration-200 ${
            checked ? 'justify-end bg-primary/15' : 'justify-start bg-[#F3F3F3]'
         }`}
      >
         <span
            className={`block rounded-full transition-all duration-200 ${
               checked
                  ? 'size-5 bg-primary shadow-[0_4px_14px_rgba(0,17,70,0.22)]'
                  : 'size-4 bg-[#939393]'
            }`}
         />
      </button>
   );
}
