import { z } from 'zod';

export const resetPassSchema = z
   .object({        password: z
         .string()
         .min(6, 'Password must be at least 6 characters long')
         .max(100, 'Password is too long'),
      confirm_password: z.string().min(6, 'Please confirm your password'),
   })
   .refine((data) => data.password === data.confirm_password, {
      path: ['confirm_password'], // attach error to confirm_password field
      message: 'Passwords do not match',
   });


export type ResetPassSchema = z.infer<typeof resetPassSchema>;
