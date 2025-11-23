import React from 'react';
import { FieldError } from 'react-hook-form';

type FormError = {
   children: React.ReactNode;
   className?: string;
};

const FormError: React.FC<FormError> = ({ children, className }) => {
   return (
      <div className={` text-sm text-red-light mt-2 ${className}`}>
         {children}
      </div>
   );
};

export default FormError;
