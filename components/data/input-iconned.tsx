import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { ComponentProps, ComponentType, JSX } from 'react';
import IconProp from '@/components/icons/IconType';

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
      }} className=" size-full relative px-5 rounded-full flex text-neutral-600 hover:cursor-text items-center gap-2 py-4 bg-white justify-between">
         <span className=' text-neutral-800'>
         <LeftIcon/>
         </span>
        
         <input
            {...register<Path<T>>(name)}
            className=" text-neutral basis-full h-full  self-end focus-visible:outline-none placeholder:text-neutral-700"
            placeholder={placeholder}
            id={input_id}
            {...rest}
         />

         {
            RightIcon &&
          <span className=' text-neutral-800' >
         {RightIcon}
         </span>
         }
         
      </div>
   );
};

