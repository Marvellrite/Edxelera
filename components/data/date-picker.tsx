'use client';
import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import { Sms } from '../icons/modified';
import { cn } from '@/lib/utils/utils';

interface DatePickerProps {
   fieldValueState: Date | undefined;
   fieldOnChangeHandler: (value: Date | undefined) => void;
   side?: 'top' | 'right' | 'bottom' | 'left';
}

const DatePicker: React.FC<DatePickerProps> = ({
   fieldValueState,
   fieldOnChangeHandler,
   side,
}) => {
   const [open, setOpen] = React.useState(false);
   const [isBtnFocused, setIsBtnFocused] = React.useState(false);
   const [wasClickedInside, setWasClickedInside] = React.useState(false);
   
   let avoidCollisions = false;
   if (!side) avoidCollisions = true;

   const triggerRef = React.useRef<HTMLButtonElement | null>(null);
   const popoverRef = React.useRef<HTMLDivElement | null>(null);

   React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         const [triggerEl, popoverEl] = [triggerRef.current, popoverRef.current];
         if (!triggerEl || !popoverEl) return;

         const clickedInside = 
            triggerEl.contains(e.target as Node) || 
            popoverEl.contains(e.target as Node);

         if (!clickedInside && open) {
            setWasClickedInside(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, [open]);

   const showRing = isBtnFocused || (open && wasClickedInside);

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <button
               ref={triggerRef}
               onClick={() => setWasClickedInside(true)}
               onFocus={() => setIsBtnFocused(true)}
               onBlur={() => setIsBtnFocused(false)}
               className={cn(
                  "w-full py-4 border-transparent h-13.25 flex justify-start  hover:text-black gap-2 bg-surface-foreground px-5 rounded-full ring-2 ring-transparent hover:bg-neutral-50/70",
                  showRing && 'ring-primary/60'
               )}
            >
               <span className='text-neutral-800'>
                  <Sms />
               </span>
               {fieldValueState ? (
                  <span className='grow text-start'>{fieldValueState.toDateString()}</span>
               ) : (
                  <span className="grow text-start text-neutral-700">Date of Birth</span>
               )}
            </button>
         </PopoverTrigger>
         <PopoverContent
            sideOffset={4}
            side={side}
            avoidCollisions={avoidCollisions}
            align="center"
            ref={popoverRef}
         >
            <Calendar
               mode="single"
               selected={fieldValueState}
               onSelect={(date) => {
                  setOpen(false);
                  fieldOnChangeHandler(date);
                  setWasClickedInside(false);
                  // Return focus to trigger after selection
                  triggerRef.current?.focus();
               }}
               className="rounded-md shadow-sm ring-primary [[data-slot=popover-content]_&]:bg-white/95 edit-profile-calendar"
               captionLayout="dropdown"
            />
         </PopoverContent>
      </Popover>
   );
};

export default DatePicker;