import {
   UseFormRegister,
   FieldValues,
   Path,
   RegisterOptions,
} from 'react-hook-form';
import { ComponentProps, ComponentType, JSX } from 'react';
import IconProp from '@/components/icons/generated/IconType';

interface InputPropsType<T extends FieldValues>
   extends ComponentProps<'input'> {
   name: Path<T>;
   input_id?: string;
   register: UseFormRegister<T>;
   registerOptions?: RegisterOptions<T, Path<T>>;
   placeholder: string;
   LeftIcon: ComponentType<IconProp>
   RightIcon?: JSX.Element

}

export const InputIconned = <T extends FieldValues>({
   placeholder,
   name,
   input_id="",
   register,
   registerOptions,
   LeftIcon,
   RightIcon,
   ...rest
}: InputPropsType<T>) => {
   return (
      <div onClick={(e)=>{
         const input = e.currentTarget.querySelector("input");
         input?.focus()
      }} className="size-full relative flex items-center justify-between gap-2 rounded-full bg-surface-foreground px-5 py-4 text-neutral-600 ring-2 ring-transparent transition-[background-color,box-shadow,ring-color] duration-200 hover:cursor-text hover:ring-primary/20 focus-within:ring-primary/60 focus-within:hover:ring-primary/60 focus-within:bg-surface-foreground">
         <span className=' text-neutral-800'>
         <LeftIcon/>
         </span>
        
         <input
            {...register<Path<T>>(name, registerOptions)}
            className=" text-neutral basis-full h-full  focus-visible:outline-none placeholder:text-neutral-700"
            placeholder={placeholder}
            id={input_id}
            {...rest}
         />

         {RightIcon && (
            <span
               className="text-neutral-800 self-stretch inline-flex items-center"
               onMouseDown={(e) => {
                  e.preventDefault();
               }}
            >
               {RightIcon}
            </span>
         )}
         
      </div>
   );
};

