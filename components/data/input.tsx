import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { ComponentProps } from 'react';

interface InputPropsType<T extends FieldValues>
   extends ComponentProps<'input'> {
   name: Path<T>;
   input_id?: string;
   register: UseFormRegister<T>;
   placeholder: string;
}

const Input = <T extends FieldValues>({
   placeholder,
   name,
   input_id="",
   register,
   ...rest
}: InputPropsType<T>) => {
   return (
      <div className=" size-full relative h-[53px] px-3 py-4 pb-0 rounded-lg border border-neutral-400 ring-neutral-400 flex focus-within:ring-2 focus-within:ring-neutral-300">
         <input
            {...register<Path<T>>(name)}
            className="peer  basis-full h-[85%]  self-end focus-visible:outline-none "
            placeholder=" "
            id={input_id}
            {...rest}
         />
         <label
            className=" absolute left-3 top-[25%] text-neutral-500 text-[14px] -translate-y-1/2 pointer-events-none
                                 transition-all duration-200
                                 peer-placeholder-shown:top-1/2
                                 peer-placeholder-shown:text-base
                                 peer-placeholder-shown:-translate-y-1/2
                                 peer-focus:top-[25%]
                                 peer-focus:text-[14px]
                                 peer-focus:text-neutral-500
                                 peer-focus:text-blue-600"
            htmlFor={input_id}
         >
            {placeholder}
         </label>
      </div>
   );
};

export default Input;
