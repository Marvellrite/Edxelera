import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { ComponentProps, ComponentType, JSX } from 'react';
import IconProp from '@/components/icons/generated/IconType';

interface InputPropsType<T extends FieldValues>
   extends ComponentProps<'input'> {
   name: Path<T>;
   input_id?: string;
   register: UseFormRegister<T>;
   placeholder: string;
   LeftIcon: ComponentType<IconProp>
   RightIcon?: JSX.Element

}

export const InputIconned = <T extends FieldValues>({
   placeholder,
   name,
   input_id="",
   register,
   LeftIcon,
   RightIcon,
   ...rest
}: InputPropsType<T>) => {
   return (
      <div onClick={(e)=>{
         const input = e.currentTarget.querySelector("input");
         input?.focus()
      }} className=" size-full relative px-5 rounded-full flex text-neutral-600 hover:cursor-text items-center gap-2 py-4 bg-surface-foreground justify-between focus-within:ring-primary/60 ring-2 ring-transparent hover:bg-neutral-50 transition-colors duration-200 focus-within:bg-surface-foreground!">
         <span className=' text-neutral-800'>
         <LeftIcon/>
         </span>
        
         <input
            {...register<Path<T>>(name)}
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

