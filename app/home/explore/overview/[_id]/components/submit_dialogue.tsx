'use client';

import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { useState} from 'react';
import { ReactSVG } from 'react-svg';

const SubmitQuizDialog = ({unanswered=true, submitFunction}:{unanswered?:boolean, submitFunction:()=>Promise<void>}) => {
   const [isOpen, setIsOpen] = useState(false);
 

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
            className=" bg-white max-w-[397px]! p-3"
            showCloseButton={false}
            aria-description="Dialog for editing user profile"
         >
            <DialogHeader>
               <DialogTitle asChild>
                  <div className="flex justify-between">
                     <DialogClose asChild>
                        <button type="button">
                           <ReactSVG src="/icons/x.svg" />
                        </button>
                     </DialogClose>
                     <h1 className="text-left font-medium text-[20px]">
                        Submit
                     </h1>
                     <div></div>
                  </div>
               </DialogTitle>
            </DialogHeader>
            <div className=' text-center text-neutral-800 text-base text-normal'> 
                {
                 unanswered?   
                <p>
                    You skipped a question, are you sure you want to submit without answering that question?
                </p>:
                <p>
                    Are you sure uou are done and you want to submit? Consider checking your answers again

                </p>
                }
                <div className=' flex justify-between w-full mt-2.5 text-neutral-800 text-[14px] text-medium'>
                    <DialogClose asChild>
                        {
                            unanswered?

                    <Button className=' h-[45px] w-[180px] rounded-full border border-neutral-800 text-neutral-800' variant={'outline'}>No, answer question</Button>:
                    <Button className=' h-[45px] w-[180px] rounded-full border border-neutral-800 text-neutral-800' variant={'outline'}>Cancel</Button>
                        }

                    </DialogClose>
                    <Button className=' h-[45px] w-[180px] rounded-full' onClick={submitFunction}> Yes, Submit</Button>
                </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default SubmitQuizDialog;
