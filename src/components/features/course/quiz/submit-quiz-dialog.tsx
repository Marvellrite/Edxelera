'use client';

import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { useState} from 'react';
import { ReactSVG } from 'react-svg';

const SubmitQuizDialog = ({unanswered=true, submitFunction}:{unanswered?:boolean, submitFunction:()=>Promise<void>}) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleSubmit = async () => {
      await submitFunction();
   };
 

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button
               className=" rounded-full py-2.5 px-[27px] w-[116px] h-11 mt-6 float-right"
            >
               Submit
            </Button>
         </DialogTrigger>
         <DialogContent
            className="max-w-[calc(100%-1.5rem)] gap-0 rounded-2xl border border-border bg-white p-0 shadow-[0_24px_70px_-32px_rgba(4,5,6,0.38)] sm:max-w-[420px]"
            showCloseButton={false}
            aria-describedby="submit-assessment-description"
         >
            <DialogHeader className="px-5 pb-0 pt-5 sm:px-6 sm:pt-6">
               <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                     <DialogTitle className="text-left text-[20px] font-semibold leading-tight text-text-strong">
                        Submit assessment
                     </DialogTitle>
                     <DialogDescription
                        id="submit-assessment-description"
                        className="text-left text-sm leading-6 text-text-muted"
                     >
                        {unanswered
                           ? "You’re about to submit your answers. Review your responses before continuing."
                           : "Are you sure you want to submit your answers? Review your responses before continuing."}
                     </DialogDescription>
                  </div>

                  <DialogClose asChild>
                     <button
                        type="button"
                        aria-label="Close submit assessment dialog"
                        className="inline-flex shrink-0 items-center justify-center rounded-full border border-transparent text-neutral-500 transition-[color,background-color,border-color,transform] duration-200 hover:border-border/80 hover:bg-neutral-50 hover:text-neutral-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                     >
                        <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340631/repo-images/public/icons/x.svg" />
                     </button>
                  </DialogClose>
               </div>
            </DialogHeader>

            <div className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-4">
               <DialogFooter className="gap-3 sm:flex-row sm:justify-end">
                  <DialogClose asChild>
                     <Button
                        className="h-11 w-full  sm:w-auto sm:min-w-[160px]"
                        variant={'outline'}
                     >
                        {unanswered ? 'Review answers' : 'Cancel'}
                     </Button>
                  </DialogClose>
                  <Button
                     className="h-11 w-full sm:w-auto sm:min-w-[160px]"
                     onClick={handleSubmit}
                  >
                     Yes, submit
                  </Button>
               </DialogFooter>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default SubmitQuizDialog;
