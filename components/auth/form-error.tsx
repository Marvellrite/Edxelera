import React from 'react';
import { FieldError } from 'react-hook-form';

type FormError = {
   children: React.ReactNode;
};

const FormError: React.FC<FormError> = ({ children }) => {
   return <div className=" text-sm text- mt-1">{children}</div>;
};

export default FormError;
