import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { ComponentProps, ComponentType } from 'react';
import IconProp from '../icons/modified/IconType';

interface TextareaPropsType<T extends FieldValues>
   extends ComponentProps<'textarea'> {
   name: Path<T>;
   textarea_id: string;
   register: UseFormRegister<T>;
   placeholder: string;
   rows?: number;
   LeftIcon: ComponentType<IconProp>
}

const Textarea = <T extends FieldValues>({
   placeholder,
   name,
   textarea_id,
   register,
   rows = 2,
   LeftIcon
}: TextareaPropsType<T>) => {
   return (
      <div className=" size-full relative bg-white hover:bg-neutral-50/70 ring-neutral-500 flex focus-within:ring-2 focus-within:ring-primary/60 text-neutral-600 focus-within:bg-surface-foreground! rounded-[300px] justify-between py-4 px-5">
        <span className='text-neutral-800'><LeftIcon/></span>
         <textarea
            {...register<Path<T>>(name)}
            className="peer basis-full self-end focus-visible:outline-none px-3 placeholder:text-neutral-700 h-full"
            placeholder={placeholder}
            id={textarea_id}
            rows={rows}
         />
      </div>
   );
};

export default Textarea;
