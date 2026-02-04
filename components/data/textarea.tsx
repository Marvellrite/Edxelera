import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { ComponentProps } from 'react';

interface TextareaPropsType<T extends FieldValues>
   extends ComponentProps<'textarea'> {
   name: Path<T>;
   textarea_id: string;
   register: UseFormRegister<T>;
   placeholder: string;
   rows?: number;
}

const Textarea = <T extends FieldValues>({
   placeholder,
   name,
   textarea_id,
   register,
   rows = 2,
}: TextareaPropsType<T>) => {
   return (
      <div className=" size-full relative  pb-0 bg-white hover:bg-neutral-50/70 ring-neutral-500 flex focus-within:ring-2 focus-within:ring-primary/60 text-neutral-600 focus-within:bg-surface-foreground! rounded-xl">
         <textarea
            {...register<Path<T>>(name)}
            className="peer  basis-full h-[85%]  self-end focus-visible:outline-none px-3 py-7"
            placeholder=" "
            id={textarea_id}
            rows={rows}
         />
         <label
            className=" absolute left-3 top-5 text-neutral-500 text-[14px] -translate-y-1/2 pointer-events-none
                                 transition-all duration-200
                                 peer-placeholder-shown:top-[30px]
                                 peer-placeholder-shown:text-base
                                 peer-placeholder-shown:-translate-y-1/2
                                 peer-focus:top-5
                                 peer-focus:text-[14px]
                                 peer-focus:text-neutral-600"
            htmlFor={textarea_id}
         >
            {placeholder}
         </label>
      </div>
   );
};

export default Textarea;
