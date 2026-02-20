import { ComponentProps } from 'react';

interface InputPropsType
   extends ComponentProps<'input'> {
   input_id?: string;
   placeholder: string;
}

const InputAnimated =({
   placeholder,
   input_id="",
   ...rest
}: InputPropsType) => {
   return (
      <div onClick={(e)=>{
         const input = e.currentTarget.querySelector("input");
         input?.focus()
      }} className=" size-full relative h-13.25 px-3 py-4 pb-0 rounded-lg border border-neutral-500 ring-neutral-500 flex focus-within:ring-2 focus-within:ring-neutral-500 text-neutral-600 hover:cursor-text">
         <input
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
                                 peer-focus:text-neutral-600"
            htmlFor={input_id}
         >
            {placeholder}
         </label>
      </div>
   );
};

export default InputAnimated;
