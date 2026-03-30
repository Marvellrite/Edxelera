'use client';

import { ChevronRight } from 'lucide-react';

import TogglePill from './toggle-pill';
import type { SettingsRowItemProps } from '../types';

export default function SettingsRowItem({
   row,
   checked,
   onToggleChange,
   onAction,
}: SettingsRowItemProps) {
   const commonClassName =
      'flex h-14 w-full items-center justify-between gap-2 rounded-xl bg-white px-5 py-4 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.01)] transition-colors duration-200 hover:bg-white/90 md:px-6';

   if (row.type === 'toggle') {
      return (
         <div className={commonClassName}>
            <span className="text-sm font-medium leading-[150%] text-[#2C2C2C]">
               {row.label}
            </span>
            <TogglePill
               label={row.label}
               checked={Boolean(checked)}
               onChange={(nextChecked) => onToggleChange?.(row.id, nextChecked)}
            />
         </div>
      );
   }

   return (
      <button
         type="button"
         className={commonClassName}
         onClick={() => onAction?.(row.id)}
      >
         <span
            className={`text-sm font-medium leading-[150%] ${
               row.destructive ? 'text-[#6C0507]' : 'text-[#2C2C2C]'
            }`}
         >
            {row.label}
         </span>
         <ChevronRight className="size-6 text-[#494949]" strokeWidth={2} />
      </button>
   );
}
