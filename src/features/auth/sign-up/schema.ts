import { z } from 'zod';
import { getPasswordValidationError } from '@/lib/auth/password';

export const signUpSchema = z
   .object({
      fullname: z
         .string()
         .min(3, 'Full name must be at least 3 characters long'),
      email: z.email('Invalid email address'),
      password: z.string().superRefine((password, ctx) => {
         const validationError = getPasswordValidationError(password);

         if (validationError) {
            ctx.addIssue({
               code: 'custom',
               message: validationError,
            });
         }
      }),
      confirm_password: z.string().min(1, 'Please confirm your password'),
   })
   .refine((data) => data.password === data.confirm_password, {
      path: ['confirm_password'], // attach error to confirm_password field
      message: 'Passwords do not match',
   });


