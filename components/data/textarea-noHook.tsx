import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface TextareaPropsType
   extends ComponentProps<'textarea'> {
   placeholder: string;
   rows?: number;
   minHeight?: number | string
}

const Textarea = ({
   minHeight='auto',
   placeholder,
   rows = 2,
   id:textareaId,
   className,
   ...rest
}: TextareaPropsType) => {
   return (
      <div style={{minHeight}} className=" size-full relative px-3 py-7 pb-2 rounded-lg border border-neutral-400 ring-neutral-400 flex focus-within:ring-2 focus-within:ring-neutral-300 items-stretch ">
         <textarea
            className={cn("peer  basis-full   self-end focus-visible:outline-none ", className) }
            placeholder=" "
            rows={rows}
            id={textareaId}
            {...rest} />
         <label
            className=" absolute left-3 top-[20px] text-neutral-500 text-[14px] -translate-y-1/2 pointer-events-none
                                 transition-all duration-200
                                 peer-placeholder-shown:top-[30px]
                                 peer-placeholder-shown:text-base
                                 peer-placeholder-shown:-translate-y-1/2
                                 peer-focus:top-[20px]
                                 peer-focus:text-[14px]
                                 peer-focus:text-neutral-500
                                 peer-focus:text-blue-600"
            htmlFor={textareaId}

         >
            {placeholder}
         </label>
      </div>
   );
};

export default Textarea;
