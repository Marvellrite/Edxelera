import { z } from 'zod';
import { getPasswordValidationError } from '@/lib/auth/password';

export const resetPassSchema = z
   .object({        
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


export type ResetPassSchema = z.infer<typeof resetPassSchema>;
