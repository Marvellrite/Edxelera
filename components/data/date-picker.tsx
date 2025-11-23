'use client';
import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
   fieldValueState: Date | undefined;
   fieldOnChangeHandler: any;
   side?: 'top' | 'right' | 'bottom' | 'left';
}

const DatePicker: React.FC<DatePickerProps> = ({
   fieldValueState,
   fieldOnChangeHandler,
   side,
}) => {
   const [open, setOpen] = React.useState(false);
   let avoidCollisions = false;
   if (!side) avoidCollisions = true;
   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               className="  ring-0 focus-within:ring-0 w-full rounded-lg px-3 py-4 border border-neutral-400 ring-neutral-400 focus-visible:outline-none h-[53px] flex justify-start hover:bg-initial "
               variant={'outline'}
            >
               {fieldValueState ? (
                  <span>{fieldValueState.toDateString()}</span>
               ) : (
                  <span className="  text-neutral-600">Date of Birth</span>
               )}
            </Button>
         </PopoverTrigger>
         <PopoverContent
            sideOffset={4}
            side={side}
            avoidCollisions={avoidCollisions}
            align="center"
         >
            <Calendar
               mode="single"
               selected={fieldValueState}
               onSelect={(date) => {
                  setOpen(false);
                  fieldOnChangeHandler(date);
               }}
               className="rounded-md shadow-sm  ring-primary [[data-slot=popover-content]_&]:bg-white/95 edit-profile-calendar "
               captionLayout="dropdown"
            />
         </PopoverContent>
      </Popover>
   );
};

export default DatePicker;
